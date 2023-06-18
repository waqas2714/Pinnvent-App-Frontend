import React from 'react'
import "./Search.css"
import {BiSearch} from 'react-icons/bi'


const Search = ({value, onChange}) => {
  return (
    <div className="search">
        <BiSearch size={18} className='icon'/>
        <input type="text" placeholder='Search Products' value={value} onChange={onChange} />
    </div>
  )
}

export default Search