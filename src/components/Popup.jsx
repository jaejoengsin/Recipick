import "./Popup.css";







export function ShowRecipeDetailPopUp({ isShowRecipeDetailPopUp, showRecipeDetailPopUpFunction }) {
    const handleCloseRecipeDetail = () => {
        showRecipeDetailPopUpFunction(false);
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
                            <button onClick={handleCloseRecipeDetail} id="bookmark-btn" className="bookmark-btn p-4 mx-auto d-block">
                                <i className="fa-regular fa-bookmark"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
// 스크랩 반응 코드
// const btn = document.getElementById('bookmark-btn');
// const icon = btn.querySelector('.fa-bookmark');
// btn.addEventListener('click', function (event) {
//     event.preventDefault();
//     btn.classList.toggle('active');
//     if (btn.classList.contains('active')) {
//         icon.classList.remove('fa-regular');
//         icon.classList.add('fa-solid');
//     } else {
//         icon.classList.remove('fa-solid');
//         icon.classList.add('fa-regular');
//     }
// });






export function AddIngredientPopUp({ isShowAddIngredientPopUp, showAddIngredientPopUpFunction }) {

    const handleClosePopUp = () => {
        showAddIngredientPopUpFunction(false);
    };


    return (
        <>
            {isShowAddIngredientPopUp &&
                <div className="custom-container">
                    <div className="list-group">
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


