import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogsPage from "./BlogsPage";
class BlogItem extends React.Component {
  state = {
    imageUrl: "",
    date: "",
    isLoaded: false
  };
  static propTypes = {
    blog: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { featured_media, date, id } = this.props.blog;
    const getImageUrl = axios.get(
      `http://localhost:8000/wp-json/wp/v2/media/${featured_media}`
    );
    const getDate = axios.get(
      `http://localhost:8000/wp-json/wp/v2/blogs/${id}`
    );

    Promise.all([getImageUrl, getDate]).then(res => {
      this.setState({
        imageUrl: res[0].data.media_details.sizes.full.source_url,
        date: res[0].data.date,
        isLoaded: true
      });
    });
  }

  render() {
    const { title, excerpt, content, id } = this.props.blog;
    const { date, imageUrl, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <div>
          <h2> {title.rendered} </h2>
          <small>
            Date Posted <strong>{date}</strong>
          </small>
          <br></br>
          <img
            src={imageUrl}
            alt="{title.rendered}"
            style={{ width: "225px" }}
          ></img>
          <h4 dangerouslySetInnerHTML={{ __html: excerpt.rendered }}></h4>
          <p dangerouslySetInnerHTML={{ __html: content.rendered }}></p>
          <hr></hr>
          <Link to={`/blog/${id}`}>Read More</Link>
        </div>
      );
    }
    return null;
  }
}

export default BlogItem;
