import "./Popup.css";
import React, { useState } from 'react'; 
import useFridgeStore from "../store/useFridgeStore";
import useAuthStore from "../store/authStore";



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




export function AddIngredientPopUp({ ingredient, onClose }) {
    // [추가] 팝업 내부에서 수량과 메모를 관리하는 상태
    const [quantity, setQuantity] = useState(1);
    const [memo, setMemo] = useState('');

    // [추가] Zustand store에서 addIngredient 액션을 가져옴
    const { addIngredient } = useFridgeStore();
    const { user } = useAuthStore(); // 👈 2. 스토어에서 user 정보 가져오기

    // [추가] 수량 조절 핸들러
    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount)); // 최소 수량은 1
    };

    // [추가] 저장(추가) 버튼 핸들러
    const handleSave = async () => {
        // TODO: memberId는 실제 로그인 정보에서 가져와야 합니다. 여기서는 예시로 1을 사용합니다.
        
        // 👈 3. user 객체에서 id를 가져와 memberId로 사용
        const memberId = user?.id; 

        if (!memberId) {
            alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
            console.error("memberId를 찾을 수 없습니다.");
            return;
        }
        
        const ingredientData = {
            ingredientId: ingredient.id, // 부모에게 받은 재료 ID
            count: quantity,
            memo: memo,
        };
        
        console.log("최종 전송 데이터:", { ingredientData, memberId });
        // Zustand store의 addIngredient 액션 호출
        await addIngredient(ingredientData, memberId);

        // 작업 완료 후 팝업 닫기
        onClose();
    };

    return (
        <div className="custom-container">
            <div className="list-group w-75 mx-auto">
                <div className="list-group-item list-group-item-action">
                    <div className="d-flex align-items-center w-100 mb-3">
                        {/* [수정] 재료명을 props에서 받아 표시 */}
                        <h5 className="mb-0 me-3">{ingredient.name}</h5>
                        <div className="input-group" style={{ width: '150px' }}>
                            <button className="btn btn-outline-secondary" type="button" onClick={() => handleQuantityChange(-1)}>−</button>
                            <input type="text" className="form-control text-center" value={quantity} readOnly />
                            <button className="btn btn-outline-secondary" type="button" onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                    </div>
                    {/* [수정] 메모 입력창에 value와 onChange 연결 */}
                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="메모를 입력하세요 (선택)"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                    />
                    <div className="d-flex justify-content-center gap-3">
                        {/* [수정] 취소 버튼은 onClose 함수 호출 */}
                        <button onClick={onClose} className="btn btn-outline-danger w-50" type="button">취소</button>
                        {/* [수정] 저장 버튼은 handleSave 함수 호출 */}
                        <button onClick={handleSave} className="btn btn-outline-dark w-50" type="button">저장</button>
                    </div>
                </div>
            </div>
        </div>
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


