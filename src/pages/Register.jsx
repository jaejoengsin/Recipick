
import { Link, useNavigate } from 'react-router-dom';



import "./Register.css";

export default function Register() {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    const goHome = ()=>{navigate('/');};
    return (
        <div className="register-tab">
            <h1>ReciPick</h1>
            <form onSubmit={goHome}>
                <label htmlFor="user-name">ID를 생성하세요:</label>
                <input type="text" id="user-name" name="user-name" required />
                <br />
                <label htmlFor="password">비밀번호를 입력하세요:</label>
                <input type="password" id="password" name="password" required />
                <label htmlFor="password-confirm">비밀번호를 다시 입력하세요:</label>
                <input type="password" id="password-confirm" name="password-confirm" required />
                <button type="submit">가입완료</button>
            </form>
        </div>
    );
}
