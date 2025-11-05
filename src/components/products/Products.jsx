import React, { useEffect } from 'react'

export default function Products() {
  const getProducts = async() =>{
    const response = await fetch(`https://dummyjson.com/products`);
    const result = await response.json();
    console.log(result);
  }

  useEffect(()=>{
    getProducts();
  }, [])
  
  return (
    <div>
      <h2>hhhh</h2>
    </div>
  )
}
