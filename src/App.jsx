import { useState } from 'react'
import {BrowserRouter, Routes,Route,Link } from 'react-router-dom'


import Register from './pages/Register';
import LogIn from './pages/LogIn';
import MyFridge from './pages/MyFridge';
import RecipeNav from './pages/RecipeNav';
import RecipeCart from './pages/RecipeCart';
import History from './pages/History';
import MainLayout from './pages/MainLayout';

//import "./NavBar.css";

import "./App.css";


export default function App() {
  
  return (
    // path에 맞지 않는기존 컴포넌트들은 자동으로 언마운트(삭제)
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<LogIn />} />
        <Route path="register" element={<Register />} />
        <Route path="main" element={<MainLayout />}>
            <Route path="myfridge" element={<MyFridge />}/>
            <Route path="recipenav" element={<RecipeNav />} />
            <Route path="recipecart" element={<RecipeCart />} />
            <Route path="history" element={<History />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

