# Blockhouse Test Project

## Introduction

This project is a web application built using Next.js for the frontend and Django for the API backend. It features a dashboard with multiple charts (Candlestick, Line Chart, Bar Chart, and Pie Chart), with data served from a Django backend.

## Requirements

- Docker
- Node.js
- npm

## Setup Instructions

### 1. Download and Prepare the Project

- **Option 1: Download Zip**
  - Download the ZIP file from the repository link.
  - Unzip it to a desired directory.

- **Option 2: Clone the Repository**
  - If you have git installed, you can directly clone the repository:
    ```bash
    git clone <repository-url>
    ```

### 2. Backend Setup

- Navigate into the backend directory and set up the Python environment.

```bash
cd path/to/unzipped/folder/chart_backend  # Adjust the path as necessary
pip install -r requirements.txt            # Install required Python packages
python manage.py migrate                   # Run database migrations
python manage.py runserver 8000            # Start the Django server on port 8000
```

### 3. Frontend Setup

Open a new terminal window or tab and set up the frontend.

```bash
cd path/to/unzipped/folder/dashboard   # Navigate to the frontend directory
npm install                            # Install Node.js dependencies
npm run dev                            # Start the Next.js development server
```

## Accessing the Application

- Open your web browser and visit `http://localhost:3000` to access the frontend dashboard.
- The backend API will be running on `http://localhost:8000`.

## Common Issues and Troubleshooting

### Port Conflicts

- The application requires that ports 8000 (Django backend) and 3000 (Next.js frontend) are free. If these ports are already in use by other services, you may encounter issues starting the servers.

- To check if the ports are available, you can use the following commands:

  - **Windows:**
    ```bash
    netstat -aon | findstr :8000
    netstat -aon | findstr :3000
    ```
  
  - **MacOS/Linux:**
    ```bash
    lsof -i :8000
    lsof -i :3000
    ```

- If these ports are occupied, you can either stop the application using them, or modify the ports in the configuration.

### Changing the Backend Port (Django)

- To change the Django backend port from the default `8000` to a different port:
  
  ```bash
  python manage.py runserver <new-port>  
  ```
For example, to run the Django server on port `8080`, use:

```bash
python manage.py runserver 8080
```

### Changing the Frontend Port (Next.js)

- To change the Next.js frontend port to the default `3000` from a different port:

```bash
npm run dev -- -p <3000>  
```

##Refresh the page to get rid of any sync errors.

Thank you for the opportunity to work on this project.
