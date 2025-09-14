import React from 'react';
import styles from './ProductList.module.css';
import { Link } from 'react-router-dom';

const ProductList = ({ products, onDelete }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>Products</h1>
    <Link to="/products/new" className={styles.primaryBtn}>Add Product</Link>
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.description}</td>
            <td>
              <Link to={`/products/edit/${product.id}`} className={styles.editBtn}>Edit</Link>
              <button onClick={() => onDelete(product.id)} className={styles.deleteBtn}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductList;
