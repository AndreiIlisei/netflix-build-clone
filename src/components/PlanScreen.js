import React, { useEffect, useState } from "react";
import "../styles/planScreen.css";
import { db } from "../firebase";
import { query, collection, where, getDocs, addDoc } from "@firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const q = query(collection(db, "products"), where("active", "==", true));
    const querySnapshot = await getDocs(q);
    const products = {};
    const data = querySnapshot.forEach(async (productDoc) => {
      products[productDoc.id] = productDoc.data();
      const subQuery = query(
        collection(db, `products/${productDoc.id}/prices`)
      );
      const subQDetails = await getDocs(subQuery);
      subQDetails.docs.map((price) => {
        products[productDoc.id].price = {
          id: price.id,
          ...price.data(),
        };
      });
    });
    setProducts(products);
  };

  const loadCheckout = async (id) => {
    const firstQ = collection(db, "customers/user.uid/checkout_sessions");
    const secondQ = query(
      firstQ,
      addDoc({
        price: id,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      })
    );

    secondQ.onSnapshopt(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51LpCKmHO1lI6EMwlLvPQQSBZ2A6JTa6PmqXwLcYstnaf04qaG7CQYGW3DYWmrIL4QjzXfKQnDQaIeWSjrHyLx0fY000otcrJ7t"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  console.log(products);

  return (
    <div className="planScreen">
      {Object.entries(products).map(([productId, productData]) => {
        console.log(productData)
        return (
          <div className="planScreen_plan">
            <div className="planScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button onClick={() => loadCheckout(productData.price.id)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
