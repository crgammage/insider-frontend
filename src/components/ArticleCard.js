import React, {Fragment} from 'react'

const ArticleCard = props => {
    let {title, author, publication_date, body } = props


    return (
        <>
        <h1>Article</h1>
        <h5>Title: {title}</h5>
        <h5>Author: {author}</h5>
        <h5>Publication Date: {new Date(publication_date).toDateString()}</h5>
        <h5>Body: {body}</h5>

        </>
    )
}

export default ArticleCard