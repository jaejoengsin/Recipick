import "./SearchBar.css";



export default function() {
    return (
        <div className="simple-search-box">
            <form className="d-flex" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="검색어를 입력하세요"
                    aria-label="검색"
                />
                <button className="btn btn-primary" type="submit">
                    검색
                </button>
            </form>
        </div>
    );
}