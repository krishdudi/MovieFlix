import React,{useState, useRef} from "react";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";
import "./index.css";

const SearchBar = ({callback}) => {
  const [state, setState] = useState("");
  const timeOut = useRef(null);

  const doSearch = (event) => {
    const { value } = event.target;
    clearTimeout(timeOut.current);
    setState(value);

    timeOut.current = setTimeout(() => {
      callback(value);
    }, 500);
  };
  return (
    <div className="search-container">
      <FontAwesome className="fa-search" name="search"  />
      <input
        type="text"
        placeholder="Search Movie"
        onChange={doSearch}
        value={state}
      ></input>
    </div>
  );
};
SearchBar.propTypes = {
  callback: PropTypes.func,
};
export default SearchBar;
