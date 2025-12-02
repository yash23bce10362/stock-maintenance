// Local storage utilities for inventory data

export const getItems = () => {
  const items = localStorage.getItem('inventoryItems')
  return items ? JSON.parse(items) : []
}

export const saveItems = (items) => {
  localStorage.setItem('inventoryItems', JSON.stringify(items))
}

export const getCategories = () => {
  const categories = localStorage.getItem('inventoryCategories')
  return categories ? JSON.parse(categories) : [
    { id: '1', name: 'Electronics', color: '#3b82f6' },
    { id: '2', name: 'Clothing', color: '#10b981' },
    { id: '3', name: 'Food & Beverages', color: '#f59e0b' },
    { id: '4', name: 'Books', color: '#8b5cf6' },
    { id: '5', name: 'Tools', color: '#ef4444' },
  ]
}

export const saveCategories = (categories) => {
  localStorage.setItem('inventoryCategories', JSON.stringify(categories))
}

export const initializeSampleData = () => {
  const existingItems = getItems()
  if (existingItems.length === 0) {
    const sampleItems = [
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
    saveItems(sampleItems)
  }
}

