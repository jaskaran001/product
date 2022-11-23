import React from "react";
import Navbar from './navbar'
import { Link } from "react-router-dom";
 function Table(){
    function btn1(){
        alert("welcome here");
    }
    function btn2(x){
        alert("welcome"+" "+x)
    }
    function rock(x){
        alert(x)
    }

    var obj = [{Name:"Ria",Class:1,Section:"A"},
                {Name:"Rubi",Class:1,Section:"A"},
                {Name:"Ruhi",Class:1,Section:"A"},
                {Name:"David",Class:1,Section:"A"},
                {Name:"Harry",Class:1,Section:"A"},
                {Name:"Sanju",Class:1,Section:"A"}];
    return(
        <>
          <Navbar/> 
            <div>
                <h1>Home Page</h1>
                <button className="btn btn-danger" onClick={btn1}>Click here</button><br/>
                <button className="btn btn-success" onClick={()=>btn2("Anmol")}>Click here</button>

            </div>
            <div className="col-lg-4">
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>      </th>
                </tr>
                </thead>
                <tbody>
                    {obj.map((row)=>(
                        <tr>
                            <td>
                                {row.Name}
                            </td>
                            <td>
                                {row.Class}
                            </td>
                            <td>
                                {row.Section}
                            </td>
                            <td><button onClick={()=>rock(row.Name)}>click</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </>
    )
}
export default Table;