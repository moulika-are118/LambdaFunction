
import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';


function ProductFormWrapper({ products, onSave }) {
  const { id } = useParams();
  // Ensure id is compared as string for MongoDB
  const product = products.find(p => p.id === id || p.id === Number(id));
  return <ProductForm initialProduct={product || {}} onSave={onSave} />;
}

function App() {
  // Placeholder state for demo
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products || []));
  }, []);

  const handleSaveProduct = async (product) => {
    if (product.id) {
      // Update existing product, do not send id in update payload
      const { id, ...updateData } = product;
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
    } else {
      // Create new product
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
    }
    // Refresh products
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data.products || []);
  };

  const handleDeleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    // Refresh products
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data.products || []);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList products={products} onDelete={handleDeleteProduct} />} />
  <Route path="/products/new" element={<ProductForm initialProduct={{ name: '', price: '', quantity: '', description: '' }} onSave={handleSaveProduct} />} />
      <Route path="/products/edit/:id" element={<ProductFormWrapper products={products} onSave={handleSaveProduct} />} />
    </Routes>
  );
}

export default App;
