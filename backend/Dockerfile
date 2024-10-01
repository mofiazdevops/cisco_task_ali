# Use the official Python 3.9.4 image
FROM python:3.9.4

# Update the package list and install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file first, to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Set PYTHONPATH to include the /app directory
ENV PYTHONPATH=/app

# Expose the port FastAPI will run on
EXPOSE 8000

# Run the Uvicorn server to serve the FastAPI app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]


