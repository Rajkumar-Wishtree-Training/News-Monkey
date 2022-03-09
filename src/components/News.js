import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
export default class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      page : 1,
      totalResults : null,
      loading : false
    }
  }
  async getData(page){
    this.setState({loading : true})
    const data = await fetch(`https://newsapi.org/v2/top-headlines/?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&pagesize=20`)
    const parsedData = await data.json()
    this.setState({articles : parsedData.articles , totalResults : parsedData.totalResults , loading : false})
  }
  async componentDidMount(){
    this.getData(this.state.page);
  }

  onClickNextHandler = async () =>{
    this.getData(this.state.page + 1)
    this.setState({
      page : this.state.page + 1
    })
  }

  onClickPrevHandler = async () => {
    this.getData(this.state.page - 1)
    this.setState({
      page : this.state.page - 1
    })

  }
  render() {
    let { articles } = this.state
    
    return (
      <div>
        <div className='container my-3'>
          <h2 className='text-primary text-center my-4'>News Monkey Top headlines</h2>
          {this.state.loading && <Spinner/>}
          <div className="row">
              {
               this.state.loading ||  articles.map((article , id) =>{
                  return(
                    <div className="col-md-4" key={id}>
                    <NewsItem title = {article.title ? article.title.slice(0,40) : null} description = {article.description ? article.description.slice(0,100) : null} imageUrl = {article.urlToImage} url = {article.url}/>
                    </div>
                  )
                }) 
              }
          </div>
          <div className="d-flex justify-content-between">
            <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.onClickPrevHandler}> &larr; Prev</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} className="btn btn-dark" onClick={this.onClickNextHandler}>  Next &rarr;</button>
            </div>
        </div>
      </div>
    )
  }
}
