import "./SearchBar.css";
import React, { useState } from 'react';

// 부모로부터 onSearch 함수를 props로 받음
export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // form의 기본 새로고침 동작 방지
        onSearch(query); // 부모로부터 받은 onSearch 함수에 현재 검색어를 담아 호출
    };

    return (
        <div className="simple-search-box">
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="검색어를 입력하세요"
                    aria-label="검색"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                    검색
                </button>
            </form>
        </div>
    );
}
