import React from "react";
import Navbar from './navbar';
function About(){
    function xyz(e){
e.preventDefault();
var data=new FormData(e.currentTarget);

        var name=data.get("name");
        var email=data.get("email");
        var num=data.get("num");
        var pass=data.get("pass");
        console.log(name + email + num + pass)
        e.target.reset();
        e.target.name.focus();
    }
    return(
        <>
        <Navbar/>
        <form className="col-lg-4 col-lg-offset-4 abc" onSubmit={xyz}>
        <div className="form-group">
            <h1>FORM</h1>
        </div>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="name" name="name"></input>
        </div>
        
        <div className="form-group">
            <input type="email" className="form-control" placeholder="email" name="email"></input>
        </div>
        
        <div className="form-group">
            <input type="tel" className="form-control" placeholder="contact no."name="num"></input>
        </div>
        
        <div className="form-group">
            <input type="password" className="form-control" placeholder="password" name="pass"></input>
        </div>
        
        <div className="form-group">
            <input type="submit" className="btn btn-success" ></input>
        </div>
        </form>
        </>
    )
}

export default About;