import SearchIcon from "../assets/svg/search-solid.svg";
import React, { useState } from "react";

function Search({ searchWithData }) {
    const [query, setQuery] = useState('');
    return(
        <div className="search">
            <input type="text" className="search-input"
                   placeholder="Search..." value={query}
                   onChange={(e) => setQuery(e.target.value)} onKeyPress={(e) => searchWithData(e, query)}/>
            <button className="search-button" onClick={e => searchWithData(e, query, "btn")}>
                <img src={SearchIcon} alt="Search"/>
            </button>
        </div>
    )
}

export default Search