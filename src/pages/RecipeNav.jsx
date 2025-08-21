
import React, { useState } from 'react';

import SelectList from '../components/common_components/ListModule';
import SearchBar from '../components/SearchBar';
import "../styles/font.css"




function SearchEreaInNav() {
    return (
        // 컴포넌트의 최상위 div가 부모(래퍼)의 높이를 100% 채우도록 h-100 추가
        <div className="d-flex flex-column h-100">

            {/* SearchBar 영역: 고정된 높이 */}
            <div className="flex-grow-1 pt-1">
                <div className='container'>
                <SearchBar />
                </div>
            </div>

            {/* SelectList 영역: 남은 공간을 모두 채우고, 내용이 넘치면 여기서 스크롤 */}
            <div className="flex-grow-1 ">
                <div className='container' style={{ maxHeight: '500px', overflowY: 'auto' } }>
                <SelectList type="searchInRecipeNav" />
                </div>
            </div>

        </div>
    );
}



function FridgeEreaInNav() {
    return (
        <div className='fridge-in-nav ' >
            {/* 이미지 영역이랑 내 냉장고 리스트 영역이랑 나눌 수도 있음 */}
            <div className='container'>
                {/* 레시피 이미지 영역 */}
            </div>
            <SelectList type="myFridgeInNav" />
        </div>
    );
}



export default function RecipeNav() {
    return (
        <div className='container h-100'>
            {/* row가 부모(container)의 높이를 100% 차지하도록 h-100을 유지합니다. */}
            <div className='row px-3'>

                {/* 왼쪽 컬럼 */}

                <div className='col-6'>
                    {/* 이 div가 왼쪽 컬럼의 스크롤을 담당합니다. */}
                    <div className='container' style ={{ maxHeight: '600px' }}>
                        <SearchEreaInNav />
                    </div>

                </div>



                {/* 오른쪽 컬럼 */}
                <div className='col-6'>
                    {/* 이 div가 오른쪽 컬럼의 스크롤을 담당합니다. */}
                    <div className='container'><img /><h1 className="pb-1" style={{ fontFamily: "'RecipeFont', sans-serif", fontWeight: 'bold' }} >myfridge</h1></div>
                    <div className='container' style={{ maxHeight: '600px', overflowY: 'auto' }}>

                        <FridgeEreaInNav />
                    </div>
                </div>


            </div>
        </div >


    );
} 
