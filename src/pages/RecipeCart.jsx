
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import SelectList from '../components/common_components/ListModule';
import Button from '../components/common_components/ButtonModules';





function IngredientInventory() {

    const navigate = useNavigate(); 

    const goHome = () => { navigate('/main/recipe'); };
    return (
        <div className='d-flex flex-column'>
            <SelectList type="cart" />
            <div className='w-75 mx-auto pt-3'>
            <div className="d-flex justify-content-center gap-2" style={{ width: '100%' }}>
                <button className="btn btn-secondary w-50" type="button">초기화</button>
                <button onClick={goHome} className="btn btn-primary w-50" type="button">레시피 탐색</button>
            </div>
            </div>
        </div>
    );
}







export default function RecipeCart() {


    return (
        <div className='container'>
            <IngredientInventory />
        </div>
    );

}
