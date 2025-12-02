# Quick Start Guide

## ✅ Backend and Frontend are Connected!

Both servers have been installed and configured. Here's how to run them:

## Method 1: Using the Batch Script (Windows)

Simply double-click `start.bat` in the project2 folder, or run:
```cmd
start.bat
```

This will start both servers in separate windows.

## Method 2: Manual Start (Any OS)

### Terminal 1 - Backend:
```bash
cd project2/backend
npm start
```
✅ Backend runs on: http://localhost:5000

### Terminal 2 - Frontend:
```bash
cd project2
npm run dev
```
✅ Frontend runs on: http://localhost:3000

## Verification

1. **Backend Health Check:**
   - Open: http://localhost:5000/api/health
   - Should show: `{"status":"OK","message":"Inventory Management API is running"}`

2. **Frontend:**
   - Should automatically open in your browser
   - Or manually navigate to: http://localhost:3000

## API Endpoints

All API endpoints are available at: `http://localhost:5000/api`

- `GET /api/items` - Get all items
- `POST /api/items` - Create item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## Data Storage

- Data is stored in `backend/data/` folder as JSON files
- Files are automatically created on first run
- Sample data is included automatically

## Troubleshooting

**Backend not starting?**
- Check if port 5000 is available
- Run: `cd backend && npm install` to ensure dependencies are installed

**Frontend can't connect?**
- Make sure backend is running first
- Check browser console for errors
- Verify CORS is enabled (it should be by default)

**Port conflicts?**
- Backend port: Change in `backend/server.js` (line with `PORT = 5000`)
- Frontend port: Change in `vite.config.js` (server.port)

## Stopping Servers

- Press `Ctrl + C` in each terminal window
- Or close the terminal windows

Enjoy your full-stack Inventory Management System! 🚀

