import React from 'react';
import './App.css';
import Home from './home';
import About from './about';
import Form from './form';
import Table from './table';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Form1 from './form1';
import Form2 from './form2';
import Form3 from './form3';
import Form4 from './form4';
import Form5 from './form5';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'element={<Home/>} />
        <Route path='/about'element={<About/>} />
        <Route path='/form'element={<Form/>} />
        <Route path='/table'element={<Table/>} />
        <Route path='/form1'element={<Form1/>} />
        <Route path='/form2'element={<Form2/>} />
        <Route path='/form3'element={<Form3/>} />
        <Route path='/form4'element={<Form4/>} />
        <Route path='/form5'element={<Form5/>} />
      </Routes>
    </Router>
  );
}

export default App;
