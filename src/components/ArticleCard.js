import React, {useState, Fragment} from 'react'
import EditArticleForm from './EditArticleForm.js'

const ArticleCard = props => {
    let {title, author, publication_date, body, id, handleUpdatedArticle, handleDeletedArticle} = props
    let [showEditForm, setShowEditForm] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setShowEditForm(!showEditForm)
    }

    const deleteArticle = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/articles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            }
        })
        .then(data => {
            handleDeletedArticle(id)
        })
        .catch(error => console.log(error, "error"))
    }

    return (
        <>
<div id={id} className="card text-white bg-dark mb-3" style={{width: 900, maxWidth: 900, margin: 10}}>
  <div className="card-header">Publication date: {new Date(publication_date).toDateString()}</div>
  <div className="card-header">Author: {author}</div>
  <div className="card-body">
    <h4 className="card-title" style={{textAlign: 'center'}}>Title: {title}</h4>
    <p className="card-text">{body}</p>
  </div>
  { showEditForm ? <button type="button" className="btn btn-primary" onClick={(e) => handleClick(e)}> Close Edit Article</button> : <button type="button" class="btn btn-primary" onClick={(e) => handleClick(e)}>Edit Article</button>}
  <button type="button" className="btn btn-info icomoon icon-remove-2" onClick={(e) => deleteArticle(e)}>Delete Article</button>
  {showEditForm ? <EditArticleForm showEditForm={showEditForm} setShowEditForm={setShowEditForm} handleUpdatedArticle={handleUpdatedArticle}/> : null}
</div>
</>
    )
}

export default ArticleCard