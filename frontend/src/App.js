import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/common/Layout";
import ReviewListPage from "./pages/ReviewListPage";
import EditReviewPage from "./pages/EditReviewPage";
import ArticleListPage from "./pages/ArticleListPage";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/user/:name" element={<p>user profile</p>} />
            <Route path="/clinics" element={<p>clinic list</p>} />
            <Route path="/clinics/:name" element={<p>clinic page</p>} />
            <Route path="/reviews" element={<ReviewListPage />} />
            <Route path="/reviews/:rnum" element={<p>review detail</p>} />
            <Route path="/editor/reviews/" element={<EditReviewPage/>} />
            <Route path="/editor/reviews/:rnum" element={<EditReviewPage/>} />
            <Route path="/articles" element={<ArticleListPage/>} />
            <Route path="/articles/:anum" element={<p>article detail</p>} />
            <Route path="/editor/articles/:anum" element={<p>article editor</p>} />
            <Route path="/auth/:authPath" element={<AuthPage />} />
            <Route path="/logout" element={<p>logout</p>} />
            <Route path="*" element={<p>not found</p>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
