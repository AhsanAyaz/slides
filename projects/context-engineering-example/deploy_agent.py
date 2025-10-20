import os

from dotenv import load_dotenv

load_dotenv()

import vertexai
# The import path must now be relative to the project root
from agent.sales_assistant_agent.agent import root_agent
from vertexai import agent_engines
from vertexai.preview import reasoning_engines

PROJECT_ID = os.environ.get("PROJECT_ID", "io-connect-berlin-464013")
LOCATION = os.environ.get("LOCATION", "europe-west3")
STAGING_BUCKET = os.environ.get("STAGING_BUCKET", "gs://sales_assistant_agent")

vertexai.init(
    project=PROJECT_ID,
    location=LOCATION,
    staging_bucket=STAGING_BUCKET,
)

app = reasoning_engines.AdkApp(
    agent=root_agent,
    enable_tracing=True,
)

remote_app = agent_engines.create(
    agent_engine=app,
    requirements=[
        "google-cloud-aiplatform[adk,agent_engines]",
        "httpx",
        "python-dotenv",
    ],
    # The package to install is now at this path
    extra_packages=["./"],
)

print(f"Remote app created: {remote_app.resource_name}")
