import "./Popup.css";
import React, { useState } from 'react'; 





export function ShowRecipeDetailPopUp({ isBookMarkFunction, isShowRecipeDetailPopUp, showRecipeDetailPopUpFunction }) {
    const handleCloseRecipeDetail = () => {
        showRecipeDetailPopUpFunction(false);
    };

    // 2. 북마크 상태를 저장할 state 변수를 생성합니다. (기본값: false)
    const [isBookmarDetail, setDetailBookmarked] = useState(false);

    // 3. 북마크 버튼 클릭 시 실행될 함수
    const handleBookmarkClick = () => {
        // isBookmarked 상태를 현재와 반대되는 값(true <-> false)으로 변경합니다.
        setDetailBookmarked(prev => !prev);
        isBookMarkFunction(prev => !prev);
    };

    return (
        <div className="card mb-3 ">
            <div className="custom-container">
                <img src="https://via.placeholder.com/600x200" className="card-img-top" alt="레시피 이미지" />
                <div className="card-body">
                    <h5 className="card-title">메뉴명</h5>
                    <ul className="list-group list-group-flush text-center">
                        <li className="list-group-item"></li>
                        <li className="list-group-item">재료</li>
                        <li className="list-group-item">레시피(조리법)</li>
                        <li className="list-group-item text-center">
                            {/* 4. 버튼의 className과 onClick을 수정합니다.
                                - isBookmarked가 true이면 'active' 클래스를 추가합니다.
                                - onClick 이벤트에 handleBookmarkClick 함수를 연결합니다.
                            */}
                            <button
                                onClick={handleBookmarkClick}
                                id="bookmark-btn"
                                className={`bookmark-btn p-4 mx-auto d-block ${isBookmarDetail ? 'active' : ''}`}
                            >
                                {/* 5. 아이콘의 className도 isBookmarked 상태에 따라 동적으로 변경합니다.
                                    - isBookmarked가 true이면 'fa-solid', false이면 'fa-regular'를 적용합니다.
                                */}
                                <i className={`fa-bookmark ${isBookmarDetail ? 'fa-solid' : 'fa-regular'}`}></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}





export function AddIngredientPopUp({ isShowAddIngredientPopUp, showAddIngredientPopUpFunction }) {

    const handleClosePopUp = () => {
        showAddIngredientPopUpFunction(false);
    };


    return (
        <>
            {isShowAddIngredientPopUp &&
            <div className="custom-container">
                    {/* - 이 div에 w-75와 mx-auto 클래스를 추가했습니다.
                   - w-75: 너비를 부모 요소의 75%로 설정합니다.
                   - mx-auto: 좌우 마진을 자동으로 설정하여 요소를 수평 중앙에 배치합니다.
                 */}
                    <div className="list-group w-75 mx-auto">
                        <a href="#" className="list-group-item list-group-item-action">
                            <div className="d-flex align-items-center w-100 mb-3">
                                <h5 className="mb-0 me-3">재료명</h5>
                                <small className="text-muted me-3">1 days ago</small>
                                <div className="input-group" style={{ width: '110px' }}>
                                    <button className="btn btn-outline-secondary btn-decrease" type="button">−</button>
                                    <input type="text" className="form-control text-center qty-value" defaultValue="1" readOnly />
                                                    <button className="btn btn-outline-secondary btn-increase" type="button">+</button>
                                </div>
                            </div>
                            <input type="text" className="form-control mb-4" placeholder="memo장" />
                            <div className="d-flex justify-content-center gap-3">
                                <button onClick={handleClosePopUp} className="btn btn-outline-danger btn-delete w-50" type="button">취소</button>
                                <button onClick={handleClosePopUp} className="btn btn-outline-dark btn-save w-50" type="button">저장</button>
                            </div>
                        </a>
                    </div>
                </div>
         
            }
        </>
    );
}


export function SyncFridgePopUp({ isShowSyncFridgePopUp, showSyncFridgePopUpFunction }) {
    
    const handleClosePopUp = () => {
        showSyncFridgePopUpFunction(false);
    };
    
    
    return (
        <>
        { isShowSyncFridgePopUp &&
                <div className="custom-container">
            <div className="list-group mb-4">
                <a href="#" className="list-group-item custom-list-item">
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1">재료명</h5>
                            <small className="text-muted">내 냉장고에서 적어놨던 memo내용</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <div className="input-group" style={{ width: '110px' }}>
                                <button className="btn btn-outline-secondary btn-decrease" type="button">−</button>
                                <input type="text" className="form-control text-center qty-value" defaultValue="1" readOnly />
                                <button className="btn btn-outline-secondary btn-increase" type="button">+</button>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div className="d-flex bottom-btns-row mt-1">
                <button onClick={handleClosePopUp} type="button" className="btn btn-lightgray rounded-lg-btn">취소</button>
                        <button onClick={handleClosePopUp} type="button" className="btn btn-primary rounded-lg-btn">재료차감</button>
            </div>
        </div>
        }
    </>
    );
}


