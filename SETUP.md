# Setup Instructions

## Quick Start

### Option 1: Using Command Prompt (Recommended)

1. Open **Command Prompt** (not PowerShell)
2. Navigate to the project directory:
```cmd
cd C:\Users\hp\Downloads\project2
```

3. Install dependencies:
```cmd
npm install
```

4. Start the development server:
```cmd
npm run dev
```

### Option 2: Fix PowerShell Execution Policy

If you prefer using PowerShell, run this command first (as Administrator):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then proceed with:
```powershell
cd C:\Users\hp\Downloads\project2
npm install
npm run dev
```

### Option 3: Using Git Bash or WSL

If you have Git Bash or WSL installed:
```bash
cd /c/Users/hp/Downloads/project2
npm install
npm run dev
```

## After Installation

Once `npm install` completes successfully, you can:

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Access the Application:**
   - The app will automatically open in your browser
   - Or manually navigate to: `http://localhost:3000`

## Troubleshooting

### If npm command is not recognized:
- Make sure Node.js is installed
- Verify installation: `node --version` and `npm --version`
- If not installed, download from: https://nodejs.org/

### If port 3000 is already in use:
- The app will automatically use the next available port
- Check the terminal output for the actual URL

### If you see dependency errors:
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

## Project Features

✅ Dashboard with statistics and alerts
✅ Full inventory management (CRUD operations)
✅ Search and filter functionality
✅ Category management
✅ Reports and analytics
✅ Responsive design
✅ Local storage persistence

Enjoy your Inventory Management System! 🎉

