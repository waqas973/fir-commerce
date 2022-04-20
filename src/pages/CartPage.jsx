import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import firedb from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector(state => state.cartReducer.cartItems);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  //  DELETE TO CART FUNCTION
  const del_To_Cart = item => {
    dispatch({ type: "DEL_TO_CART", payload: item });
  };

  // PLACE ORDER

  const placeOrder = async e => {
    e.preventDefault();

    const addressInfo = {
      name,
      address,
      pinCode,
      phone,
    };

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).email,
      userId: JSON.parse(localStorage.getItem("currentUser")).uid,
    };

    try {
      setLoading(true);
      await addDoc(collection(firedb, "orders"), orderInfo);
      setLoading(false);
      toast.success("order placed successfully");
      setName("");
      setAddress("");
      setPinCode("");
      setPhone("");
      setIsModelOpen(false);
      localStorage.removeItem("cartItems");
      dispatch({ type: "EMPTY_CART" });
      navigator("/");
    } catch (error) {
      setLoading(false);
      toast.error("order failed");
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // CALCULATE TOTAL AMOUNT
  useEffect(() => {
    let temp = 0;
    cartItems.forEach(item => (temp += item.price));

    setTotalAmount(temp);
  }, [cartItems]);

  return (
    <Layout loading={loading}>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image </th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map(item => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  style={{ height: "3rem", width: "3rem" }}
                />{" "}
              </td>
              <td>{item.name}</td>
              <td>{item.price} RS./</td>
              <td>
                <FaTrash onClick={() => del_To_Cart(item)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <h1
          className="total__amount"
          style={{ backgroundColor: "#D2B48C", padding: "5px" }}
        >
          Total Amount - {totalAmount} RS./
        </h1>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button type="button" onClick={() => setIsModelOpen(true)}>
          Place Order
        </button>
      </div>

      {/* <!-- Modal --> */}

      <div
        className={` ${isModelOpen ? "modal  d-block" : "  fade d-none"}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Your Address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setIsModelOpen(false)}
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <textarea
                  className="form-control mt-3"
                  placeholder="address"
                  value={address}
                  rows={5}
                  onChange={e => setAddress(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="pinCode"
                  value={pinCode}
                  onChange={e => setPinCode(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="phone number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setIsModelOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={placeOrder}
                >
                  {loading ? "Loading..." : "ORDER"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
