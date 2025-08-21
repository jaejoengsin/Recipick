
import {React, useState }from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';


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
       
        <div className=' main-box'>
            {children}
        </div>
        </>
    );
}

function ProfileDropdownPlain() {

    const navigate = useNavigate();

    const { logout } = useAuthStore();
    // 로그아웃 버튼을 클릭했을 때 실행될 함수
    const handleLogout = () => {
        // 1. 로그아웃 관련 로직을 여기에 작성합니다.
        // 예: 로컬 스토리지의 사용자 토큰 삭제
        logout();
        console.log('로그아웃 되었습니다.');
        // 2. 로그인 페이지로 이동합니다.
        navigate('/');
    };



    return (
        <div style={{ position: 'fixed', top: '16px', right: '16px' }}>
            <div className="dropdown">
                <button
                    id="profile-button"
                    className="btn btn-light circle-btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i className="fa-solid fa-user"></i>
                </button>

                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profile-button">
                    {/* a 태그 대신 button 태그를 사용하고 onClick 이벤트를 연결합니다. */}
                    <li>
                        <button className="dropdown-item" type="button" onClick={handleLogout}>
                            로그아웃
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
  

function MainLayout(){
    return (
        <div className="container mt-3 px-3">
            <ProfileDropdownPlain />
            {/* <div class="profile-center-box position-relative"> <--현재 레이아웃에 문제 있음
                <button class="close-x-btn" id="close-x" title="닫기">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <a href="#">로그아웃</a>
            </div> */}


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