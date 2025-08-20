import { useState } from "react";

import SelectList from "../components/common_components/ListModule";
import Button from "../components/common_components/ButtonModules";

import "./Recipe.css";




export default function Recipe() {
    return (
        <div className="container py-3">
            {/* 1. 세로 정렬을 위한 Flexbox 컨테이너 + 높이 지정 */}
            <div className="d-flex flex-column" style={{ overflowY: 'auto' }}>

                {/* 2. 컴포넌트 1: 레시피 리스트 (남는 공간을 모두 차지하고, 내용이 넘치면 스크롤됨) */}
                <div className="container">
                    <SelectList type="recipe" />
                </div>

                {/* 3. 컴포넌트 2: 더보기 버튼 */}
                <div className="text-center mt-3">
                    {/* 여기에 더보기 버튼 컴포넌트를 넣으세요. */}
                    <button className="btn btn-primary">더보기</button>
                </div>

            </div>
        </div>
    );
}


