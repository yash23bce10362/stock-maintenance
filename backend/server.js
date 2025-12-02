import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Data file paths
const DATA_DIR = join(__dirname, 'data')
const ITEMS_FILE = join(DATA_DIR, 'items.json')
const CATEGORIES_FILE = join(DATA_DIR, 'categories.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch (error) {
    console.error('Error creating data directory:', error)
  }
}

// Initialize default data
async function initializeData() {
  await ensureDataDir()
  
  try {
    // Initialize items file
    try {
      await fs.access(ITEMS_FILE)
    } catch {
      const defaultItems = [
        {
          id: '1',
          name: 'Laptop Computer',
          description: 'High-performance laptop for office work',
          category: 'Electronics',
          quantity: 15,
          price: 899.99,
          sku: 'LAP-001',
          supplier: 'TechCorp Inc.',
          location: 'Warehouse A',
          minStock: 5,
          maxStock: 50,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Wireless Mouse',
          description: 'Ergonomic wireless mouse',
          category: 'Electronics',
          quantity: 45,
          price: 29.99,
          sku: 'MOU-001',
          supplier: 'TechCorp Inc.',
          location: 'Warehouse A',
          minStock: 20,
          maxStock: 100,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Office Chair',
          description: 'Comfortable ergonomic office chair',
          category: 'Tools',
          quantity: 8,
          price: 199.99,
          sku: 'CHR-001',
          supplier: 'Furniture Co.',
          location: 'Warehouse B',
          minStock: 5,
          maxStock: 30,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          name: 'Notebook Set',
          description: 'Set of 5 professional notebooks',
          category: 'Books',
          quantity: 120,
          price: 12.99,
          sku: 'NBK-001',
          supplier: 'Stationery Plus',
          location: 'Warehouse A',
          minStock: 50,
          maxStock: 200,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '5',
          name: 'Coffee Maker',
          description: 'Automatic drip coffee maker',
          category: 'Food & Beverages',
          quantity: 12,
          price: 79.99,
          sku: 'CFM-001',
          supplier: 'Kitchen Essentials',
          location: 'Warehouse B',
          minStock: 5,
          maxStock: 25,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
      await fs.writeFile(ITEMS_FILE, JSON.stringify(defaultItems, null, 2))
    }

    // Initialize categories file
    try {
      await fs.access(CATEGORIES_FILE)
    } catch {
      const defaultCategories = [
        { id: '1', name: 'Electronics', color: '#3b82f6' },
        { id: '2', name: 'Clothing', color: '#10b981' },
        { id: '3', name: 'Food & Beverages', color: '#f59e0b' },
        { id: '4', name: 'Books', color: '#8b5cf6' },
        { id: '5', name: 'Tools', color: '#ef4444' },
      ]
      await fs.writeFile(CATEGORIES_FILE, JSON.stringify(defaultCategories, null, 2))
    }
  } catch (error) {
    console.error('Error initializing data:', error)
  }
}

// Helper functions to read/write data
async function readItems() {
  try {
    const data = await fs.readFile(ITEMS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

async function writeItems(items) {
  await fs.writeFile(ITEMS_FILE, JSON.stringify(items, null, 2))
}

async function readCategories() {
  try {
    const data = await fs.readFile(CATEGORIES_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

async function writeCategories(categories) {
  await fs.writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2))
}

// Routes

// Items Routes
app.get('/api/items', async (req, res) => {
  try {
    const items = await readItems()
    res.json(items)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' })
  }
})

app.get('/api/items/:id', async (req, res) => {
  try {
    const items = await readItems()
    const item = items.find(i => i.id === req.params.id)
    if (!item) {
      return res.status(404).json({ error: 'Item not found' })
    }
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item' })
  }
})

app.post('/api/items', async (req, res) => {
  try {
    const items = await readItems()
    
    // Check for duplicate SKU
    if (items.some(item => item.sku === req.body.sku)) {
      return res.status(400).json({ error: 'SKU already exists' })
    }

    const newItem = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    items.push(newItem)
    await writeItems(items)
    res.status(201).json(newItem)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' })
  }
})

app.put('/api/items/:id', async (req, res) => {
  try {
    const items = await readItems()
    const index = items.findIndex(i => i.id === req.params.id)
    
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' })
    }

    // Check for duplicate SKU (excluding current item)
    if (items.some(item => item.sku === req.body.sku && item.id !== req.params.id)) {
      return res.status(400).json({ error: 'SKU already exists' })
    }

    items[index] = {
      ...items[index],
      ...req.body,
      id: req.params.id,
      updatedAt: new Date().toISOString(),
    }
    
    await writeItems(items)
    res.json(items[index])
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' })
  }
})

app.delete('/api/items/:id', async (req, res) => {
  try {
    const items = await readItems()
    const filteredItems = items.filter(i => i.id !== req.params.id)
    
    if (filteredItems.length === items.length) {
      return res.status(404).json({ error: 'Item not found' })
    }
    
    await writeItems(filteredItems)
    res.json({ message: 'Item deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' })
  }
})

// Categories Routes
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await readCategories()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

app.post('/api/categories', async (req, res) => {
  try {
    const categories = await readCategories()
    
    const newCategory = {
      id: Date.now().toString(),
      name: req.body.name,
      color: req.body.color || '#3b82f6',
    }
    
    categories.push(newCategory)
    await writeCategories(categories)
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' })
  }
})

app.put('/api/categories/:id', async (req, res) => {
  try {
    const categories = await readCategories()
    const index = categories.findIndex(c => c.id === req.params.id)
    
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' })
    }

    categories[index] = {
      ...categories[index],
      name: req.body.name,
      color: req.body.color || categories[index].color,
    }
    
    await writeCategories(categories)
    res.json(categories[index])
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' })
  }
})

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const categories = await readCategories()
    const filteredCategories = categories.filter(c => c.id !== req.params.id)
    
    if (filteredCategories.length === categories.length) {
      return res.status(404).json({ error: 'Category not found' })
    }
    
    await writeCategories(filteredCategories)
    res.json({ message: 'Category deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Inventory Management API is running' })
})

// Start server
async function startServer() {
  await initializeData()
  
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`)
    console.log(`📡 API endpoints available at http://localhost:${PORT}/api`)
  })
}

startServer().catch(console.error)

