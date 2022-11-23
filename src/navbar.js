import React from "react";
import { Link } from "react-router-dom";
import { auth, db, provider} from "./firebase"
function Navbar(){
    var userid = localStorage.getItem("Docid");
    console.log(userid)

    function login() {
            // alert("login")
            auth.signInWithPopup(provider)
                    .then((result) => {
                            /** @type {firebase.auth.OAuthCredential} */
                            var credential = result.credential;

                            // This gives you a Google Access Token. You can use it to access the Google API.
                            var token = credential.accessToken;
                            // The signed-in user info.
                            var user = result.user;
                            console.log(user)
                            db.collection("users").where("Email", "==", user.email).get().then((succ) => {
                                    if (succ.size == 0) {
                                            // alert("add")
                                            db.collection("users").add({
                                                    Name: user.displayName,
                                                    Email: user.email,
                                                    UID: user.uid
                                            }).then((succ) => {
                                                    alert("added")
                                                    localStorage.setItem("Docid",succ.id)
                                                    localStorage.setItem("UID",user.uid)
                                                    console.log(succ.id)
                                            })
                                    }
                                    else {
                                            alert("already added")

                                            db.collection("users").get().then((succc) => {
                                                    succc.forEach((abc) => {
                                                            localStorage.setItem("Docid", abc.id)
                                                            localStorage.setItem("UID", user.uid)
                                                            // console.log(abc.id);
                                                    })

                                            })
                                    }
                            })
                            // ...
                    }).catch((error) => {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            // The email of the user's account used.
                            var email = error.email;
                            // The firebase.auth.AuthCredential type that was used.
                            var credential = error.credential;
                            // ...
                    });
    }
    function logout(){
        alert("logout")
        localStorage.removeItem("Docid")
        localStorage.removeItem("UID")
    }
    return(
        <nav className="navbar navbar-inverse">
        <div className="container-fluid">
            <div className="navbar-header">
                <div className="navbar-brand">
                    FORM
                </div>
            </div>
            <ul className="nav navbar-nav navbar-right">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/table'>Table</Link></li>
                <li><Link to='/form'>Form</Link></li>
                <li><Link to='/form1'>Form1</Link></li>
                <li><Link to='/form2'>Form2</Link></li>
                <li><Link to='/form3'>Form3</Link></li>
                <li><Link to='/form4'>Form4</Link></li>
                <li><Link to='/form5'>Form5</Link></li>
                {userid ?(
                    <li><button className="btn btn-danger navbar-btn" onClick={logout}>logout</button></li>
                ):(
                    <li><button className="btn btn-warning navbar-btn" onClick={login}>login</button></li>
                )}
                
            </ul>
        </div>
    </nav>
    )
}

export default Navbar;