import React from "react";
import Navbar from './navbar'
function Form(){
    return(
        <>
        <Navbar/>
        <div><br/><br/>
            <form className="col-lg-4 col-lg-offset-4 abc">
                <div className="form-group">
                    <h1>FORM</h1>
                </div><br/>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="first name"></input>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="last name"></input>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="enter email" pattern="[a-z]+[0-9]+[@][a-z]{5}[.][a-z]{3}"></input>
                </div>
                <div className="form-group">
                    <input type="tel" className="form-control" placeholder="enter contact no."></input>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="address"></input>
                </div>
                <div className="form-group">
                    <select className="form-control">
                    <option></option>
                        <option>Cricket</option>
                        <option>Football</option>
                        <option>Volleyball</option>
                    </select>
                </div>
                <div className="form-group">
                    <textarea rows={5} className="form-control" placeholder="feedback"></textarea>
                </div>
                
                <div className="form-group">
                 <button className="btn btn-success">submit</button>   
                 </div>
                

            </form>
        </div>
        </>
    )
}
export default Form;