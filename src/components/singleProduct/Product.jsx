import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./product.css";

export default function Product() {
  const [product, setProduct] = useState({});
  const [error, setError] = useState('');
  const { id } = useParams();

  const getProduct = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const result = await response.json();
      setProduct(result);
      setError('');
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Something went wrong while loading product. Please try again later.");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (error) {
    return (
      <div className="text-center py-5 my-5 text-danger">
        <h4>{error}</h4>
      </div>
    );
  }

  if (product.length == 0) {
    return (
      <div className="loading text-center py-5 my-5">
        <div className="spinner-border text-success mb-3" role="status"></div>
        <h4>Loading, please wait...</h4>
      </div>
    );
  }

  return (
    <section className="product-details-section py-5 my-4">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-md-6 text-center">
            <div className="product-image-wrapper shadow-sm rounded-3 p-3 bg-white">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="img-fluid rounded"
              />
              <span className="price-tag">${product.price}</span>
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold text-dark mb-3">{product.title}</h2>
            <p className="text-muted mb-2">{product.category}</p>
            <p className="lead">{product.description}</p>
            <p className="fw-semibold text-success mb-3">
              Rating: ⭐ {product.rating}
            </p>
            <Link to="/products" className="btn btn-outline-secondary me-3">
              ← Back to Products
            </Link>
            <button className="btn btn-success">Add to Cart</button>
          </div>
        </div>
      </div>
    </section>
  );
}
