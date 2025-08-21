import {useState } from "react";


import "../../styles/listmodules.css";

import RefrigeratorIcon from '../../assets/icons/RefrigeratorIcon.png';
import SearchIcon from '../../assets/icons/searchIcon.png';
import AddCartIcon from "../../assets/icons/addCartIcon.png";
import HistoryIcon from "../../assets/icons/HistoryIcon.png";


import Button from "./ButtonModules";
import { useParams } from "react-router-dom";
import { AddIngredientPopUp, ShowRecipeDetailPopUp, SyncFridgePopUp } from "../Popup";



////zustand
import useFridgeStore from '../../store/useFridgeStore';
import useAuthStore from '../../store/useAuthStore'; 


import { fetchAutocompleteResults } from '../../api/searchAPI'






export function MyFridgeList({ editOrShow }) {
    // 1. 필요한 스토어에서 상태와 액션을 모두 가져옵니다.
    const { user } = useAuthStore();
    const { ingredients, updateSingleIngredient, deleteIngredient, isLoading } = useFridgeStore();

    // 데이터 로딩 중일 때 UI
    if (isLoading) {
        return <div>냉장고 재료를 불러오는 중...</div>;
    }

    // 재료가 없을 때 UI
    if (!ingredients || ingredients.length === 0) {
        return <div className="text-center p-5">냉장고에 재료가 없습니다.</div>;
    }

    return (
        <div className="fridge-list">
            <div className="list-group pt-2 w-75 mx-auto" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {ingredients.map(ingredient => (
                    editOrShow ? (
                        // --- 편집 모드 ---
                        <div key={ingredient.fridgeIngredientId} className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{ingredient.ingredientName}</h5>
                                    <small className="text-muted">{ingredient.storagePeriod} days ago</small>
                                    <br />
                                    {/* 이 input은 '검색창'이 아니라 '메모 수정'을 위한 입력창입니다. */}
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="메모"
                                        defaultValue={ingredient.memo}
                                        onBlur={(e) => user?.id && updateSingleIngredient(
                                            { fridgeIngredientId: ingredient.fridgeIngredientId, memo: e.target.value },
                                            user.id
                                        )}
                                    />
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="input-group" style={{ width: '110px' }}>
                                        <button onClick={() => user?.id && updateSingleIngredient(
                                            { fridgeIngredientId: ingredient.fridgeIngredientId, count: ingredient.count - 1 },
                                            user.id
                                        )} className="btn btn-outline-secondary" type="button">−</button>

                                        <input type="text" className="form-control text-center" value={ingredient.count} readOnly />

                                        <button onClick={() => user?.id && updateSingleIngredient(
                                            { fridgeIngredientId: ingredient.fridgeIngredientId, count: ingredient.count + 1 },
                                            user.id
                                        )} className="btn btn-outline-secondary" type="button">+</button>
                                    </div>
                                    <button onClick={() => user?.id && deleteIngredient(ingredient.fridgeIngredientId, user.id)} className="btn btn-outline-danger" type="button">삭제</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // --- 보기 모드 ---
                        <div key={ingredient.fridgeIngredientId} className="list-group-item">
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{ingredient.ingredientName}</h5>
                                    <small className="text-muted">{ingredient.storagePeriod} days ago</small>
                                    <div className="mt-2 text-body-secondary">
                                        {ingredient.memo}
                                    </div>
                                </div>
                                <div>
                                    <span className="badge bg-transparent fs-3 text-dark">{ingredient.count}</span>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
// <div className="fridge-list-item">
// </div>


//Edit 창 활성화 시에
// <div class="list-group">
// <a href="#" class="list-group-item list-group-item-action">
//     <div class="d-flex w-100 justify-content-between align-items-center">
//         <div>
//             <h5 class="mb-1">재료명 </h5>
//             <small class="text-muted">3 days ago</small>
//             <br>
//                 <input type="text" class="form-control" placeholder="memo장">
//                 </div>
//                 <div class="d-flex align-items-center gap-2">
//                     <div class="input-group" style="width: 110px;">
//                         <button class="btn btn-outline-secondary btn-decrease" type="button">−</button>
//                         <input type="text" class="form-control text-center qty-value" value="1" readonly>
//                             <button class="btn btn-outline-secondary btn-increase" type="button">+</button>
//                     </div>
//                     <button class="btn btn-outline-danger btn-delete" type="button">삭제</button>
//                 </div>
//         </div>
// </a>
// </div>










//냉장고 메뉴 속 식재료 추가 섬색창(버튼 클릭)

//냉장고 메뉴 속 식재료 추가 섬색창(버튼 클릭)


// 부모로부터 results 배열을 props로 받음
export function SearchListInFridge({ results }) {
    // [수정] boolean 상태 대신 선택된 재료 객체를 상태로 관리 (null이면 팝업 닫힘)
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    // [수정] 클릭된 아이템을 상태에 저장하여 팝업을 띄우는 핸들러
    const handleShowPopUp = (item) => {
        setSelectedIngredient(item);
    };

    // [수정] 팝업을 닫는 핸들러 (상태를 null로 변경)
    const handleClosePopUp = () => {
        setSelectedIngredient(null);
    };

    return (
        <>
            <div className="search-list-in-fridge mt-3">
                <div className="list-group w-75 mx-auto" style={{ minWidth: "300px", maxHeight: "400px", overflowY: 'auto' }}>
                    {results && results.length > 0 ? (
                        results.map((item) => (
                            <button
                                key={item.id}
                                // [수정] 클릭 시 해당 item 정보를 핸들러에 전달
                                onClick={() => handleShowPopUp(item)}
                                type="button"
                                className="list-group-item list-group-item-action rounded-3 shadow-sm border-0 my-1"
                            >
                                {item.name}
                            </button>
                        ))
                    ) : (
                        <p className="text-center text-muted">검색 결과가 없습니다.</p>
                    )}
                </div>
            </div>

            {/* [수정] selectedIngredient가 있을 때만 팝업 렌더링 */}
            {selectedIngredient && (
                <AddIngredientPopUp
                    ingredient={selectedIngredient} // 선택된 재료 정보 전달
                    onClose={handleClosePopUp}      // 팝업을 닫는 함수 전달
                />
            )}
        </>
    );
}

//     <div class="search-result-in-fridge-item">
//     예시 1
//     <span class="checkbox-area"><input type="checkbox" /></span>
// </div>
//     <div class="search-result-in-fridge-item">
//     예시 2
//     <span class="checkbox-area"><input type="checkbox" /></span>
// </div>



//검색창에서 냉장고(체크)
export function SearchListInRecipeNav() {
    return (
        <div className="search-list-in-nav ">
            <ul className="list-group ">
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
              fsddddddddddddddddd
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감귤
            </li>
            </ul>

        </div>
    );
}

// <div class="search-list-in-nav-item">
//     예시 1
//     <span class="checkbox-area"><input type="checkbox" /></span>
// </div>
// <div class="search-list-in-nav-item">
//     예시 2
//     <span class="checkbox-area"><input type="checkbox" /></span>
// </div>







export function MyFridgeListInNav() {

    return (
        <ul className="list-group">
            <li className="list-group-item d-flex">
                감
                <input className="form-check-input ms-auto" type="checkbox" value="" aria-label="..." />
            </li>
        </ul>
    );

}
// <div className="fridge-list-in-nav-item">

// </div>



export function RecipeList() {

    const [isShowRecipeDetailPopUp, showRecipeDetailPopUpFunction] = useState(false);
    const [isBookMark, isBookMarkFunction] = useState(false);
    const handleShowPopUp = () => {
        if (!isShowRecipeDetailPopUp) {
            showRecipeDetailPopUpFunction(nowstate => !nowstate);
        }
    };

    const handleBookMark =  () => {
        isBookMarkFunction(nowstate => !nowstate);
    }

    return (
        <>
            <div className="custom-list">
                <div className="card-container">
                    <button onClick={handleShowPopUp} className="card-button-wrapper">
                        <div className="card">
                            <ul className="list-group">
                            <li className=" list-group-item list-group-item-action">
                                    <img src="https://via.placeholder.com/286x160" className="card-img-top" alt="샘플이미지" />
                                    <div className="card-body">
                                        <h5 className="card-title">메뉴명 1</h5>
                                        <p className="card-text">재료 설명 들어가는 부분.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    
                    </button>
                    <button onClick={handleBookMark} className={`bookmark-btn p-4 mx-auto d-block ${isBookMark ? 'active' : ''}`}>
                        <i className={`fa-bookmark ${isBookMark ? 'fa-solid' : 'fa-regular'}`}></i>
                    </button>
                    
                </div>
            </div>
            {isShowRecipeDetailPopUp &&
                <ShowRecipeDetailPopUp isBookMark={isBookMark} isShowRecipeDetailPopUp={isShowRecipeDetailPopUp}
                    showRecipeDetailPopUpFunction={showRecipeDetailPopUpFunction} />
            }
        </>
    );

}
// <div className="recipe-list-item">

// </div>




//아이콘, 삭제 버튼, 체크박스 
export function CartList() {
    return (
        <div className="cart-list">
            <ul className="list-group">
                {/* 장바구니 속 내 냉장고에서 꺼낸 재료들 */}
                <li className="list-group-item d-flex align-items-center">
                    감
                    <span className="ms-auto d-flex align-items-center">
                        <img className="nav-icon align-self-center" src={RefrigeratorIcon} alt="Refrigerator Icon" />
                        <input className="form-check-input ms-auto" type="checkbox" value="" aria-label="..." />
                    </span>
                </li>
                {/* 장바구니 속 서치해서 추가한 재료들 */}
                <li className="list-group-item d-flex align-items-center">
                    감
                    <span className="ms-auto d-flex align-items-center">
                        <img className="nav-icon align-self-center" src={SearchIcon} alt="Search Icon" />
                        <input className="form-check-input ms-auto" type="checkbox" value="" aria-label="..." />
                    </span>
                </li>

            </ul>
        </div>
    );
}

// // 북마크 토글 기능
// document.querySelectorAll('.bookmark-btn').forEach((btn) => {
//   const icon = btn.querySelector('.fa-bookmark');
//   btn.addEventListener('click', (event) => {
//     event.preventDefault();
// btn.classList.toggle('active');
// if (btn.classList.contains('active')) {
//     icon.classList.remove('fa-regular');
// icon.classList.add('fa-solid');
//     } else {
//     icon.classList.remove('fa-solid');
// icon.classList.add('fa-regular');
//     }
//   });
// });













// <div class="cart-list-item">
// 예시 1
// <span class="checkbox-area">
//     <button class="delete-btn" aria-label="삭제">
//         <i class="fa-solid fa-circle-minus"></i>
//     </button>
//     <input type="checkbox" />
// </span>
// </div>
// <div class="cart-list-item">
// 예시 2
// <span class="checkbox-area">
//     <button class="delete-btn" aria-label="삭제">
//         <i class="fa-solid fa-circle-minus"></i>
//     </button>
//     <input type="checkbox"/>
// </span>
// </div>

//param: isShowFridgeSyncPopUp 설명: 리스트 내부 요소에서 동기화 버튼을 클릭하면
//                                  팝업이 뜨도록 설정하기 위해 isShowFridgeSyncPopUp 전달
//

export function HistoryList() {

    const [isShowSyncFridgePopUp, showSyncFridgePopUpFunction] = useState(false);

    const handleShowSyncPopUp = () => {
        console.log("sdfs");
        if (!isShowSyncFridgePopUp) {
            showSyncFridgePopUpFunction(nowstate => !nowstate);
        }
    };
    return (
        <>
        <div className="custom-list">
            <div className="card-container">
                <div className="card">
                    <img src="https://via.placeholder.com/286x160" className="card-img-top" alt="샘플이미지" />
                    <div className="card-body">
                        <h5 className="card-title">메뉴명 1</h5>
                        <p className="card-text">재료 설명 들어가는 부분.</p>
                    </div>
                </div>
                <button className="bookmark-btn">
                    <i className="fa-regular fa-bookmark"></i>
                </button>
                    <button onClick={handleShowSyncPopUp} id="refresh-button" className="circle-btn">
                    <i className="fa-solid fa-arrows-rotate"></i>
                </button>
            </div>
        </div>
            
        {isShowSyncFridgePopUp && <SyncFridgePopUp 
                isShowSyncFridgePopUp={isShowSyncFridgePopUp} showSyncFridgePopUpFunction={showSyncFridgePopUpFunction}/>}
        </>
    );
}




export default function SelectList({ type, results, editOrShow, isShowSyncFridgePopUp }) {

    // 순서 잘 보기
    const renderList = (type, results, editOrShow, isShowSyncFridgePopUp) => {
        switch (type) {
            case 'myFridge':
                return <MyFridgeList
                    editOrShow={editOrShow}
                />;
            case 'searchInFridge':
                return <SearchListInFridge results={results}/>;
            case 'searchInRecipeNav':
                return <SearchListInRecipeNav />;
            case 'myFridgeInNav':
                return  <MyFridgeListInNav />;
            case 'recipe':
                return <RecipeList />;
            case 'cart':
                return <CartList />;
            case 'history':
                return <HistoryList isShowSyncFridgePopUp={isShowSyncFridgePopUp} />;
            default:
                return <div>리스트 타입을 지정해주세요.</div>;
        }
    };

    // 순서 잘 보기
    return <>{renderList(type, results, editOrShow, isShowSyncFridgePopUp)}</>;

}



