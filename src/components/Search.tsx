import React from 'react';
import { Input, Space } from 'antd';


const { Search } = Input;


const onSearch = (
    value:any,
    event?: React.ChangeEvent<HTMLInputElement> | 
        React.MouseEvent<HTMLElement> |
        React.KeyboardEvent<HTMLInputElement>, 
    info?:{
        source?:"input"|"clear"
    }
) =>{
    console.log(value)
    console.log(info?.source)
}

const MySearch: React.FC = () => (
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      style={{width:'30%'}}
    />
);

export default MySearch;