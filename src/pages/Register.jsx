
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { React, useState } from 'react';

import "./Register.css";





const goHome = ()=>{navigate('/');};

export default function Register() {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

    const { register } = useAuthStore();

    //로그인 상태
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [againPassword, setAgainPassword] = useState('');
    


    const handleSubmit = async (event) => {

        event.preventDefault();

        if (password !== againPassword) {
            alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            return;
        }

        try {
            await register(loginId, password);

            alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
            navigate('/');

        } catch(error) {
           
       
            if (error.response) {
                // ✨ 2. 서버가 보낸 에러 메시지(본문)를 콘솔에 출력합니다.
                // "아이디가 중복됩니다." 와 같은 메시지가 여기에 들어있습니다.
                alert("회원가입에 실패했습니다: " + error.response.data.message);
                console.error("서버 응답 에러:", error.response.data.message);
            } else {
                // 서버 응답이 없는 다른 종류의 에러 처리
                alert("회원가입에 실패했습니다. 다른 아이디를 사용하거나 다시 시도해주세요: " + error.message);
                console.error("API 요청 실패:", error.message);
            }
       
        }

    };



    


    return (
        <div className="register-tab">
            <h1>ReciPick</h1>
            <form onSubmit={handleSubmit}>
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
