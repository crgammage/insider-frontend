import React, {useEffect, useState, Fragment} from 'react'
import ArticleCard from './ArticleCard'
import ArticleForm from './ArticleForm'

const ArticleContainer = () => {
    let [articles, setArticles] = useState([])
    let [selectedArticle, setSelectedArticle] = useState({})
    let [showArticleForm, setShowArticleForm] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3000/articles', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(res => res.json())
        .then(resp => {
            setArticles(resp)
            })
    }, [])

    const editArticle = (articleId) => {
        let chosenArticle = articles.find((article) => article.id === articleId)
        setSelectedArticle(chosenArticle)
    }

    const renderArticles = () => {
        return articles.map((article) => (
            <ArticleCard key={article.id} {...article} editArticle={editArticle}/>
            ))
    }

    const handleNewArticle = (newArticle) => {
        setArticles([...articles, newArticle])
    }

    const createANewArticle = (e) => {
        setShowArticleForm(true)
    }

    console.log(articles, selectedArticle)
    
    return (
        <div>
            {showArticleForm ?
            <>
            <h1>Create A New Article</h1>
            <ArticleForm handleNewArticle={handleNewArticle}/> 
            </>
            : null}
            <button onClick={(e) => createANewArticle(e)}>Create A New Article</button>
            {renderArticles()}
        </div>
       
    )
}

export default ArticleContainer