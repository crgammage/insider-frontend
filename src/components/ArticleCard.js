import React, {Fragment, useState} from 'react'
import EditArticleForm from './EditArticleForm.js'

const ArticleCard = props => {
    let {title, author, publication_date, body, id, handleUpdatedArticle } = props
    let [showEditForm, setShowEditForm] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setShowEditForm(true)
    }

    console.log(showEditForm)
    return (
        <div id={id}>
        <h1 onClick={(e) => handleClick(e)}>Title: {title}</h1>
        <h5>Author: {author}</h5>
        <h5>Publication Date: {new Date(publication_date).toDateString()}</h5>
        <h5>Body: {body}</h5>
        <button onClick={(e) => handleClick(e)}>Edit Article</button>
        <button>Delete Article</button>
        {showEditForm ? <EditArticleForm showEditForm={showEditForm} setShowEditForm={setShowEditForm} handleUpdatedArticle={handleUpdatedArticle}/> : null}
        </div>
    )
}

export default ArticleCard