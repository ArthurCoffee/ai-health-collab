# launch.ps1

Write-Host "🚀 Launching full stack setup..."

# Run backend setup in new PowerShell window
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd backend; .\setup-backend.ps1'

# Run frontend setup in new PowerShell window
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd frontend; .\setup-frontend.ps1'
