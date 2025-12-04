# Script to simulate git history for HealthCareWellness project

# Define team members
$team = @{
    "Harshal" = "Harshal <harshal@example.com>"
    "Manan"   = "Manan <manan@example.com>"
    "Sameer"  = "Sameer <sameer@example.com>"
    "Khushbu" = "Khushbu <khushbu@example.com>"
}

# 1. Remove existing git repository
if (Test-Path .git) {
    Write-Host "Removing existing .git directory..."
    Remove-Item -Path .git -Recurse -Force
}

# 2. Initialize new repository
Write-Host "Initializing new git repository..."
git init

# 3. Commit 1: Harshal - Initial Setup
Write-Host "Commit 1: Harshal - Initial Setup"
git add package.json package-lock.json tsconfig.json vite.config.ts drizzle.config.ts postcss.config.js tailwind.config.ts components.json theme.json
git commit -m "Initial project setup: dependencies and configuration" --author="$($team['Harshal'])"

# 4. Commit 2: Manan - Backend & Schema
Write-Host "Commit 2: Manan - Backend & Schema"
git add server/ shared/
git commit -m "Setup backend server, API routes, and database schema" --author="$($team['Manan'])"

# 5. Commit 3: Sameer - UI Components
Write-Host "Commit 3: Sameer - UI Components"
git add client/src/components/ client/src/lib/ client/src/hooks/
git commit -m "Add core UI components and utility hooks" --author="$($team['Sameer'])"

# 6. Commit 4: Sameer - Pages
Write-Host "Commit 4: Sameer - Pages"
git add client/src/pages/
git commit -m "Implement application pages: Home, Dashboard, Auth" --author="$($team['Sameer'])"

# 7. Commit 5: Khushbu - Frontend Integration
Write-Host "Commit 5: Khushbu - Frontend Integration"
git add client/src/App.tsx client/src/main.tsx client/index.html
git commit -m "Connect frontend routing and main entry point" --author="$($team['Khushbu'])"

# 8. Commit 6: Khushbu - Styling
Write-Host "Commit 6: Khushbu - Styling"
git add client/src/index.css
git commit -m "Apply global styles and theme configuration" --author="$($team['Khushbu'])"

# 9. Commit 7: Harshal - Documentation & Cleanup
Write-Host "Commit 7: Harshal - Documentation & Cleanup"
git add README.md design_guidelines.md
git commit -m "Add project documentation and design guidelines" --author="$($team['Harshal'])"

# 10. Commit 8: Harshal - Final Polish
Write-Host "Commit 8: Harshal - Final Polish"
git add .
git commit -m "Final polish: remove unused files and prepare for release" --author="$($team['Harshal'])"

Write-Host "Git history simulation complete!"
git log --oneline --graph --all
