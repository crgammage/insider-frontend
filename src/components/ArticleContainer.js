import React, {useEffect, useState, Fragment} from 'react'
import ArticleCard from './ArticleCard'
import ArticleForm from './CreateArticleForm'
import SearchBar from './SearchBar'

const ArticleContainer = () => {
    let [articles, setArticles] = useState([])
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


    const renderArticles = () => {
        return articles.map((article) => (
            <div className="article-container">
            <ArticleCard key={article.id} {...article} handleUpdatedArticle={handleUpdatedArticle} handleDeletedArticle={handleDeletedArticle}/>
            </div>
            ))
    }

    const handleNewArticle = (newArticle) => {
        setArticles([...articles, newArticle])
    }

    const createANewArticle = (e) => {
        setShowArticleForm(!showArticleForm)
    }

    const handleUpdatedArticle = (updatedArticle) => {
        let updatedArticlesArray = articles.filter(article => article.id !== updatedArticle.id)
        setArticles([...updatedArticlesArray, updatedArticle])
    }

    const handleDeletedArticle = (id) => {
        let updatedArticlesArray = articles.filter(article => article.id !==id)
        setArticles([...updatedArticlesArray])
    }

    const handleSearch = (searchInput) => {
        debugger
        let searchArticles = articles.filter(article => article.title.toLowerCase().includes(searchInput.toLowerCase()))
        setArticles=([...searchArticles])
    }


    console.log(articles)
    
    return (
        <div>
            {showArticleForm ?
            <>
            <h1>Create A New Article</h1>
            <ArticleForm handleNewArticle={handleNewArticle}/> 
            </>
            : null}
            {showArticleForm ? null : <button onClick={(e) => createANewArticle(e)} class="myButton">Create A New Article</button>}
            <SearchBar handleSearch={handleSearch}/>
        <div className="article-container">
            {renderArticles()}
        </div>
    </div>
    )
}

export default ArticleContainer