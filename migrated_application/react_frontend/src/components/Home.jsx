import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className={styles.container}>
    <div className="text-center">
      <h1>Welcome to Product Management System</h1>
      <p>Click below to manage products</p>
      <Link to="/products" className="btn btn-primary">View Products</Link>
    </div>
  </div>
);

export default Home;
