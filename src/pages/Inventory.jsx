import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, PlusCircle, Edit, Trash2, Package, Filter } from 'lucide-react'
import { itemsAPI, categoriesAPI } from '../utils/api'
import './Inventory.css'

const Inventory = () => {
  const [searchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadItems()
    const filter = searchParams.get('filter')
    if (filter === 'low-stock') {
      setShowFilters(true)
    }
  }, [searchParams])

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await categoriesAPI.getAll()
        setCategories(cats)
      } catch (error) {
        console.error('Failed to load categories:', error)
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    filterAndSortItems()
  }, [items, searchTerm, selectedCategory, sortBy])

  const loadItems = async () => {
    try {
      const allItems = await itemsAPI.getAll()
      setItems(allItems)
    } catch (error) {
      console.error('Failed to load items:', error)
    }
  }

  const filterAndSortItems = () => {
    let filtered = [...items]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Low stock filter from URL
    const filter = searchParams.get('filter')
    if (filter === 'low-stock') {
      filtered = filtered.filter(item => item.quantity <= item.minStock)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'quantity':
          return b.quantity - a.quantity
        case 'price':
          return b.price - a.price
        case 'category':
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    setFilteredItems(filtered)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemsAPI.delete(id)
        loadItems()
      } catch (error) {
        alert('Failed to delete item: ' + error.message)
      }
    }
  }

  const allCategories = ['all', ...new Set(items.map(item => item.category))]

  const getStockStatus = (item) => {
    if (item.quantity === 0) return { label: 'Out of Stock', class: 'out' }
    if (item.quantity <= item.minStock) return { label: 'Low Stock', class: 'low' }
    if (item.quantity >= item.maxStock) return { label: 'Overstocked', class: 'over' }
    return { label: 'In Stock', class: 'in' }
  }

  return (
    <div className="inventory">
      <div className="inventory-header">
        <h2>Inventory Management</h2>
        <Link to="/add-item" className="btn btn-primary">
          <PlusCircle size={20} />
          Add New Item
        </Link>
      </div>

      <div className="inventory-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name, SKU, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {allCategories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="quantity">Quantity</option>
              <option value="price">Price</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      )}

      <div className="inventory-stats">
        <div className="stat-badge">
          <Package size={16} />
          <span>Total Items: {filteredItems.length}</span>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <Package size={64} color="#94a3b8" />
          <h3>No items found</h3>
          <p>Try adjusting your search or filters</p>
          <Link to="/add-item" className="btn btn-primary">
            <PlusCircle size={20} />
            Add Your First Item
          </Link>
        </div>
      ) : (
        <div className="inventory-grid">
          {filteredItems.map((item) => {
            const stockStatus = getStockStatus(item)
            return (
              <div key={item.id} className="inventory-card">
                <div className="card-header">
                  <div>
                    <h3>{item.name}</h3>
                    <p className="sku">SKU: {item.sku}</p>
                  </div>
                  <span className={`stock-status ${stockStatus.class}`}>
                    {stockStatus.label}
                  </span>
                </div>
                <p className="description">{item.description}</p>
                <div className="card-details">
                  <div className="detail-item">
                    <span className="label">Category:</span>
                    <span className="value">{item.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Quantity:</span>
                    <span className="value">{item.quantity}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Price:</span>
                    <span className="value">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Total Value:</span>
                    <span className="value">${(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Location:</span>
                    <span className="value">{item.location}</span>
                  </div>
                </div>
                <div className="card-actions">
                  <Link
                    to={`/edit-item/${item.id}`}
                    className="btn btn-sm btn-secondary"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-sm btn-danger"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Inventory

