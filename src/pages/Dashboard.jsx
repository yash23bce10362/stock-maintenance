import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, AlertTriangle, TrendingUp, DollarSign, PlusCircle } from 'lucide-react'
import { itemsAPI } from '../utils/api'
import './Dashboard.css'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStock: 0,
    totalValue: 0,
    categories: 0,
  })
  const [lowStockItems, setLowStockItems] = useState([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const items = await itemsAPI.getAll()
        
        const totalItems = items.length
        const lowStock = items.filter(item => item.quantity <= item.minStock).length
        const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
        const categories = [...new Set(items.map(item => item.category))].length
        
        setStats({ totalItems, lowStock, totalValue, categories })
        
        const lowStockList = items
          .filter(item => item.quantity <= item.minStock)
          .slice(0, 5)
        setLowStockItems(lowStockList)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      }
    }
    
    loadData()
  }, [])

  const statCards = [
    {
      title: 'Total Items',
      value: stats.totalItems,
      icon: Package,
      color: '#3b82f6',
      bg: '#dbeafe',
    },
    {
      title: 'Low Stock Alert',
      value: stats.lowStock,
      icon: AlertTriangle,
      color: '#ef4444',
      bg: '#fee2e2',
    },
    {
      title: 'Total Value',
      value: `$${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: '#10b981',
      bg: '#d1fae5',
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: TrendingUp,
      color: '#8b5cf6',
      bg: '#ede9fe',
    },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <Link to="/add-item" className="btn btn-primary">
          <PlusCircle size={20} />
          Add New Item
        </Link>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      {lowStockItems.length > 0 && (
        <div className="alert-section">
          <div className="alert-header">
            <AlertTriangle size={20} color="#ef4444" />
            <h3>Low Stock Alerts</h3>
          </div>
          <div className="alert-list">
            {lowStockItems.map((item) => (
              <div key={item.id} className="alert-item">
                <div className="alert-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.category} • SKU: {item.sku}</p>
                </div>
                <div className="alert-item-stock">
                  <span className={`stock-badge ${item.quantity === 0 ? 'out' : 'low'}`}>
                    {item.quantity} / {item.minStock} min
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/inventory?filter=low-stock" className="view-all-link">
            View All Low Stock Items →
          </Link>
        </div>
      )}

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <Link to="/add-item" className="action-card">
            <PlusCircle size={32} />
            <span>Add New Item</span>
          </Link>
          <Link to="/inventory" className="action-card">
            <Package size={32} />
            <span>View Inventory</span>
          </Link>
          <Link to="/categories" className="action-card">
            <Package size={32} />
            <span>Manage Categories</span>
          </Link>
          <Link to="/reports" className="action-card">
            <TrendingUp size={32} />
            <span>View Reports</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

