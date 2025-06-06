# setup-backend.ps1

Write-Host "Setting up backend virtual environment..."

# Step 1: Remove existing venv if it exists
if (Test-Path "./venv") {
    Write-Host "Removing existing virtual environment..."
    Remove-Item -Recurse -Force ./venv
}

# Step 2: Create new venv
Write-Host "Creating new virtual environment..."
python -m venv venv

# Step 3: Activate the virtual environment
Write-Host "Activating virtual environment..."
. .\venv\Scripts\Activate.ps1

# Step 4: Install required packages
Write-Host "Installing required Python packages..."
pip install fastapi uvicorn pydantic stripe python-dotenv

# Step 5: Freeze dependencies
Write-Host "Generating requirements.txt..."
pip freeze > requirements.txt

Write-Host "Backend setup complete. You can now run: uvicorn main:app --reload --port 8000"
