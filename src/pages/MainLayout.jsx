
import React from 'react';
import { Outlet, Link} from 'react-router-dom';

import "./MainLayout.css";
import "./../styles/common.css"
import "../styles/font.css";

import RefrigeratorIcon from './../assets/icons/RefrigeratorIcon.png';
import SearchIcon from './../assets/icons/searchIcon.png';
import AddCartIcon from "./../assets/icons/addCartIcon.png";
import HistoryIcon from "./../assets/icons/HistoryIcon.png";



function NavBar() {
    return (
        //이 nav를 감싸는 상위 컴포넌트 필
        <nav className="bottom-nav ">
            <Link to="/main/myfridge" className="nav-item" title="나의 냉장고">
                <img src={RefrigeratorIcon} alt="Refrigerator Icon" className="nav-icon" />
            </Link>
            <Link to="/main/recipenav" className="nav-item" title="레시피 탐색">
                <img src={SearchIcon} alt="Search Icon" className="nav-icon" />
            </Link>
            <Link to="/main/recipecart" className="nav-item" title="장바구니">
                <img src={AddCartIcon} alt="Add Cart Icon" className="nav-icon" />
            </Link>
            <Link to="/main/history" className="nav-item" title="히스토리">
                <img src={HistoryIcon} alt="History Icon" className="nav-icon" />
            </Link>
        </nav>

    );
}
function ContentFrame({ children }) {
    return (
        <>
        <button
            id="profile-button"
            className="circle-btn"
            style={{ position: 'fixed', top: '16px', right: '16px' }}>
        <i className="fa-solid fa-user"></i>
        </button>
        <div className=' main-box'>
            {children}
        </div>
        </>
    );
}

function MainLayout(){
    return (
        <div className="container mt-3 px-3">
            
            <div className="container">
                {/* 👇 여기에 코드를 추가했습니다. */}
                <div className="text-center mb-5">
                    <h1 style={{ fontFamily: "'RecipeFont', sans-serif" }} >Recipick</h1>
                </div>
                <ContentFrame>
                    <Outlet />
                </ContentFrame>
            </div>
            <div className="container mt-4">
                <NavBar />
            </div>
        </div>
    );
}

export default MainLayout;