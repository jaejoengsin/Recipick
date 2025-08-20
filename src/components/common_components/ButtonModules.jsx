import "../../styles/buttons.css";



// type으로 Props 타입 정의: 컴포넌트 외부에서 type 키워드를 사용하여 props로 
// 전달될 값들의 타입을 명확하게 정의하는 것이 좋습니다.
// 이렇게 하면 코드의 가독성과 재사용성이 높아집니다.


export function FridgeAddButton({ isDoubleActive, preventDoubleActiveFunction, isAddingBoxVisible,showFlagStateFunction }  ) {



    const handleToggleAddingBox = () => {
        if (!isDoubleActive){
            preventDoubleActiveFunction(nowstate => !nowstate);
            showFlagStateFunction(nowstate => !nowstate);
        }
        else if (isAddingBoxVisible){
            showFlagStateFunction(nowstate => !nowstate);
            preventDoubleActiveFunction(nowstate => !nowstate);
        }};

    const isDisabled = isDoubleActive && !isAddingBoxVisible;

    return (
        <button onClick={handleToggleAddingBox} id="add-button" 
            className={`circle-btn ${isDisabled ? 'disable' : ''} ${!isDisabled&&isAddingBoxVisible ? 'active' : ''}`} disabled={isDisabled}>
            <i className="fa-solid fa-plus"></i> 
        </button>
      );
}


export function FridgeEditButton({ isDoubleActive, preventDoubleActiveFunction,  isStateEdit, setEditPossibleFunction }) {



    const handleToggleEditBox = () => {
        if (!isDoubleActive) {
            preventDoubleActiveFunction(nowstate => !nowstate);
            setEditPossibleFunction(nowstate => !nowstate); 
        }
        else if (isStateEdit) {
            setEditPossibleFunction(nowstate => !nowstate); 
            preventDoubleActiveFunction(nowstate => !nowstate);
        }
    };

    const isDisabled = isDoubleActive && !isStateEdit;

    return (
        <button onClick={handleToggleEditBox} id="edit-button" className={`circle-btn ${isDisabled ? 'disable' : ''}`} disabled={isDisabled}>
            {!isStateEdit ? (
                <i className="fa-solid fa-pen-to-square"></i>
            ) : (
                <i className="fa-solid fa-floppy-disk"></i>
            )}
        </button>
    );
}






export default function Button() {
    return (<h1>this is button</h1>);
}


