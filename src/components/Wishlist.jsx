import { useSelector, useDispatch } from "react-redux";
import {
  fetchWishlist,
  deleteWishlistItem,
} from "../features/wishlist/wishlistSlice";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistStatus = useSelector((state) => state.wishlist.status);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    dispatch(fetchWishlist()).then((response) => {
      setWishlistItems(response.payload || []);
    });
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(deleteWishlistItem(productId));
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.productId._id !== productId),
    );
  };

  if (wishlistStatus === "loading") {
    return (
      <div className="text-center my-5">
        <span className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (wishlistStatus === "failed") {
    return (
      <div className="text-center text-danger my-5">
        Failed to load wishlist. Please try again later.
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">Your Wishlist</h2>
        {wishlistItems.length > 0 ? (
          <div className="row">
            {wishlistItems.map((item) => (
              <div key={item.productId._id} className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.productId.imageUrl || "path/to/default-image.jpg"}
                    className="card-img-top"
                    alt={item.productId.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.productId.name}</h5>
                    <p className="card-text">
                      <strong>Price: ${item.productId.price}</strong>
                    </p>
                    <button
                      className="btn btn-danger mt-auto mb-2"
                      onClick={() => handleRemove(item.productId._id)}
                    >
                      Remove
                    </button>
                    <button className="btn btn-secondary">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>Your wishlist is empty. Start adding some products!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
