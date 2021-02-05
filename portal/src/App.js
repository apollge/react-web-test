import logo from './logo.svg';
import React, { useState, useEffect} from 'react'; 
import './App.css';
import axios from './helper/axios'

// Load toast
import ToastMessage from './helper/toastContainer';
import {toast} from 'react-toastify';

function App() {
     const [cartList, addToCart] = useState([]);
     
     useEffect(() => {
       displayCatalog();
     }, [])

     const displayCatalog = () => {
       axios
            .get('catalog?key=3fc45675')
            .then(response => {
               // Continue your code...
            })
            .catch(() => toast.error('Failed to fetch catalog..'))
     }

     const getProducts = () => {}
     const addProducts = () => {}
     const updateProduct = () => {}
     const deleteProduct = () => {}

    return (
        <React.Fragment>
          <button onClick={getProducts}>Get available products</button>
          <ToastMessage />
        </React.Fragment>
    );
}

export default App;
