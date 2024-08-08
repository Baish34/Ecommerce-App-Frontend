import React from "react";

const ProductCard = ({ product }) => {
  const { imageUrl, name, price, rating } = product;

  return (
    <div className="card h-100 d-flex flex-row shadow-sm">
      <div
        className="d-flex justify-content-center align-items-center bg-light"
        style={{ width: "200px", height: "226px" }}
      >
        <img
          src={imageUrl}
          alt={name || "Product Image"}
          className="img-fluid"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name || "Unnamed Product"}</h5>
        <p className="card-text">
          <strong>${price || "N/A"}</strong>
        </p>
        <p className="card-text">Rating: {rating || "N/A"} stars</p>
        <div className="mt-auto">
          <button className="btn btn-primary w-100 mb-2">Add to Cart</button>
          <button className="btn btn-secondary w-100">Save to Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
