import React, {useState} from 'react'

const SearchBar = props => {
    let {handleSearch} = props
    let [search, setSearch] = useState("")

    const handleChange = () => {
        handleSearch(search)
        setSearch('')
    }

    return (
        <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="text" placeholder="Search..."name="search" value={search} onChange={(e) => setSearch(e.target.value)}/>
      <button onClick={() => handleChange()} className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
    </form>
    )
}

export default SearchBar