import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import "../styles/profileScreen.css";
import Navbar from "./Navbar";
import { getAuth } from "firebase/auth";
import PlanScreen from "./PlanScreen";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const auth = getAuth();
  return (
    <div className="profileScreen">
      <Navbar />
      <div className="profileScreen_body">
        <h1> Edit Profile </h1>
        <div className="profileScreen_info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profileScreen_details">
            <h2>{user.email}</h2>
            <div className="profileScreen_plans">
              <h3> Plans </h3>
              <PlanScreen />
              <button
                onClick={() => auth.signOut()}
                className="profileScreen_signOut"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
