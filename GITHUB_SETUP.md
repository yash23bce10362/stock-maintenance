# GitHub Setup Instructions

Follow these steps to upload your project to GitHub with public access.

## Prerequisites

### Step 1: Install Git

If Git is not installed on your system:

1. **Download Git:**
   - Visit: https://git-scm.com/download/win
   - Download the Windows installer
   - Run the installer with default settings

2. **Verify Installation:**
   ```bash
   git --version
   ```

3. **Configure Git (First time only):**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

## Uploading to GitHub

### Step 2: Initialize Git Repository

Open PowerShell or Command Prompt in the `project2` folder and run:

```bash
cd C:\Users\hp\Downloads\project2

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Full-stack Inventory Management System"
```

### Step 3: Create GitHub Repository

1. **Go to GitHub:**
   - Visit: https://github.com
   - Sign in or create an account

2. **Create New Repository:**
   - Click the "+" icon in the top right
   - Select "New repository"
   - Repository name: `inventory-management-system` (or your preferred name)
   - Description: "Full-stack React.js inventory management system with Express.js backend"
   - Visibility: **Public** ✅
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

### Step 4: Connect and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/inventory-management-system.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** You may be prompted for GitHub credentials. Use:
- Username: Your GitHub username
- Password: Use a Personal Access Token (not your password)
  - Create one at: https://github.com/settings/tokens
  - Select "repo" scope
  - Copy the token and use it as password

### Step 5: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your project files
3. The README.md will display automatically

## Quick Commands Summary

```bash
# Navigate to project
cd C:\Users\hp\Downloads\project2

# Initialize and commit
git init
git add .
git commit -m "Initial commit: Full-stack Inventory Management System"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/inventory-management-system.git
git branch -M main
git push -u origin main
```

## Alternative: Using GitHub Desktop

If you prefer a GUI:

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in
3. Click "File" → "Add Local Repository"
4. Select the `project2` folder
5. Click "Publish repository"
6. Make it public and click "Publish"

## Repository Settings

After uploading, you can:

1. **Add Topics/Tags:** Go to repository → "About" → Add topics like:
   - `react`
   - `express`
   - `inventory-management`
   - `full-stack`
   - `nodejs`

2. **Add Description:** Update the repository description

3. **Enable GitHub Pages** (Optional): For hosting the frontend
   - Settings → Pages → Source: `main` branch → `/` folder

## Troubleshooting

**"Repository not found" error:**
- Check the repository URL is correct
- Ensure repository exists on GitHub
- Verify you have access rights

**Authentication failed:**
- Use Personal Access Token instead of password
- Create token at: https://github.com/settings/tokens

**Large file errors:**
- Check `.gitignore` includes `node_modules/` and `backend/data/`
- Remove large files: `git rm --cached <file>`

## Next Steps

After uploading:

1. ✅ Share your repository link
2. ✅ Add a license file (if needed)
3. ✅ Update README with screenshots
4. ✅ Add badges to README
5. ✅ Create releases/tags for versions

Your project is now on GitHub! 🎉

