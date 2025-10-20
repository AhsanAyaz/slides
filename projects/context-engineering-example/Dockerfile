# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application's code to the working directory
COPY . .

# Expose the port that Gunicorn will run on
EXPOSE 8080

# Define the command to run the application
# Gunicorn will be the WSGI server to run the Flask app
# The --bind 0.0.0.0:8080 flag tells Gunicorn to listen on all network interfaces on port 8080
# main:app tells Gunicorn to look for the 'app' object in the 'main.py' file
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "main:app"]
