import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Save, ArrowLeft } from 'lucide-react'
import { itemsAPI, categoriesAPI } from '../utils/api'
import './ItemForm.css'

const EditItem = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    quantity: '',
    price: '',
    sku: '',
    supplier: '',
    location: '',
    minStock: '',
    maxStock: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [item, cats, allItems] = await Promise.all([
          itemsAPI.getById(id),
          categoriesAPI.getAll(),
          itemsAPI.getAll()
        ])
        
        setCategories(cats)
        setItems(allItems)
        
        if (item) {
          setFormData({
            name: item.name,
            description: item.description || '',
            category: item.category,
            quantity: item.quantity.toString(),
            price: item.price.toString(),
            sku: item.sku,
            supplier: item.supplier || '',
            location: item.location || '',
            minStock: item.minStock.toString(),
            maxStock: item.maxStock.toString(),
          })
        } else {
          navigate('/inventory')
        }
      } catch (error) {
        console.error('Failed to load item:', error)
        navigate('/inventory')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required'
    if (formData.quantity === '' || formData.quantity < 0) {
      newErrors.quantity = 'Valid quantity is required'
    }
    if (formData.price === '' || formData.price < 0) {
      newErrors.price = 'Valid price is required'
    }
    if (formData.minStock === '' || formData.minStock < 0) {
      newErrors.minStock = 'Valid minimum stock is required'
    }
    if (formData.maxStock === '' || formData.maxStock < 0) {
      newErrors.maxStock = 'Valid maximum stock is required'
    }
    if (parseInt(formData.maxStock) < parseInt(formData.minStock)) {
      newErrors.maxStock = 'Maximum stock must be greater than minimum stock'
    }

    // Check for duplicate SKU (excluding current item)
    if (items.some(item => item.sku === formData.sku.trim() && item.id !== id)) {
      newErrors.sku = 'SKU already exists'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    try {
      const updatedItem = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        sku: formData.sku.trim().toUpperCase(),
        supplier: formData.supplier.trim(),
        location: formData.location.trim(),
        minStock: parseInt(formData.minStock),
        maxStock: parseInt(formData.maxStock),
      }

      await itemsAPI.update(id, updatedItem)
      navigate('/inventory')
    } catch (error) {
      if (error.message.includes('SKU already exists')) {
        setErrors({ sku: 'SKU already exists' })
      } else {
        alert('Failed to update item: ' + error.message)
      }
    }
  }

  if (loading) {
    return <div className="item-form">Loading...</div>
  }

  const categoryOptions = [...new Set([
    ...categories.map(cat => cat.name),
    ...items.map(item => item.category)
  ])]

  return (
    <div className="item-form">
      <div className="form-header">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          <ArrowLeft size={20} />
          Back
        </button>
        <h2>Edit Item</h2>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">
              Item Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter item name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="sku">
              SKU <span className="required">*</span>
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className={errors.sku ? 'error' : ''}
              placeholder="Enter SKU"
            />
            {errors.sku && <span className="error-message">{errors.sku}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select category</option>
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">
              Quantity <span className="required">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={errors.quantity ? 'error' : ''}
              placeholder="0"
              min="0"
            />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price">
              Price ($) <span className="required">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? 'error' : ''}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="minStock">
              Minimum Stock <span className="required">*</span>
            </label>
            <input
              type="number"
              id="minStock"
              name="minStock"
              value={formData.minStock}
              onChange={handleChange}
              className={errors.minStock ? 'error' : ''}
              placeholder="0"
              min="0"
            />
            {errors.minStock && <span className="error-message">{errors.minStock}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="maxStock">
              Maximum Stock <span className="required">*</span>
            </label>
            <input
              type="number"
              id="maxStock"
              name="maxStock"
              value={formData.maxStock}
              onChange={handleChange}
              className={errors.maxStock ? 'error' : ''}
              placeholder="0"
              min="0"
            />
            {errors.maxStock && <span className="error-message">{errors.maxStock}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="supplier">Supplier</label>
            <input
              type="text"
              id="supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Enter supplier name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter storage location"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter item description"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={20} />
            Update Item
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditItem

