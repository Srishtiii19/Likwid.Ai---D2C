import React, { useState } from 'react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', description: 'Electronic devices and gadgets' },
    { id: 2, name: 'Clothing', description: 'Apparel and fashion items' },
    { id: 3, name: 'Books', description: 'Literature and educational materials' }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleAddCategory = () => {
    if (formData.name.trim() && formData.description.trim()) {
      const newCategory = {
        id: categories.length + 1,
        name: formData.name,
        description: formData.description
      };
      setCategories([...categories, newCategory]);
      setFormData({ name: '', description: '' });
      setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleEdit = (id) => {
    // Edit functionality can be implemented here
    console.log('Edit category with id:', id);
  };

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      width: '400px',
      maxWidth: '90%',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    modalHeader: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#555'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end',
      marginTop: '20px'
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    primaryButton: {
      backgroundColor: '#8b5cf6',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <button 
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          + Add Category
        </button>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#f3f4f6',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Category
              </th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Description
              </th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} style={{
                borderBottom: '1px solid #f3f4f6'
              }}>
                <td style={{
                  padding: '12px',
                  fontSize: '14px',
                  color: '#1f2937'
                }}>
                  {category.name}
                </td>
                <td style={{
                  padding: '12px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {category.description}
                </td>
                <td style={{
                  padding: '12px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <button 
                      onClick={() => handleEdit(category.id)}
                      style={{
                        backgroundColor: '#ddd6fe',
                        color: '#7c3aed',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(category.id)}
                      style={{
                        backgroundColor: '#fecaca',
                        color: '#dc2626',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <div style={modalStyles.modalHeader}>
              Add New Category
            </div>
            <div style={modalStyles.formGroup}>
              <label style={modalStyles.label}>Category Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter category name"
                style={modalStyles.input}
              />
            </div>
            <div style={modalStyles.formGroup}>
              <label style={modalStyles.label}>Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter category description"
                style={modalStyles.input}
              />
            </div>
            <div style={modalStyles.buttonGroup}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  ...modalStyles.button,
                  ...modalStyles.secondaryButton
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                style={{
                  ...modalStyles.button,
                  ...modalStyles.primaryButton
                }}
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;