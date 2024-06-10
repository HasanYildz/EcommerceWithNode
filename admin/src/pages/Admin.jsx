import React from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from "react-router-dom";
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';
import TopZiy from '../components/TopZiy'; // Yeni isimle import

const Admin = () => {
    return (
        <div className='lg:flex'>
            <Sidebar />
            <Routes>
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/listproduct" element={<ListProduct />} />
                <Route path="/visitors" element={<TopZiy />} /> {/* Yeni isimle route */}
            </Routes>
        </div>
    )
}

export default Admin;
