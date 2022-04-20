import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { collection, getDocs } from "firebase/firestore";
import firedb from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const navigator = useNavigate();
  const cartItems = useSelector(state => state.cartReducer.cartItems);
  const dispatch = useDispatch();

  //  GET PRODUCT DATA
  const getProductData = async () => {
    setLoading(true);
    try {
      const productArr = [];
      const allProduct = await getDocs(collection(firedb, "products"));
      allProduct.forEach(doc => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productArr.push(obj);
      });

      setProducts(productArr);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //  ADD TO CART FUNCTION

  const addToCart = product => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // console.log(JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout loading={loading}>
      <div className="container py-4">
        <div className="d-flex w-50 align-items-center">
          <input
            type="text"
            className="form-control mt-0"
            placeholder="search items "
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
            style={{ marginRight: "1.5rem", marginLeft: "0.4rem" }}
          />
          <select
            name=""
            id=""
            className="form-control "
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            <option value="bags">Bags</option>
            <option value="shoes">Shoes</option>
            <option value="shirts">Shirts</option>
            <option value="watches">Watches</option>
          </select>
        </div>
        <div className="row my-3">
          {products
            .filter(obj => obj.name.toLowerCase().includes(searchKey))
            .filter(obj => obj.Category.toLowerCase().includes(filterType))
            .map(product => (
              <div className="col-md-4" key={product.id}>
                <div className="product m-2 p-1 position-relative">
                  <div className="product-content">
                    <p>{product.name}</p>
                    <div className="text-center">
                      <img
                        src={product.imgUrl}
                        alt={product.name}
                        className="product-img"
                      />
                    </div>
                  </div>
                  <div className="product-actions">
                    <h2>{product.price} RS/-</h2>
                    <div className="d-flex">
                      <button
                        style={{ marginRight: "10px" }}
                        onClick={() => addToCart(product)}
                      >
                        ADD TO CART{" "}
                      </button>
                      <button
                        onClick={() => navigator(`/productinfo/${product.id}`)}
                      >
                        VIEW{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
