import React, { useEffect, useState } from "react";

export default function Services() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const getCategories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");      
      const result = await response.json();
      setCategories(result);
      setError('');
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Something went wrong while loading products. Please try again later.");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (error) return 
  <div className="text-center py-5 text-danger">
    {error}
  </div>;
  if (categories.length == 0)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success mb-3" role="status"></div>
        <h4>Loading, please wait...</h4>
      </div>
    );

  return (
    <section className="services-section py-5 my-5">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">What We Offer</h2>
        <p className="text-muted mb-5">Discover our product categories</p>
        <div className="row g-4">
          {categories.map((category, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card h-100 shadow-sm border-0 bg-white">
                <div className="card-body">
                  <div className="mb-3 text-success fs-1">
                    <i className="bi bi-bag"></i>
                  </div>
                  <h5 className="fw-semibold text-capitalize">{typeof category === 'string' ? category : category.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
