import React, { Component } from 'react'
import PropTypes from 'prop-types'

const NewsItem = (props) => {
    let { title , description , imageUrl , url , author , date , source} = props;
    return (
      <div>
        <div className="card my-3">
          <img  src={imageUrl} className="card-img-top" style={{height : '15rem'}} alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left : '85%', zIndex : '1'}}>{source}</span>
            <p className="card-text">{description ? description.length === 200 ? description+'...' : description : null}</p>
            <p className="card-text"><small className="text-muted">By <strong>{author}</strong> on {new Date(date).toUTCString()}</small></p>
            <a href={url} target='_blank' className="btn btn-warning btn-sm">Read More</a>
          </div>
        </div>
      </div>
    )
}

NewsItem.propTypes = {
  title : PropTypes.string,
  description : PropTypes.string,
  imageUrl : PropTypes.string,
  url : PropTypes.string,
  author : PropTypes.string,
  date : PropTypes.string,
  source : PropTypes.string
}

export default NewsItem