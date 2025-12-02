import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Package, DollarSign, AlertTriangle } from 'lucide-react'
import { itemsAPI, categoriesAPI } from '../utils/api'
import './Reports.css'

const Reports = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [stats, setStats] = useState({
    totalItems: 0,
    totalValue: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    categoryStats: [],
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [allItems, cats] = await Promise.all([
        itemsAPI.getAll(),
        categoriesAPI.getAll()
      ])
      setItems(allItems)
      setCategories(cats)
      calculateStats(allItems)
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  const calculateStats = (allItems) => {
    const totalItems = allItems.length
    const totalValue = allItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    const lowStockCount = allItems.filter(item => item.quantity <= item.minStock && item.quantity > 0).length
    const outOfStockCount = allItems.filter(item => item.quantity === 0).length

    // Category statistics
    const categoryMap = {}
    allItems.forEach(item => {
      if (!categoryMap[item.category]) {
        categoryMap[item.category] = {
          name: item.category,
          count: 0,
          value: 0,
          items: [],
        }
      }
      categoryMap[item.category].count++
      categoryMap[item.category].value += item.quantity * item.price
      categoryMap[item.category].items.push(item)
    })

    const categoryStats = Object.values(categoryMap).map(cat => ({
      ...cat,
      lowStock: cat.items.filter(item => item.quantity <= item.minStock).length,
    }))

    setStats({
      totalItems,
      totalValue,
      lowStockCount,
      outOfStockCount,
      categoryStats: categoryStats.sort((a, b) => b.value - a.value),
    })
  }

  const topItems = [...items]
    .sort((a, b) => (b.quantity * b.price) - (a.quantity * a.price))
    .slice(0, 5)

  const lowStockItems = items
    .filter(item => item.quantity <= item.minStock)
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 10)

  return (
    <div className="reports">
      <div className="reports-header">
        <h2>Inventory Reports & Analytics</h2>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dbeafe', color: '#3b82f6' }}>
            <Package size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalItems}</h3>
            <p>Total Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            <p>Total Inventory Value</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.lowStockCount}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.outOfStockCount}</h3>
            <p>Out of Stock</p>
          </div>
        </div>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <div className="report-header">
            <BarChart3 size={20} />
            <h3>Category Distribution</h3>
          </div>
          <div className="category-list">
            {stats.categoryStats.map((cat, index) => (
              <div key={index} className="category-item">
                <div className="category-header">
                  <span className="category-name">{cat.name}</span>
                  <span className="category-value">
                    ${cat.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="category-bar">
                  <div
                    className="category-bar-fill"
                    style={{
                      width: `${(cat.value / stats.totalValue) * 100}%`,
                      background: categories.find(c => c.name === cat.name)?.color || '#3b82f6',
                    }}
                  />
                </div>
                <div className="category-details">
                  <span>{cat.count} items</span>
                  {cat.lowStock > 0 && (
                    <span className="low-stock-badge">{cat.lowStock} low stock</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="report-card">
          <div className="report-header">
            <TrendingUp size={20} />
            <h3>Top 5 Items by Value</h3>
          </div>
          <div className="top-items-list">
            {topItems.map((item, index) => (
              <div key={item.id} className="top-item">
                <div className="item-rank">{index + 1}</div>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>{item.category} • Qty: {item.quantity}</p>
                </div>
                <div className="item-value">
                  ${(item.quantity * item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lowStockItems.length > 0 && (
        <div className="report-card">
          <div className="report-header">
            <AlertTriangle size={20} />
            <h3>Low Stock Alerts</h3>
          </div>
          <div className="alert-table">
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Min Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.minStock}</td>
                    <td>
                      <span className={`status-badge ${item.quantity === 0 ? 'out' : 'low'}`}>
                        {item.quantity === 0 ? 'Out of Stock' : 'Low Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports

