import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Navbar from './navbar';

function Form3(){
    function xyz(e){
        e.preventDefault();
        var data=new FormData(e.currentTarget);
        
                var pname=data.get("pname");
                var bname=data.get("bname");
                var mrp=data.get("mrp");
                var cp=data.get("cp");
                var sp=data.get("sp");

                console.log(pname + bname + mrp + cp + sp)
                e.target.reset();
                e.target.pname.focus();

                db.collection("form3").add({
                    PRODUCTNAME:pname,
                    BRANDNAME:bname,
                    MRP:mrp,
                    COSTPRICE:cp,
                    SELLINGPRICE:sp

                }).then((succ)=>{
                    alert("data entered")
                }).catch((err)=>{
                    alert("can't add ")
                })
            }
            const [data,setdata]=useState([]);
            function getdata(){
                db.collection("form3").onSnapshot((succ)=>{
                    var ar=[];
                    succ.forEach((abc)=>{
                        ar.push(abc)
                    })
                    setdata(ar);
                })
            }
            useEffect(()=>{
                getdata()
            },[])
    return(
        <>
            <Navbar/>
            <form className="col-lg-3" onSubmit={xyz}>
            <div className="form-group">
            <input type="text" className="form-control" placeholder="product name" name="pname"></input>
        </div>
        
        <div className="form-group">
            <input type="text" className="form-control" placeholder="brand name" name="bname"></input>
        </div>
        
        <div className="form-group">
            <input type="text" className="form-control" placeholder="MRP"name="mrp"></input>
        </div>
        
        <div className="form-group">
            <input type="text" className="form-control" placeholder="cost price" name="cp"></input>
        </div>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="sell price" name="sp"></input>
        </div>
        
        <div className="form-group">
            <input type="submit" className="btn btn-success" ></input>
        </div>
            </form>
            <div className="col-lg-9">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Brand Name</th>
                        <th>MRP</th>
                        <th>Cost Price</th>
                        <th>Selling Price</th>
                        <th>Delete/Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row)=>(
                        <tr key={row.id}>
                            <td>{row.data().PRODUCTNAME}</td>
                            <td>{row.data().BRANDNAME}</td>
                            <td>{row.data().MRP}</td>
                            <td>{row.data().COSTPRICE}</td>
                            <td>{row.data().SELLINGPRICE}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </>
    )
}
export default Form3;