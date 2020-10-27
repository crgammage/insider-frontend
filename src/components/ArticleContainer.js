import React, {useEffect, useState, Fragment} from 'react'
import ArticleCard from './ArticleCard'

const ArticleContainer = () => {
    const [articles, setArticles] = useState([])

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
            <ArticleCard key={article.id} {...article}/>
            ))
    }

    console.log(articles)
    
    return (
        <div>
            {renderArticles()}
        </div>
       
    )
}

export default ArticleContainer