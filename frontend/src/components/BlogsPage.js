import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class BlogsPage extends React.Component {
  state = {
    blogs: {},
    isLoaded: false
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8000/wp-json/wp/v2/Blogs/${id}`)
      .then(res =>
        this.setState({
          blogs: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    const { blogs, isLoaded } = this.state;
    console.log(blogs);
    if (isLoaded) {
      return (
        <div>
          <Link to="/">Go Back</Link>
          <hr></hr>
          <h1>{blogs.title.rendered}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: blogs.content.rendered
            }}
          ></div>
        </div>
      );
    }
    return <h5>loading...</h5>;
  }
}

export default BlogsPage;
