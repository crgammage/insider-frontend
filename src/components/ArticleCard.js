import React, {Fragment, useState} from 'react'
import ArticleForm from './ArticleForm.js'

const ArticleCard = props => {
    let {title, author, publication_date, body, id, editArticle } = props
    let [showEditForm, setShowEditForm] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setShowEditForm(true)
    }


    return (
        <>
        <h1 onClick={(e) => handleClick(e)}>Title: {title}</h1>
        <h5>Author: {author}</h5>
        <h5>Publication Date: {new Date(publication_date).toDateString()}</h5>
        <h5>Body: {body}</h5>
        <button>Edit Article</button>
        <button>Delete Article</button>
        {showEditForm ? <ArticleForm/> : null}
        </>
    )
}

export default ArticleCard