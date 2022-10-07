import React, { useEffect } from "react";
import HomeScreen from "./components/HomeScreen.js";
import "./styles/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/LoginScreen.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/counter/userSlice.js";
import ProfileScreen from "./components/ProfileScreen.js";

function App() {
  const user = useSelector(selectUser);
  const auth = getAuth(firebaseApp);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/profile" element={<ProfileScreen />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
