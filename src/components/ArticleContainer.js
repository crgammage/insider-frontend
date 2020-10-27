import React, {useEffect, useState} from 'react'

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

    console.log(articles)
    return(
       <h1>Hey</h1>
    )
}

export default ArticleContainer