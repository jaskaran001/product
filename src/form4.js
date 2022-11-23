import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Navbar from './navbar';

function Form4(){
    function xyz(e){
        e.preventDefault();
        var data=new FormData(e.currentTarget);
        
                var name=data.get("name");
                var quali=data.get("quali");
                var tm=data.get("tm");
                var mo=data.get("mo");
                var dep=data.get("dep");

                console.log(name + quali + tm + mo + dep)
                e.target.reset();
                e.target.name.focus();
                db.collection("form4").add({
                    NAME:name,
                    QUALIFICATION:quali,
                    TOTALMARKS:tm,
                    MARKSOBTAINED:mo,
                    DEPARTMENT:dep
                }).then((succ)=>{
                    alert("data added");
                }).catch((err)=>{
                    alert("can't added");
                })
            }
            const[data,setdata]=useState([]);
            function getdata(){
                db.collection("form4").onSnapshot((succ)=>{
                    var ar=[];
                    succ.forEach((abc)=>{
                        ar.push(abc)
                    })
                    setdata(ar);
                })
            }
            useEffect(()=>{
                getdata();
            },[])
    return(
        <>
            <Navbar/>
            <form className="col-lg-3" onSubmit={xyz}>
            <div className="form-group">
            <input type="text" className="form-control" placeholder="name" name="name"></input>
        </div>
        
        <div className="form-group">
            <input type="text" className="form-control" placeholder="qualification" name="quali"></input>
        </div>
        
        <div className="form-group">
            <input type="text" className="form-control" placeholder="total marks"name="tm"></input>
        </div>
        
        <div className="form-group">
            <input type="text" className="form-control" placeholder="marks obtain" name="mo"></input>
        </div>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="department" name="dep"></input>
        </div>
        
        <div className="form-group">
            <input type="submit" className="btn btn-success" ></input>
        </div>
            </form>
            <div className="col-lg-9">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Qualification</th>
                        <th>Total Marks</th>
                        <th>Marks Obtain</th>
                        <th>Department</th>
                        <th>Delete/Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row)=>(
                        <tr key={row.id}>
                            <td>{row.data().NAME}</td>
                            <td>{row.data().QUALIFICATION}</td>
                            <td>{row.data().TOTALMARKS}</td>
                            <td>{row.data().MARKSOBTAINED}</td>
                            <td>{row.data().DEPARTMENT}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </>
    )
}
export default Form4;