import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../component/Layout";
import firedb from "../firebaseConfig";

const ProductInfo = () => {
  const [product, setProduct] = useState();
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);

  //  GET PRODUCT DATA
  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(firedb, "products", productId));
      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Layout loading={loading}>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <p>
                  <b>{product.name}</b>
                </p>
                <img
                  src={product.imgUrl}
                  alt={product.name}
                  className="product__info-img"
                  style={{
                    height: "40rem",
                    width: "30rem",
                  }}
                />
                <hr />
                <p>{product.Description}</p>

                <div className="d-flex justify-content-end mt-3">
                  <button type="button">ADD TO CART </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
