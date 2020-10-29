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
        <form onSubmit={(e) => handleSubmit(e)} style={{textAlign: 'center'}}>
  <fieldset>
    <div className="form-group">
      <label for="title">Title</label>
      <input type="text" className="form-control" name="title" value={formData.title} onChange={(e) => handleChange(e)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title"/>
    </div>
    <div className="form-group">
      <label for="author">Author</label>
      <input type="text" className="form-control" name="author" value={formData.author} onChange={(e) => handleChange(e)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Author"/>
    </div>
    <div className="form-group">
      <label for="publication_date">Publication Date</label>
      <input type="date" className="form-control" name="publication_date" value={formData.publication_date} onChange={(e) => handleChange(e)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Author"/>
    </div>
    <div className="form-group">
      <label for="exampleTextarea">Body</label>
      <textarea type="text" name="body" value={formData.body} onChange={(e) => handleChange(e)} className="form-control" id="exampleTextarea" rows="3"></textarea>
    </div>
    </fieldset>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    )
}

export default ArticleForm