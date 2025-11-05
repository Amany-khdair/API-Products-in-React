import React, { useEffect, useState } from 'react'
import "./products.css";
import { Link } from 'react-router-dom';
export default function Products() {
  const[products, setProducts] = useState([]);
  const getProducts = async() =>{
    const response = await fetch(`https://dummyjson.com/products`);
    const result = await response.json();
    setProducts(result.products);
  }

  useEffect(()=>{
    getProducts();
  }, [])
  
  if (products.length === 0)
  return (
    <div className="loading text-center py-5 my-5">
      <div className="spinner-border text-success mb-3" role="status"></div>
      <h4>Loading, please wait...</h4>
    </div>
  );

  return (
    <section className="products-section py-5 my-4">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">Our Products</h2>
          <p className="text-muted">Explore our amazing collection!</p>
        </div>

        <div className="row g-4">
          {products.map(product => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <div className="product-card h-100 text-center shadow-sm">
                <div className="img-container">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="img-fluid"
                  />
                  <span className="price-badge">${product.price}</span>
                </div>
                <div className="p-3">
                  <h5 className="fw-semibold">{product.title}</h5>
                  <p className="text-muted small">{product.category}</p>
                  <Link className="btn btn-outline-success btn-sm w-100 mt-2" to={`/product/${product.id}`}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
