import React from "react";
import "./App.css";
import Blogs from "./components/blogs";
import BlogsPage from "./components/BlogsPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Fragment } from "react";

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path="/blogs/:id" component={Blogs} />
        <Route exact path="/" component={BlogsPage} />
      </Fragment>
    </Router>
  );
}

export default App;

///
