import { useState } from 'react';
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup, User, signOut} from "firebase/auth";
import './authpage.css'
// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuM8iXDlgdzBYiRvH-jrTdt00JZQK0Xk0",
    authDomain: "software-dev-a3c67.firebaseapp.com",
    projectId: "software-dev-a3c67",
    storageBucket: "software-dev-a3c67.appspot.com",
    messagingSenderId: "987839157243",
    appId: "1:987839157243:web:54da22d04f676c06c7f15e",
    measurementId: "G-Y6FEF9E70S"
};

initializeApp(firebaseConfig);

function GoogleSignInButton() {
    const [user, setUser] = useState<User | null>(null);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const auth = getAuth();
            const result = await signInWithPopup(auth,provider);
            const user = result.user;
            setUser(user);
            // Handle successful sign-in (e.g., redirect to a dashboard)
            // You can use a router or other navigation methods here
            window.location.href = "/Twill/editor" // Replace with your desired URL
        } catch (error) {
            console.error(error);
            // Handle sign-in errors (e.g., display an error message)
            alert("Error signing in with Google");
        }
    };

    function signou(){
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className="container">
            <h1 className="heading">Twill - A Modern Text Editor</h1>
            {user ? (
                <div className="user-container">
                    <p>Welcome, {user.displayName}!</p>
                    <button className="button" onClick={signou}>Sign Out</button>
                </div>
            ) : (
                <button className="button" onClick={signInWithGoogle}>Sign in with Google</button>
            )}
        </div>
    );
}

export default GoogleSignInButton;