import { useState, useEffect } from 'react'
import { PlusCircle, Edit, Trash2, FolderTree, X } from 'lucide-react'
import { categoriesAPI } from '../utils/api'
import './Categories.css'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({ name: '', color: '#3b82f6' })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const cats = await categoriesAPI.getAll()
      setCategories(cats)
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category)
      setFormData({ name: category.name, color: category.color })
    } else {
      setEditingCategory(null)
      setFormData({ name: '', color: '#3b82f6' })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingCategory(null)
    setFormData({ name: '', color: '#3b82f6' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      return
    }

    try {
      if (editingCategory) {
        await categoriesAPI.update(editingCategory.id, {
          name: formData.name.trim(),
          color: formData.color,
        })
      } else {
        await categoriesAPI.create({
          name: formData.name.trim(),
          color: formData.color,
        })
      }
      loadCategories()
      handleCloseModal()
    } catch (error) {
      alert('Failed to save category: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoriesAPI.delete(id)
        loadCategories()
      } catch (error) {
        alert('Failed to delete category: ' + error.message)
      }
    }
  }

  const colorOptions = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
  ]

  return (
    <div className="categories">
      <div className="categories-header">
        <h2>Category Management</h2>
        <button onClick={() => handleOpenModal()} className="btn btn-primary">
          <PlusCircle size={20} />
          Add Category
        </button>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-icon" style={{ background: category.color + '20', color: category.color }}>
              <FolderTree size={24} />
            </div>
            <div className="category-info">
              <h3>{category.name}</h3>
              <div className="category-color" style={{ background: category.color }} />
            </div>
            <div className="category-actions">
              <button
                onClick={() => handleOpenModal(category)}
                className="btn btn-sm btn-secondary"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="btn btn-sm btn-danger"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
              <button onClick={handleCloseModal} className="close-btn">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="categoryName">Category Name</label>
                <input
                  type="text"
                  id="categoryName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <div className="color-picker">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${formData.color === color ? 'selected' : ''}`}
                      style={{ background: color }}
                      onClick={() => setFormData({ ...formData, color })}
                    />
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCategory ? 'Update' : 'Create'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Categories

