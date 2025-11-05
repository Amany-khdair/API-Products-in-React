import React, { useEffect, useState } from "react";
import "./products.css";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const productsPerPage = 8;

  const getProducts = async () => {
   try {
      const response = await fetch("https://dummyjson.com/products?limit=194");  
      const result = await response.json();
      setProducts(result.products);      
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Something went wrong while loading products. Please try again later.");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (error) {
    return (
      <div className="text-center py-5 my-5 text-danger">
        <h4>{error}</h4>
      </div>
    );
  }

  if (products.length == 0) {
    return (
      <div className="loading text-center py-5 my-5">
        <div className="spinner-border text-success mb-3" role="status"></div>
        <h4>Loading, please wait...</h4>
      </div>
    );
  }

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

    const getCurrentPages = () => {
    let start = currentPage - 1;
    let end = currentPage + 1;

    if (start < 1) {
      start = 1;
      end = 3;
    }
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - 2;
      if (start < 1) start = 1;
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const CurrentPage = getCurrentPages();
  return (
    <section className="products-section py-5 my-4">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">Our Products</h2>
          <p className="text-muted">Explore our amazing collection!</p>
        </div>

        <div className="row g-4">
          {currentProducts.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <div className="product-card h-100 text-center shadow-sm">
                <div className="img-container">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="img-fluid"/>
                  <span className="price-badge">${product.price}</span>
                </div>
                <div className="p-3">
                  <h5 className="fw-semibold">{product.title}</h5>
                  <p className="text-muted small">{product.category}</p>
                  <Link
                    className="btn btn-outline-success btn-sm w-100 mt-2"
                    to={`/product/${product.id}`}
                  >View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-container text-center mt-5">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >« Prev</button>

          {CurrentPage.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`btn mx-1 ${
                currentPage === pageNumber
                  ? "btn-success text-white"
                  : "btn-outline-success"
              }`}
            >{pageNumber}</button>
          ))}

          <button
            className="btn btn-outline-secondary ms-2"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >Next »</button>
        </div>
      </div>
    </section>
  );
}
