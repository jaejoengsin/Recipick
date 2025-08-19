import { useState } from 'react'
import {BrowserRouter, Routes,Route,Link } from 'react-router-dom'


import Register from './pages/Register';
import LogIn from './pages/LogIn';
import MyFridge from './pages/MyFridge';
import RecipeNav from './pages/RecipeNav';
import RecipeCart from './pages/RecipeCart';
import History from './pages/History';

//import "./NavBar.css";
import "./styles/comon.css"
import "./App.css";

import RefrigeratorIcon from './assets/icons/RefrigeratorIcon.png';
import SearchIcon from './assets/icons/searchIcon.png';
import AddCartIcon from "./assets/icons/addCartIcon.png"; 
import HistoryIcon from "./assets/icons/HistoryIcon.png";

function NavBar() {
  return (
    //이 nav를 감싸는 상위 컴포넌트 필
      <nav className="bottom-nav container-lg">
      <Link to="/register" className="nav-item" title="나의 냉장고">
        <img src={RefrigeratorIcon} alt="Refrigerator Icon" className="nav-icon" />
      </Link>
      <Link to="/recipenav" className="nav-item" title="레시피 탐색">
        <img src={SearchIcon} alt="Search Icon" className="nav-icon" />
      </Link>
      <Link to="/recipecart" className="nav-item" title="장바구니">
        <img src={AddCartIcon} alt="Add Cart Icon" className="nav-icon" />
      </Link>
      <Link to="/history" className="nav-item" title="히스토리">
        <img src={HistoryIcon} alt="History Icon" className="nav-icon" />
      </Link>
    </nav>
  
  );
}

function ContentFrame({ children }) {
  return (
    
    <div className='container-lg main-box'>
      {children}
    </div>


  );
}


export default function App() {
  
  return (
    // path에 맞지 않는기존 컴포넌트들은 자동으로 언마운트(삭제)
    <>
    <BrowserRouter>
        <div className='d-flex flex-column mt-5 mb-4 justify-content-center mx-auto' style={{
          width: 'fit-content', '@media (max-height: px)': {
            fontSize: '14px'
          } }}>
          <div className=" flex-grow-1 px-2">
      <ContentFrame>
          <Routes>
            <Route index element={<LogIn />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/myfridge" element={<MyFridge />}/>
            <Route path="/recipenav" element={<RecipeNav />} />
            <Route path="/recipecart" element={<RecipeCart />} />
            <Route path="/history" element={<History />} />
          </Routes>
      </ContentFrame>
      </div>
          <div className="flex-grow-1 mt-4 px-3">
            <NavBar />
         </div>
    </div>
      </BrowserRouter>
    </>
  )
}

