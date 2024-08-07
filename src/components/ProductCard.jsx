import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card d-flex flex-row">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "200px", height: "226px", backgroundColor: "#f8f9fa" }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          className="px-3"
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">
          <strong>${product.price}</strong>
          <br />
        </p>
        <p className="card-text">Rating: {product.rating} stars</p>
        <div className="mt-auto">
          <button className="btn btn-primary w-100 mb-2">Add to Cart</button>
          <button className="btn btn-secondary w-100">Save to Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
