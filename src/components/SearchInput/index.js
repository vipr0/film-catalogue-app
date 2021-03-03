import React from "react";
import { Input} from 'antd';

const { Search } = Input;

function SearchInput({ setQuery }) {
    const onSearch = query => {
        if(query) setQuery(query)
    }

    return (
        <Search
            placeholder="Input film title or actor's name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
        />
    )
}

export default SearchInput;