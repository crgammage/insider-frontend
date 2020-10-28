import React, {useState} from 'react'

const ArticleForm = props => {
    let {handleUpdatedArticle, setShowEditForm} = props
    
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
        let id = e.target.parentElement.id
        debugger
        fetch(`http://localhost:3000/articles/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify({ article: formData })
        })
        .then(res => res.json())
        .then(data => {
            handleUpdatedArticle(data)
            setFormData(initialFormData)
            setShowEditForm(false)
        })
        .catch(error => console.log(error, "error"))
    }

    return (
        <form className="edit-article" onSubmit={(e) => handleSubmit(e)}>
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
          <button className="myButton" type="submit">Edit Article</button>
        </form>
    )
}

export default ArticleForm