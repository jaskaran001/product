import React, { useEffect, useState } from "react";
import Navbar from './navbar';
import { db } from "./firebase";

function Form1() {
    function xyz(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);

        var name = data.get("name");
        var email = data.get("email");
        var num = data.get("num");
        var pass = data.get("pass");
        console.log(name + email + num + pass)
        e.target.reset();
        e.target.name.focus();
        db.collection("form1").add({
            NAME: name,
            EMAIL: email,
            NUMBER: num,
            PASSWORD: pass
        }).then((succ) => {
            alert("data enter")
        }).catch((err) => {
            alert("can't add")
        })
    }
    const [data, setdata] = useState([]);
    function getdata() {
        db.collection("form1").onSnapshot((succ) => {
            var ar = [];
            succ.forEach((abc) => {
                ar.push(abc);
            })
            setdata(ar)
        })
    }
    useEffect(() => {
        getdata();
    }, [])
    function del(x) {
        if (window.confirm("ready to delete it")) {
            alert("deleted")
            db.collection("form1").doc(x).delete();
        }

    };
    const [id1, setid1] = useState()
    function edit(x) {
        setid1(x);
        // console.log(x.id)
    }
    const [nm, setnm] = useState('')
    const [em, setem] = useState('')
    const [num, setnum] = useState('')
    const [pas, setpas] = useState('')
    function getoneuser() {
        if (id1) {
            db.collection("form1").doc(id1).get().then((succ) => {
                setnm(succ.data().NAME)
                setem(succ.data().EMAIL)
                setnum(succ.data().NUMBER)
                setpas(succ.data().PASSWORD)
            })
        }
    }

    useEffect(() => {
        getoneuser();
    }, [id1])

    function editform(e) {
        e.preventDefault();
        // console.log(id1)
        db.collection("form1").doc(id1).update({
            NAME: nm,
            EMAIL: em,
            NUMBER: num,
            PASSWORD: pas
        }).then((succ) => {
            alert("updated")
        })
    }
    return (
        <>
            <Navbar />
            <form className="col-lg-3" onSubmit={xyz}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="name" name="name"></input>
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="email" name="email"></input>
                </div>

                <div className="form-group">
                    <input type="tel" className="form-control" placeholder="contact no." name="num"></input>
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="password" name="pass"></input>
                </div>

                <div className="form-group">
                    <input type="submit" className="btn btn-success" value={'edit form'} ></input>
                </div>
            </form>
            <div className="col-lg-9">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Password</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td>{row.data().NAME}</td>
                                <td>{row.data().EMAIL}</td>
                                <td>{row.data().NUMBER}</td>
                                <td>{row.data().PASSWORD}</td>
                                <td><button className="btn btn-danger" onClick={() => del(row.id)}>Delete</button></td>
                                <td><button className="btn btn-success" data-toggle="modal" data-target="#mymodal" onClick={() => edit(row.id)}>Edit</button></td>


                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>


            <div className="modal fade" role={'dialog'} id="mymodal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">
                                <button className="close" data-dismiss="modal">x</button>
                                <h3>Edit data</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editform}>
                                <div className="form-group">
                                    <input value={nm} type="text" className="form-control" onChange={(e) => setnm(e.target.value)} placeholder="name" name="name"></input>
                                </div>

                                <div className="form-group">
                                    <input value={em} type="email" className="form-control" onChange={(e) => setem(e.target.value)} placeholder="email" name="email"></input>
                                </div>

                                <div className="form-group">
                                    <input value={num} type="tel" className="form-control" onChange={(e) => setnum(e.target.value)} placeholder="contact no." name="num"></input>
                                </div>

                                <div className="form-group">
                                    <input value={pas} type="password" className="form-control" onChange={(e) => setpas(e.target.value)} placeholder="password" name="pass"></input>
                                </div>

                                <div className="form-group">
                                    <input type="submit" className="btn btn-success" value={'editform'} ></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Form1;