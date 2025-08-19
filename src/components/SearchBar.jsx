import "./SearchBar.css";



export default function() {
    return (
        <div className="simple-search-box">
            <input type="text" className="simple-search-input" placeholder="재료명" />
            <i className="bi bi-search simple-search-icon"></i>
        </div>
    );
}