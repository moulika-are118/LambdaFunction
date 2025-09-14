import React, { useState, useEffect } from 'react';
import styles from './ProductForm.module.css';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ initialProduct = {}, onSave }) => {
  const [product, setProduct] = useState(initialProduct);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setProduct({ ...initialProduct });
    setErrors({});
  }, [initialProduct]);

  const validate = () => {
    const newErrors = {};
    if (!product.name || product.name.trim() === '') {
      newErrors.name = 'Name is required.';
    } else if (!/^[A-Za-z ]+$/.test(product.name.trim())) {
      newErrors.name = 'Name must contain only letters and spaces.';
    }
    if (!product.price || isNaN(product.price) || Number(product.price) <= 0) newErrors.price = 'Price must be a positive number.';
    if (!product.quantity || isNaN(product.quantity) || Number(product.quantity) <= 0) newErrors.quantity = 'Quantity must be a positive number.';
    if (!product.description || product.description.trim() === '') newErrors.description = 'Description is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    onSave(product);
    navigate('/products');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.id ? 'Edit Product' : 'Create Product'}</h1>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <input type="hidden" name="id" value={product.id || ''} />
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input type="text" className={styles.input} id="name" name="name" value={product.name || ''} onChange={handleChange} required />
          {errors.name && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.name}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>Price</label>
          <input type="number" className={styles.input} id="price" name="price" value={product.price || ''} onChange={handleChange} step="0.01" required />
          {errors.price && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.price}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantity" className={styles.label}>Quantity</label>
          <input type="number" className={styles.input} id="quantity" name="quantity" value={product.quantity || ''} onChange={handleChange} required />
          {errors.quantity && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.quantity}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <textarea className={styles.input} id="description" name="description" value={product.description || ''} onChange={handleChange} rows="3" />
          {errors.description && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.description}</div>}
        </div>
        <button type="submit" className={styles.primaryBtn}>Save</button>
        <button type="button" className={styles.secondaryBtn} onClick={() => navigate('/products')}>Cancel</button>
      </form>
    </div>
  );
};

export default ProductForm;
