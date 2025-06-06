# setup-frontend.ps1

Write-Host "Setting up frontend..."

# Clean up previous installs
if (Test-Path "node_modules") {
    Write-Host "Removing node_modules..."
    Remove-Item -Recurse -Force node_modules
}

if (Test-Path "package-lock.json") {
    Write-Host "Removing package-lock.json..."
    Remove-Item -Force package-lock.json
}

# Install dependencies
Write-Host "Installing npm packages..."
npm install

# Install TailwindCSS
Write-Host "Installing TailwindCSS..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Configure Tailwind content paths
Set-Content tailwind.config.js "module.exports = { content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], theme: { extend: {} }, plugins: [] }"
Set-Content src/index.css "@tailwind base;`n@tailwind components;`n@tailwind utilities;"

# Add React Router
Write-Host "Installing React Router..."
npm install react-router-dom

# Launch dev server
Write-Host "Starting Vite development server..."
npm run dev
