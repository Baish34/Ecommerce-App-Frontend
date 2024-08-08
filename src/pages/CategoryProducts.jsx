import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setFilters,
  clearFilters,
} from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

const CategoryProducts = () => {
  const dispatch = useDispatch();
  const { filteredProducts, status, error, filters } = useSelector(
    (state) => state.products,
  );

  const [ratingFilter, setRatingFilter] = useState(filters.rating || null);
  const [priceFilter, setPriceFilter] = useState(filters.price || "lowToHigh");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setFilters({
        rating: ratingFilter,
        price: priceFilter,
      }),
    );
  }, [dispatch, ratingFilter, priceFilter]);

  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value ? Number(e.target.value) : null);
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleClearFilters = () => {
    setRatingFilter(null);
    setPriceFilter("lowToHigh");
    dispatch(clearFilters());
  };

  // Sort products based on selected price filter
  const sortedProducts = React.useMemo(() => {
    const sorted = [...filteredProducts];
    if (priceFilter === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filteredProducts, priceFilter]);

  if (status === "loading")
    return <div className="text-center my-5">Loading...</div>;
  if (error)
    return <div className="text-center text-danger my-5">Error: {error}</div>;

  return (
    <div>
      <Header />
      <div className="container-fluid px-0">
        <div className="row gx-0">
          <div className="col-lg-3 mb-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <h5 className="mb-3">
                Filters
                <span
                  className="float-end text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={handleClearFilters}
                >
                  Clear
                </span>
              </h5>
              <div className="mb-4">
                <h6 className="mb-3">Rating</h6>
                {[4, 3, 2, 1].map((star) => (
                  <div className="form-check" key={star}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      value={star}
                      checked={ratingFilter === star}
                      onChange={handleRatingChange}
                    />
                    <label className="form-check-label">
                      {star} Star{star > 1 ? "s" : ""} & above
                    </label>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <h6 className="mb-3">Sort by</h6>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="price"
                    value="lowToHigh"
                    checked={priceFilter === "lowToHigh"}
                    onChange={handlePriceChange}
                  />
                  <label className="form-check-label">
                    Price - Low to High
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="price"
                    value="highToLow"
                    checked={priceFilter === "highToLow"}
                    onChange={handlePriceChange}
                  />
                  <label className="form-check-label">
                    Price - High to Low
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="bg-light p-4 rounded shadow-sm">
              <h5 className="mb-4">
                Showing All Products ( {sortedProducts.length} products )
              </h5>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
                {sortedProducts.map((product) => (
                  <div className="col mb-4" key={product._id.$oid}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
