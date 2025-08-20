
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { React, useState } from 'react';

import "./Register.css";






export default function Register() {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    const goHome = ()=>{navigate('/');};

    const { login } = useAuthStore();

    //로그인 상태
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [againPassword, setAgainPassword] = useState('');
    


    const handlerRegister = () => {


    };

    return (
        <div className="register-tab">
            <h1>ReciPick</h1>
            <form onSubmit={goHome}>
                <label htmlFor="user-name">ID를 생성하세요:</label>
                <input type="text" id="user-name" name="user-name" 
                
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                
                required />
                <br />
                <label htmlFor="password">비밀번호를 입력하세요:</label>
                <input type="password" id="password" name="password" 
                
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
                required />
                <label htmlFor="password-confirm">비밀번호를 다시 입력하세요:</label>
                <input type="password" id="password-confirm" name="password-confirm" 
                
                    value={againPassword}
                    onChange={(e) => setAgainPassword(e.target.value)}
                
                required />
                <button type="submit">가입완료</button>
            </form>
        </div>
    );
}
