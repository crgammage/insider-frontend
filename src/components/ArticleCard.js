import React, {Fragment, useState} from 'react'
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
        <div className="article-card">
        <div id={id}>
        <h1 onClick={(e) => handleClick(e)}>Title: {title}</h1>
        <h5>Author: {author}</h5>
        <h5>Publication Date: {new Date(publication_date).toDateString()}</h5>
        <h5>Body: {body}</h5>
        { showEditForm ? <button className="myButton" onClick={(e) => handleClick(e)}> Close Edit Article</button> : <button className="myButton" onClick={(e) => handleClick(e)}>Edit Article</button>}
        <button className="myButton" onClick={(e) => deleteArticle(e)}>Delete Article</button>
        {showEditForm ? <EditArticleForm showEditForm={showEditForm} setShowEditForm={setShowEditForm} handleUpdatedArticle={handleUpdatedArticle}/> : null}
        </div>
        </div>
    )
}

export default ArticleCard