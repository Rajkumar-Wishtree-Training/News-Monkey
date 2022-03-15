import React, {  useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props) => {
  const [articles , setArticles] = useState([])
  const [page , setPage] = useState(1)
  const [totalResults , setTotalResults] = useState(0)
  // const [loading ,setLoading] = useState(false)
  const capitalize = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  const getData = async () => {
    // setLoading(true)
    const data = await fetch(`https://newsapi.org/v2/top-headlines/?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=20`)
    props.refrance.current.continuousStart()
    const parsedData = await data.json()
    props.refrance.current.complete()
    // setLoading(false)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
  }
  const fetchData = async () => {
    const data = await fetch(`https://newsapi.org/v2/top-headlines/?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pagesize=20`)
    console.log(totalResults , articles.length);
    setPage(page + 1)
    const parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
  }
  useEffect(() =>{
    
    props.refrance.current.staticStart()
    document.title = 'News Monkey - ' + capitalize(props.category)
    getData()
  },[])

    return (
      <div>
        <div className='container my-3' style={{overflow : 'hidden'}}>
          <h2 className='text-primary text-center' style={{marginTop : '100px'}}>News Monkey Top Headlines - { capitalize(props.category)}</h2>
          {/* {loading && <Spinner />} */}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchData}
            hasMore={totalResults !== articles.length}
            loader={<Spinner />}
          >
            <div className="container">   
              <div className="row ">

                {
                  articles.map((article, id) => {
                    return (
                      <div className="col-md-4" key={id}>
                        <NewsItem title={article.title ? article.title : null} description={article.description ? article.description.slice(0, 200) : null} imageUrl={article.urlToImage} url={article.url} author={article.author ? article.author : "Unknown"} date={article.publishedAt} source={article.source.name} />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </div>
    )
}
News.propTypes = {
  category: PropTypes.string
}

export default News