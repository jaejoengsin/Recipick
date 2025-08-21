import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// 페이지 컴포넌트들
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import MyFridge from './pages/MyFridge';
import RecipeNav from './pages/RecipeNav';
import RecipeCart from './pages/RecipeCart';
import History from './pages/History';
import Recipe from './pages/Recipe';
import MainLayout from './pages/MainLayout';


// 1. 인증 상태를 확인하기 위한 useAuthStore를 import 합니다.
import useAuthStore from './store/useAuthStore';

import "./App.css";

// 2. ProtectedRoute 컴포넌트를 App.jsx 파일 내에 직접 정의합니다.
const ProtectedRoute = () => {
  // Zustand 스토어에서 로그인 상태를 가져옵니다.
  const { isLoggedIn } = useAuthStore();

  // 로그인 상태이면 자식 경로(Outlet)를 보여주고, 아니면 로그인 페이지로 이동시킵니다.
  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};





export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* --- 누구나 접근 가능한 경로 --- */}
          <Route index element={<LogIn />} />
          <Route path="register" element={<Register />} />

          {/* --- 로그인이 반드시 필요한 경로 그룹 --- */}
          {/* 3. 위에서 정의한 ProtectedRoute를 사용합니다. */}
          <Route element={<ProtectedRoute />}>
            <Route path="main" element={<MainLayout />}>
              <Route path="myfridge" element={<MyFridge />} />
              <Route path="recipenav" element={<RecipeNav />} />
              <Route path="recipecart" element={<RecipeCart />} />
              <Route path="history" element={<History />} />
              <Route path="recipe" element={<Recipe />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}