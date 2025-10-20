"""
Setup script to populate the RAG corpus with knowledge documents.

This script:
1. Creates or gets the existing RAG corpus
2. Uploads local markdown files to Google Cloud Storage
3. Imports the files into the RAG corpus

Usage:
    python setup_rag_corpus.py

Requirements:
    - Google Cloud Storage bucket (set GCS_BUCKET_NAME)
    - Local markdown files in rag-corpus/ directory
    - Appropriate GCP permissions
"""

import os
import glob
from pathlib import Path
import vertexai
from vertexai import rag
from google.cloud import storage

# Configuration
PROJECT_ID = os.environ.get("PROJECT_ID", "io-connect-berlin-464013")
LOCATION = os.environ.get("LOCATION", "europe-west3")
CORPUS_DISPLAY_NAME = "product_knowledge_base"
GCS_BUCKET_NAME = os.environ.get("GCS_BUCKET_NAME", "sales_assistant_rag_docs")
GCS_FOLDER = "rag-corpus"

# Local directory with markdown files
SCRIPT_DIR = Path(__file__).parent
RAG_DOCS_DIR = SCRIPT_DIR / "rag-corpus"

# Initialize Vertex AI
vertexai.init(project=PROJECT_ID, location=LOCATION)


def create_or_get_bucket(bucket_name: str):
    """
    Create GCS bucket if it doesn't exist, or get existing bucket.

    Args:
        bucket_name: Name of the bucket

    Returns:
        Bucket object
    """
    storage_client = storage.Client(project=PROJECT_ID)

    try:
        bucket = storage_client.get_bucket(bucket_name)
        print(f"✓ Using existing bucket: gs://{bucket_name}")
        return bucket
    except Exception:
        # Bucket doesn't exist, create it
        print(f"Creating new bucket: gs://{bucket_name}")
        bucket = storage_client.create_bucket(
            bucket_name,
            location=LOCATION
        )
        print(f"✓ Bucket created: gs://{bucket_name}")
        return bucket


def upload_files_to_gcs(bucket, local_dir: Path, gcs_folder: str):
    """
    Upload all markdown files from local directory to GCS.

    Args:
        bucket: GCS bucket object
        local_dir: Local directory containing markdown files
        gcs_folder: Folder path in GCS

    Returns:
        List of GCS paths
    """
    gcs_paths = []
    md_files = list(local_dir.glob("*.md"))

    if not md_files:
        print(f"⚠ No markdown files found in {local_dir}")
        return gcs_paths

    print(f"\nUploading {len(md_files)} files to GCS...")

    for md_file in md_files:
        # Create blob path
        blob_name = f"{gcs_folder}/{md_file.name}"
        blob = bucket.blob(blob_name)

        # Upload file
        blob.upload_from_filename(str(md_file))
        gcs_path = f"gs://{bucket.name}/{blob_name}"
        gcs_paths.append(gcs_path)

        print(f"  ✓ Uploaded: {md_file.name} → {gcs_path}")

    return gcs_paths


def get_or_create_corpus():
    """
    Get existing RAG corpus or create new one.

    Returns:
        RagCorpus object
    """
    # List existing corpora
    corpora = rag.list_corpora()

    # Check if our corpus already exists
    for corpus in corpora:
        if corpus.display_name == CORPUS_DISPLAY_NAME:
            print(f"✓ Using existing corpus: {corpus.name}")
            return corpus

    # Corpus doesn't exist, create it
    print(f"Creating new RAG corpus: {CORPUS_DISPLAY_NAME}")

    # Configure embedding model
    embedding_model_config = rag.RagEmbeddingModelConfig(
        vertex_prediction_endpoint=rag.VertexPredictionEndpoint(
            publisher_model="publishers/google/models/text-embedding-005"
        )
    )

    # Create corpus
    corpus = rag.create_corpus(
        display_name=CORPUS_DISPLAY_NAME,
        description="Sales assistant knowledge base with product guides, reviews, and policies",
        backend_config=rag.RagVectorDbConfig(
            rag_embedding_model_config=embedding_model_config
        )
    )

    print(f"✓ Corpus created: {corpus.name}")
    return corpus


def get_existing_files(corpus):
    """
    Get list of files already in the corpus.

    Args:
        corpus: RagCorpus object

    Returns:
        Set of file display names
    """
    try:
        existing_files = rag.list_files(corpus_name=corpus.name)
        return {f.display_name for f in existing_files}
    except Exception as e:
        print(f"⚠ Could not list existing files: {e}")
        return set()


def import_files_to_corpus(corpus, gcs_paths: list):
    """
    Import GCS files into RAG corpus.

    Args:
        corpus: RagCorpus object
        gcs_paths: List of GCS paths to import
    """
    if not gcs_paths:
        print("⚠ No files to import")
        return

    print(f"\nImporting {len(gcs_paths)} files into RAG corpus...")
    print("This may take 1-2 minutes...")

    try:
        response = rag.import_files(
            corpus.name,
            gcs_paths,
            transformation_config=rag.TransformationConfig(
                chunking_config=rag.ChunkingConfig(
                    chunk_size=512,      # Optimal for Q&A
                    chunk_overlap=100    # Maintains context
                )
            ),
            max_embedding_requests_per_min=1000
        )

        print(f"✓ Import complete!")
        print(f"  - Files imported: {response.imported_rag_files_count}")

        # List all files in corpus
        print(f"\nFiles in corpus '{CORPUS_DISPLAY_NAME}':")
        files = rag.list_files(corpus_name=corpus.name)
        for idx, file in enumerate(files, 1):
            print(f"  {idx}. {file.display_name}")

    except Exception as e:
        print(f"✗ Import failed: {e}")
        raise


def main():
    """Main setup function."""
    print("=" * 60)
    print("RAG Corpus Setup Script")
    print("=" * 60)

    # Check if rag-corpus directory exists
    if not RAG_DOCS_DIR.exists():
        print(f"✗ Directory not found: {RAG_DOCS_DIR}")
        print(f"  Create the directory and add markdown files first.")
        return

    print(f"\n1. Checking local files...")
    md_files = list(RAG_DOCS_DIR.glob("*.md"))
    print(f"   Found {len(md_files)} markdown files in {RAG_DOCS_DIR}")
    for f in md_files:
        print(f"     - {f.name}")

    if not md_files:
        print("\n✗ No markdown files found. Add .md files to rag-corpus/ directory.")
        return

    # Create or get GCS bucket
    print(f"\n2. Setting up Google Cloud Storage...")
    try:
        bucket = create_or_get_bucket(GCS_BUCKET_NAME)
    except Exception as e:
        print(f"✗ Failed to create/access bucket: {e}")
        print(f"\nTry creating the bucket manually:")
        print(f"  gsutil mb -p {PROJECT_ID} -l {LOCATION} gs://{GCS_BUCKET_NAME}")
        return

    # Upload files to GCS
    print(f"\n3. Uploading files to GCS...")
    gcs_paths = upload_files_to_gcs(bucket, RAG_DOCS_DIR, GCS_FOLDER)

    if not gcs_paths:
        print("✗ No files uploaded")
        return

    # Get or create RAG corpus
    print(f"\n4. Setting up RAG corpus...")
    corpus = get_or_create_corpus()

    # Check existing files
    print(f"\n5. Checking for existing files in corpus...")
    existing_files = get_existing_files(corpus)

    if existing_files:
        print(f"   Found {len(existing_files)} existing files:")
        for f in existing_files:
            print(f"     - {f}")

        response = input("\n   Do you want to re-import files? (y/n): ")
        if response.lower() != 'y':
            print("\n✓ Setup complete (no new imports)")
            print(f"\nCorpus name: {corpus.name}")
            print(f"Files: {len(existing_files)}")
            return

    # Import files to corpus
    print(f"\n6. Importing files to RAG corpus...")
    import_files_to_corpus(corpus, gcs_paths)

    # Summary
    print("\n" + "=" * 60)
    print("✓ RAG Corpus Setup Complete!")
    print("=" * 60)
    print(f"\nCorpus Details:")
    print(f"  Name: {corpus.display_name}")
    print(f"  ID: {corpus.name}")
    print(f"  Location: {LOCATION}")
    print(f"\nGCS Bucket:")
    print(f"  gs://{GCS_BUCKET_NAME}/{GCS_FOLDER}/")
    print(f"\nFiles indexed: {len(gcs_paths)}")

    print(f"\n✓ The agent in agent.py will now automatically use this corpus!")
    print(f"\nTo test the agent:")
    print(f"  python -c \"from agent.sales_assistant_agent.agent import root_agent; print(root_agent.chat('Which projector is best for outdoor use?'))\"")


if __name__ == "__main__":
    main()
