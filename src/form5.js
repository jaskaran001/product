import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Navbar from './navbar';

function Form5(){
    function xyz(e){
        e.preventDefault();
        var data=new FormData(e.currentTarget);
        
                var mname=data.get("mname");
                var bname=data.get("bname");
                var cp=data.get("cp");
                var sp=data.get("sp");
                var opt= data.get("opt")
                var mrp=data.get("mrp");
                var mem=data.get("mem");
                var ram=data.get("ram");



                console.log(mname + bname + cp + sp + mrp + opt + mem + ram)
                db.collection("form5").add({
                    MODELNAME:mname,
                    BRANDNAME:bname,
                    COSTPRICE:cp,
                    SELLINGPRICE:sp,
                    OPTION:opt, 
                    MRP:mrp, 
                    MEMORY:mem, 
                    RAM:ram, 
                }).then((succ)=>{
                    alert("data entered")
                }).catch((err)=>{
                    alert("can not add data")
                })
                e.target.reset();
                e.target.mname.focus();
        }
        const[data,setdata]=useState([]);
        function getdata(){
            db.collection("form5").onSnapshot((succ)=>{
                var ar=[];
                succ.forEach((abc)=>{
                    ar.push(abc);
                })
                setdata(ar)
            })
        }
        useEffect(()=>{
            getdata();
        },[])
    return(

        <>
            <Navbar/>
            <form className="col-lg-3"onSubmit={xyz}>
            <div className="form-group">
            <input type="text" className="form-control" placeholder="mobile name" name="mname"></input>
        </div>
        
        <div className="form-group">
            <input type="text" className="form-control" placeholder="brand name" name="bname"></input>
        </div>
        
        <div className="form-group">
            <input type="text" className="form-control" placeholder="cost price"name="cp"></input>
        </div>
        
        <div className="form-group">
            <input type="text" className="form-control" placeholder="selling price" name="sp"></input>
        </div>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="MRP" name="mrp"></input>
        </div>
        <div className="form-group">
            Type:
            <select className="form-control" name="opt">
                <option value="Android">Android</option>
                <option value="IOS">IOS</option>
            </select>
        </div>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="memory" name="mem"></input>
        </div>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="ram" name="ram"></input>
        </div>
        
        <div className="form-group">
            <input type="submit" className="btn btn-success" ></input>
        </div>
            </form>
            <div className="col-lg-9">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Mobile Name</th>
                        <th>Brand Name</th>
                        <th>Cost Price</th>
                        <th>Selling Price</th>
                        <th>MRP</th>
                        <th>Type</th>
                        <th>Memory</th>
                        <th>Ram</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row)=>(
                        <tr key={row.id}>
                            <td>{row.data().MODELNAME}</td>
                            <td>{row.data().BRANDNAME}</td>
                            <td>{row.data().COSTPRICE}</td>
                            <td>{row.data().SELLINGPRICE}</td>
                            <td>{row.data().MRP}</td>
                            <td>{row.data().OPTION}</td>
                    
                            <td>{row.data().MEMORY}</td>
                            <td>{row.data().RAM}</td>
                            

                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </>
    )
}
export default Form5;       