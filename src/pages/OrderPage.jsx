import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import firedb from "../firebaseConfig";

const OrderPage = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);

  //  GET ORDERS DATA
  const getOrders = async () => {
    setLoading(true);
    try {
      const orderArray = [];
      const result = await getDocs(collection(firedb, "orders"));
      result.forEach(doc => {
        orderArray.push(doc.data());
      });
      setOrders(orderArray);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout loading={loading}>
      {orders?.map((order, i) => (
        <table className="table mt-3 table-success" key={i}>
          <thead>
            <tr>
              <th>Image </th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order?.cartItems?.map((item, i) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </Layout>
  );
};

export default OrderPage;
