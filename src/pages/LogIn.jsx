import { React, useState, useEffect } from 'react'; // useEffect를 import 합니다.
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import "./LogIn.css";

export default function LogIn() {
    const navigate = useNavigate();

    // ✨ zustand 스토어에서 login 함수와 함께 로그인 상태(isLoggedIn)도 가져옵니다.
    // (스토어에 isLoggedIn 같은 상태가 있다고 가정합니다.)
    const { login, isLoggedIn } = useAuthStore();

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ✨ 요구사항 반영: 로그인 상태 확인 및 리디렉션 로직
    useEffect(() => {
        // 만약 이미 로그인된 상태라면,
        if (isLoggedIn) {
            // '내 냉장고' 페이지로 이동시킵니다.
            // { replace: true } 옵션은 브라우저 방문 기록에 현재 페이지(로그인 페이지)를 남기지 않습니다.
            // 따라서 사용자가 리디렉션된 후 뒤로 가기를 눌러도 다시 로그인 페이지로 돌아오지 않습니다.
            alert('이미 로그인되어 있습니다. 메인 페이지로 이동합니다.');
            navigate('/main/myfridge', { replace: true });
        }
    }, [isLoggedIn, navigate]); // isLoggedIn이나 navigate가 변경될 때마다 이 효과를 재실행합니다.


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);

        try {
            await login(loginId, password);
            alert('로그인 성공!');
            navigate('/main/myfridge');
        } catch (error) {
            alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };


    // 이미 로그인된 사용자는 리디렉션 로직에 의해 이 JSX를 거의 보지 못하고 바로 다른 페이지로 이동하게 됩니다.
    return (
        <div className="component">
            <h1>ReciPick</h1>
            <div className="logintab">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">ID:</label>
                    <input type="text" id="username" name="username"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        required />
                    <br />
                    <label htmlFor="password">PW:</label>
                    <input type="password" id="password" name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <br />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? '로그인 중...' : '로그인'}
                    </button>
                </form>
                <Link to="/register">회원가입</Link>
            </div>
        </div>
    );
}