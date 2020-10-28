import React, {useState} from 'react'

const SearchBar = props => {
    let {handleSearch} = props
    let [search, setSearch] = useState("")

    const handleChange = (search) => {
        
    }



    console.log(search)
    return (
        <div className="searchbar">
            <input placeholder="Search..." name="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={() => handleChange()} class="myButton">Search</button>
        </div>
    )
}

export default SearchBar