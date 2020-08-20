import React, {useRef} from 'react';
import '../App.css';

function FilterSwitcher(props) {
    const div_all = useRef();
    const div_movies = useRef();
    const div_tv = useRef();

    const handleClick = (e) => {
        e.preventDefault();

        // Odstraň všechny active
        div_all.current.classList.remove("active");
        div_movies.current.classList.remove("active");
        div_tv.current.classList.remove("active");
        // Přiřaď active kliknutému
        e.target.className = "active";

        switchFilter(e.target.innerText);
    }

    // Odešli zpět filter
    const switchFilter = (filter) => {
        const {dataCallBack} = props;
        dataCallBack(filter);
    }

    return (
        <div className="filters">
          <div className="active" onClick={handleClick} ref={div_all}>All</div>
          <div onClick={handleClick} ref={div_movies}>Movies</div>
          <div onClick={handleClick} ref={div_tv}>TV</div>
        </div>
    )
}

export default FilterSwitcher;