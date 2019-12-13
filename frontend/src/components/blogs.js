import React from "react";
import axios from "axios";
import BlogItem from "./blog-item";

class Blogs extends React.Component {
  state = {
    blogs: [],
    isLoaded: false
  };

 

  componentDidMount() {
    axios
      .get("http://localhost:8000/wp-json/wp/v2/Blogs")
      .then(res =>
        this.setState({
          blogs: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);
    const { blogs, isLoaded, id } = this.state;
    if (isLoaded) {
      return (
        <div>
          {blogs.map(blog => (
            <BlogItem key={blog.id} blog={blog}></BlogItem>
          ))}
        </div>
      );
    }
    return <h3>Loading....</h3>;
  }
}

export default Blogs;
