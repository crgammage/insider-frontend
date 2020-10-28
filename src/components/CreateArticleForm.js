import React, {useState} from 'react'

const ArticleForm = props => {
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
            setFormData(initialFormData)
        })
        .catch(error => console.log(error, "error"))
    }


    console.log(formData)

    return (
        <div className="form-wrapper">
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <input 
            placeholder="Title" 
            name="title" type="text"
            value={formData.title}
            onChange={(e) => handleChange(e)} />
            <br />
            <input placeholder="Author" name="author" type="text" value={formData.author} onChange={(e) => handleChange(e)} />
            <br />
            <input placeholder="Publication Date" name="publication_date" type="date" value={formData.publication_date} onChange={(e) => handleChange(e)} />
            <br />
            <input placeholder="Body" name="body" type="textarea" value={formData.body} onChange={(e) => handleChange(e)} />
            <br />
            <button>Submit</button>
        </form>
    </div>
    )
}

export default ArticleForm