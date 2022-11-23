import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Navbar from './navbar';

function Form2(){
    function xyz(e){
        e.preventDefault();
        var data=new FormData(e.currentTarget);
        
                var name=data.get("name");
                var fname=data.get("fname");
                var mname=data.get("mname");
                var gen=data.get("gen");
                var date=data.get("date");
                
                console.log(name + fname + mname + gen + date)
                e.target.reset();
                e.target.name.focus();
                db.collection("form2").add({
                    NAME:name,
                    FATHERNAME:fname,
                    MOTHERNAME:mname,
                    GENDER:gen,
                    DOB:date
                }).then((succ)=>{
                    alert("data added");
                }).catch((err)=>{
                    alert("can't add");
                })
            }
            const[data,setdata] = useState([]);
            function getdata(){
                db.collection("form2").onSnapshot((succ)=>{
                    var ar =[];
                    succ.forEach((abc)=>{
                        ar.push(abc)
                    })
                    setdata(ar)
                })
            }
            useEffect(()=>{
                getdata()
            },[])

            function del(x){
                if(window.confirm("ready to delete it")){
                    alert("deleted")
                    db.collection("form2").doc(x).delete();
                }
            }
            const[id1,setid1]=useState()
            function edit(x){
                setid1(x)
            }
            const[nm,setnm]=useState('')
            const[fn,setfn]=useState('')
            const[mn,setmn]=useState('')
            const[gen,setgen]=useState('')
            const[dob,setdob]=useState('')
        function getoneuser(){
            if(id1){
                db.collection("form2").doc(id1).get().then((succ)=>{
                    setnm(succ.data().NAME)
                    setfn(succ.data().FATHERNAME)
                    setmn(succ.data().MOTHERNAME)
                    setgen(succ.data().GENDER)
                    setdob(succ.data().DOB)

                })
            }
        }
        useEffect(()=>{
            getoneuser()
        },[id1])
        function editform(e){
            e.preventDefault();
            db.collection("form2").doc(id1).update({
                NAME:nm,
                FATHERNAME:fn,
                MOTHERNAME:mn,
                GENDER:gen,
                DOB:dob

            }).then((succ)=>{
                alert("updated")
            })
        }
        return(
        <>
            <Navbar/>
            <form className="col-lg-3" onSubmit={xyz}>
            <div className="form-group">
            <input type="text" className="form-control" placeholder="name" name="name"></input>
        </div>
        
        <div className="form-group">
            <input type="text" className="form-control" placeholder="father name" name="fname"></input>
        </div>
        
        <div className="form-group">
            <input type="text" className="form-control" placeholder="mother name" name="mname"></input>
        </div>
        
        <div className="form-group">
            Gender <input type="radio" value={'male'} name="gen"></input>Male <input type="radio" value={'female'} name="gen"></input>Female
        </div>
        <div className="form-group">
            <input type="date" className="form-control" name="date"></input>
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
                        <th>F.Name</th>
                        <th>M.Name</th>
                        <th>Gender</th>
                        <th>D.O.B</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row)=>(
                        <tr key={row.id}>
                            <td>{row.data().NAME}</td>
                            <td>{row.data().FATHERNAME}</td>
                            <td>{row.data().MOTHERNAME}</td>
                            <td>{row.data().GENDER}</td>
                            <td>{row.data().DOB}</td>
                            <td><button className="btn btn-danger" onClick={()=>del(row.id)}>delete</button></td>
                            <td><button className="btn btn-success" data-toggle="modal" data-target="#mymodal" onClick={()=>edit(row.id)}>edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
<div className="modal fade" role="dialog" id="mymodal">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <div className="modal-title">
                    <button className="close" data-dismiss="modal">x</button>
                    <h2>Edit Form</h2>
                </div>
            </div>
            <div className="modal-body">
                <form onSubmit={editform}>
                    <div className="form-group">
                        <input type="text" value={nm} onChange={(e)=>setnm(e.target.value)} className="form-control" placeholder="name" name="name"></input>
                    </div>
                        
                    <div className="form-group">
                        <input type="text" value={fn} onChange={(e)=>setfn(e.target.value)} className="form-control" placeholder="father name" name="fname"></input>
                    </div>
                        
                    <div className="form-group">
                        <input type="text" value={mn} onChange={(e)=>setmn(e.target.value)} className="form-control" placeholder="mother name"name="mname"></input>
                    </div>
                        
                    <div className="form-group" onChange={(e)=>setgen(e.target.value)}>
                        Gender <input type="radio"  value={'male'} checked={(gen=='male')&&(true)}  name="gen"></input>Male
                               <input type="radio" value={'female'} checked={(gen=='female')&&(true)} name="gen"></input>Female
                    </div>
                    <div className="form-group">
                        <input type="date" className="form-control" value={dob} onChange={(e)=>setdob(e.target.value)} name="date"></input>
                    </div>
                        
                    <div className="form-group">
                        <input type="submit" className="btn btn-success" value={'edit form'}></input>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
        </>
    )
}
export default Form2;