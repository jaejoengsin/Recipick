
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import "./LogIn.css";





export default function LogIn() {

    
    // 페이지 이동을 위한 navigate 훅
    const navigate = useNavigate(); 
    // 내 냉장고 메뉴로 이동
    const goHome = ()=>{navigate('/main/myfridge');};
    

    return (
         <div className="component">
            <h1>ReciPick</h1>
            <div className="logintab">
                <form onSubmit={goHome}>
                    <label htmlFor="username">ID:</label>
                    <input type="text" id="username" name="username" required />
                    <br />
                    <label htmlFor="password">PW:</label>
                    <input type="password" id="password" name="password" required />
                    <br />
                    <button type="submit">로그인</button>
                </form>
                <Link to="/register">회원가입</Link>
            </div>
        </div> 
    );
}


