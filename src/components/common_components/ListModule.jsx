


import "../../styles/listmodules.css";
import Button from "./ButtonModules";

export function MyFridgeList() {
    
    return (
        <div className="fridge-list">
            <div className="common-list-frame">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
            </div>
        </div>
    );
}
// <div className="fridge-list-item">
// </div>



//냉장고 메뉴 속 식재료 추가 섬색창(버튼 클릭)
export function SearchListInFridge() {
    return (
      <div className="search-list-in-fridge">
        <div class="common-list-frame">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
        </div>
      </div>
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
        <div className="search-list-in-nav">
            <div class="common-list-frame">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
            </div>
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
        <div className="fridge-list-in-nav">
            <div className="common-list-frame">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
            </div>
        </div>

    );

}
// <div className="fridge-list-in-nav-item">

// </div>



export function RecipeList() {

    return (
        <div className="recipe-list">
            <div className="common-list-frame">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
            </div>
        </div>

    );

}
// <div className="recipe-list-item">

// </div>




//아이콘, 삭제 버튼, 체크박스 
export  function CartList() {
    return (
    <div className="cart-list">
            <div class="comon-list-frame">

                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
        </div>
    </div>
    );
}
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
export function HistoryList() {
    return (
        <div className="history-list">
            <div class="comon-list-frame">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
            </div>
        </div>
    );
}



 
export default function SelectList({ type }) {

    const renderList = () => {
        switch (type) {
            case 'myFridge':
                return <MyFridgeList />;
            case 'searchInFridge':
                return <SearchListInFridge />;
            case 'searchInRecipeNav':
                return <SearchListInRecipeNav />;
            case 'myFridgeInNav':
                return <MyFridgeListInNav />;
            case 'recipe':
                return <RecipeList />;
            case 'cart':
                return <CartList />;
            case 'history':
                return <CartList />;
            default:
                return <div>리스트 타입을 지정해주세요.</div>;
        }
    };
    return <>{renderList()}</>;
}




