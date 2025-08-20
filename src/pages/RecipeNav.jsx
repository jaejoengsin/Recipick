
import React, { useState } from 'react';

import SelectList  from '../components/common_components/ListModule';
import SearchBar from '../components/SearchBar';



function SearchEreaInNav() {
    return (
        <div className='serach-in-nav ' >
            <SearchBar />
            <SelectList type="searchInRecipeNav" />

        </div>
    );
}



function FridgeEreaInNav(){
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
        <div className='container'> {/* container를 최상위로 */}
            <div className='row px-3'>
                <div className='col-6'>
                    <div className='serach-in-nav'>
                        <SearchEreaInNav></SearchEreaInNav>
                    </div>
                </div>

                <div className='col-6'>
                    <div className='fridge-in-nav'>
                        <FridgeEreaInNav></FridgeEreaInNav>
                    </div>
                </div>
            </div>
        </div>
    );
}