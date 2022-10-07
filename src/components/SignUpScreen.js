import React, { useRef } from "react";
import "../styles/signUpScreen.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

function SignUpScreen() {
  const auth = getAuth();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error.message)
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error.message)
      });
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In </h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" />
        <button onClick={signIn}>Sign In</button>

        <h4>
          <span className="signupScreen_grey">New to Netflix? </span>
          <span onClick={register} className="signupScreen_link">
            Sign up now!
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
