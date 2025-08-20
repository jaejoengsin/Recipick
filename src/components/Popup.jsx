import "./Popup.css";







export function ShowRecipeDetailPopUp() {
    return (
        <></>
    );
}


export function AddIngredientPopUp({ isShowAddIngredientPopUp, showAddIngredientPopUpFunction }) {

    const handleClosePopUp = () => {
        showAddIngredientPopUpFunction(false);
    };


    return (
        <>
            { isShowAddIngredientPopUp  &&
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
                                <button onClick={handleClosePopUp}  className="btn btn-outline-danger btn-delete w-50" type="button">취소</button>
                                <button onClick={handleClosePopUp}  className="btn btn-outline-dark btn-save w-50" type="button">저장</button>
                            </div>
                        </a>
                    </div>
                </div>
            }
        </>
    );
}


export function SyncFridgePopUp() {
    return (
        <></>
    );
}


