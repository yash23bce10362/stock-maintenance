# 🚀 Quick Start: Upload to GitHub

## Method 1: Automated Setup (Recommended)

### Windows:
1. **Double-click:** `setup-github.bat`
   OR
2. **Run in PowerShell:**
   ```powershell
   .\setup-github.ps1
   ```

This will:
- ✅ Check if Git is installed
- ✅ Initialize Git repository
- ✅ Add all files
- ✅ Create initial commit

Then follow the on-screen instructions to connect to GitHub.

## Method 2: Manual Setup

### Step 1: Install Git (if not installed)
Download from: https://git-scm.com/download/win

### Step 2: Open Terminal in Project Folder
```bash
cd C:\Users\hp\Downloads\project2
```

### Step 3: Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: Full-stack Inventory Management System"
```

### Step 4: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `inventory-management-system`
3. Description: `Full-stack React.js inventory management system with Express.js backend`
4. Visibility: **Public** ✅
5. **DO NOT** check "Initialize with README"
6. Click "Create repository"

### Step 5: Connect and Push
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/inventory-management-system.git
git branch -M main
git push -u origin main
```

**Note:** When prompted for password, use a **Personal Access Token**:
- Create at: https://github.com/settings/tokens
- Select "repo" scope
- Copy token and use as password

## ✅ Verification

After pushing, visit your repository:
```
https://github.com/YOUR_USERNAME/inventory-management-system
```

You should see all your files!

## 📝 What Gets Uploaded

✅ All source code
✅ Configuration files
✅ README and documentation
✅ LICENSE file

❌ `node_modules/` (excluded)
❌ `backend/data/` (excluded - user-specific data)
❌ Build files (excluded)

## 🆘 Troubleshooting

**"Git is not recognized"**
→ Install Git from https://git-scm.com/download/win

**"Authentication failed"**
→ Use Personal Access Token instead of password

**"Repository not found"**
→ Check repository URL and ensure it exists on GitHub

**Need more help?**
→ See `GITHUB_SETUP.md` for detailed instructions

---

**Ready to share your project! 🎉**

