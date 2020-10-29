import React, {useEffect, useState} from 'react'
import ArticleCard from './ArticleCard'
import CreateArticleForm from './CreateArticleForm'
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
            let sortedArticles = articles.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
            let filteredArticles = sortedArticles.filter(article => article.title.toLowerCase().includes(search.toLowerCase()))
            return filteredArticles.map((article) => (
                <div className="article-container" style={{display: 'flex', justifyContent: 'center'}}>
                    <ArticleCard key={article.id} {...article} handleUpdatedArticle={handleUpdatedArticle} handleDeletedArticle={handleDeletedArticle}/>
                </div>
            ))
        } else {
            let sortedArticles = articles.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
            return sortedArticles.map((article) => (
                <div className="article-container" style={{display: 'flex', flowDirection: 'row-reverse', justifyContent: 'center', flexWrap: 'wrap'}}>
                <ArticleCard key={article.id} {...article} handleUpdatedArticle={handleUpdatedArticle} handleDeletedArticle={handleDeletedArticle}/>
                </div>
                ))
        }
    }

    const handleNewArticle = (newArticle) => {
        setArticles([...articles, newArticle])
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

    
    return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" style={{fontSize: 40}}href="#">Articles</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => setSearch('')}>View All Articles</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => setShowArticleForm(!showArticleForm)}>Create An Article</a>
                </li>
                </ul>
                    <SearchBar handleSearch={handleSearch}/>
            </div>
        </nav>
        {showArticleForm ?
        <div style={{textAlign: 'center', margin: 10}}>
        <CreateArticleForm handleNewArticle={handleNewArticle}/>
        <button style={{margin: 10}} className="btn btn-primary" onClick={() => setShowArticleForm(!showArticleForm)} classNameName="myButton">Close New Article Form</button>
        </div>
        : null}
        {renderArticles()}
        </div>
    )
}

export default ArticleContainer