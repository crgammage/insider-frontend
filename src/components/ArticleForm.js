import React, {useState} from 'react'

const CampaignForm = props => {
    let {handleNewArticle} = props
    
    let initialFormData = {
        title: '',
        author: '',
        publication_date: '',
        body: ''
    }

    let [formData, setFormData] = useState(initialFormData)


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/articles', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            }, body: JSON.stringify({ article: formData})
        })
        .then(res => res.json())
        .then(data => {
            handleNewArticle(data)
        })
    }


    console.log(formData)

    return (
        <div className="form-wrapper">
        <h2>Add An Article</h2>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <input 
            placeholder="Title" 
            name="title" type="text"
            onChange={(e) => handleChange(e)} />
            <br />
            <input placeholder="Author" name="author" type="text" onChange={(e) => handleChange(e)} />
            <br />
            <input placeholder="Publication Date" name="publication_date" type="date" onChange={(e) => handleChange(e)} />
            <br />
            <input placeholder="Body" name="body" type="textarea" onChange={(e) => handleChange(e)} />
            <br />
            <button>Submit</button>
        </form>
    </div>
    )
}

export default CampaignForm