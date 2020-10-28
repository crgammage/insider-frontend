import React, {useEffect, useState, Fragment} from 'react'
import ArticleCard from './ArticleCard'
import ArticleForm from './CreateArticleForm'
import SearchBar from './SearchBar'

const ArticleContainer = () => {
    let [articles, setArticles] = useState([])
    let [search, setSearch] = useState('')
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
        if (search !== '') {
            let filteredArticles = articles.filter(article => article.title.toLowerCase().includes(search.toLowerCase()))
            return filteredArticles.map((article) => (
                <div className="article-container">
                    <ArticleCard key={article.id} {...article} handleUpdatedArticle={handleUpdatedArticle} handleDeletedArticle={handleDeletedArticle}/>
                </div>
            ))
        } else {
            return articles.map((article) => (
                <div className="article-container">
                <ArticleCard key={article.id} {...article} handleUpdatedArticle={handleUpdatedArticle} handleDeletedArticle={handleDeletedArticle}/>
                </div>
                ))
        }
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
        setSearch(searchInput)
    }


    console.log(search)
    
    return (
        <div>
            {showArticleForm ?
            <>
            <h1 id="create-article">Create A New Article</h1>
            <button onClick={() => setShowArticleForm(!showArticleForm)}className="myButton">Close New Article Form</button>
            <ArticleForm handleNewArticle={handleNewArticle}/> 
            </>
            : null}
            {showArticleForm ? null : <button onClick={(e) => createANewArticle(e)} class="myButton">Create A New Article</button>}
            <SearchBar handleSearch={handleSearch}/>
            <button className="myButton" onClick={() => setSearch('')}>View All Articles</button>
        <div className="article-container">
            {renderArticles()}
        </div>
    </div>
    )
}

export default ArticleContainer