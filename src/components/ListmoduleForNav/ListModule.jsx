import React from 'react';
import useFridgeStore from '../../store/useFridgeStore';
import useBasketStore from '../../store/useBasketStore';
import useAuthStore from '../../store/useAuthStore';

// 각 재료 아이템을 렌더링하는 공통 컴포넌트
function IngredientListItem({ item }) {
    console.log("ListItem이 받은 item 객체:", item);

    const { user } = useAuthStore();
    const { basketIngredients, addIngredientToBasket, removeIngredientFromBasket } = useBasketStore();

    // 현재 아이템이 장바구니에 있는지 확인 (basketIngredients 배열에서 ingredientId로 탐색)
    const inBasketItem = basketIngredients.find(basketItem => basketItem.ingredientId === item.id);
    const isChecked = !!inBasketItem;

    const handleCheckboxChange = async () => {
        if (!user?.id) {
            alert("로그인이 필요합니다.");
            return;
        }

        console.log(`장바구니 추가 요청: memberId=${user.id}, ingredientId=${item.id}`);
        await addIngredientToBasket(user.id, item.id);

        if (isChecked) {
            // 이미 담겨있다면 basketIngredientId를 이용해 삭제 API 호출
            await removeIngredientFromBasket(user.id, inBasketItem.basketIngredientId);
        } else {
            // 없다면 ingredientId를 이용해 추가 API 호출
            await addIngredientToBasket(user.id, item.id);
        }
    };

    
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {item.name}
            <input
                className="form-check-input"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
        </li>
    );
}

// 타입에 따라 다른 리스트를 보여주는 메인 컴포넌트

export default function SelectList({ type, searchResults }) {
    const { ingredients: fridgeIngredients, isLoading: isFridgeLoading } = useFridgeStore();

    // ... (switch 문 이전 코드는 동일) ...
    let content;

    switch (type) {
        case "searchInRecipeNav":
            // 검색 목록은 이미 {id, name} 형식이므로 그대로 사용합니다.
            content = (
                <ul className="list-group">
                    {searchResults.length > 0 ? (
                        searchResults.map(item => <IngredientListItem key={`search-${item.id}`} item={item} />)
                    ) : (
                        <li className="list-group-item">검색 결과가 없습니다.</li>
                    )}
                </ul>
            );
            break;

        case "myFridgeInNav":
            if (isFridgeLoading) {
                content = <p>로딩 중...</p>;
            } else {
                // 👇 디버깅을 위해 추가: 냉장고 데이터의 원본 구조를 확인합니다.
                console.log('내 냉장고 원본 데이터 (fridgeIngredients):', fridgeIngredients);

                // [수정] 원본 데이터의 속성 이름에 맞게 정확히 매핑합니다.
                // 서버에서 받은 냉장고 재료 데이터는 보통 아래와 같은 형태입니다.
                const formattedFridgeIngredients = fridgeIngredients.map(item => ({
                    id: item.ingredientId,      // 'id'가 아닌 'ingredientId'일 가능성이 높습니다.
                    name: item.ingredientName,  // 'name'이 아닌 'ingredientName'일 가능성이 높습니다.
                }));

                content = (
                    <ul className="list-group">
                        {formattedFridgeIngredients.length > 0 ? (
                            formattedFridgeIngredients.map(item => <IngredientListItem key={`fridge-${item.id}`} item={item} />)
                        ) : (
                            <li className="list-group-item">냉장고에 재료가 없습니다.</li>
                        )}
                    </ul>
                );
            }
            break;

        default:
            content = null;
    }

    return <div>{content}</div>;
}