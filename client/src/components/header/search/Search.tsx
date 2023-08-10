import React, { useState } from "react";
import { Input } from "antd";
import { searchRequest } from "../../redux/slices/search";
import { useDispatch } from "react-redux";
import { dataSearch } from "../../interfaces/reduxActions";
const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const loggedUserRaw = localStorage.getItem("loggedUser");
  const loggedUser = loggedUserRaw ? JSON.parse(loggedUserRaw) : null;
  const loggedUserId = loggedUser.user_id;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const data: dataSearch = {
        content: searchValue,
        requesterId: "loggedUserId",
      };
      dispatch(searchRequest(data));
    }
  };

  return (
    <Input
      value={searchValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};
export default Search;
