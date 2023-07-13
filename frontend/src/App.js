import React, { Component } from "react";
import { render } from "react-dom";
// import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/common/Layout";
import ReviewListPage from "./pages/ReviewListPage";
import EditReviewPage from "./pages/EditReviewPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import RootLayout from "./pages/layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import ClinicRootLayout from "./pages/layout/ClinicRootLayout";
import ReviewRootLayout from "./pages/layout/ReviewRootLayout";
import ArticleRootLayout from "./pages/layout/ArticleRootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "user/:name", element: <p>user profile</p> },
      {
        path: "clinics",
        element: <ClinicRootLayout/>,
        children: [
          { index: true, element: <p>clinic list</p> },
          { path: ":name", element: <p>clinic page</p> },
        ],
      },
      {
        path: "reviews",
        element: <ReviewRootLayout/>,
        children: [
          { index: true, element: <ReviewListPage /> },
          {
            path: ":rnum",
            id: "review-detail",
            children: [
              { index: true, element: <p>review detail</p> },
              { path: "edit", element: <EditReviewPage /> },
            ],
          },
          { path: "new", element: <EditReviewPage /> },
        ],
      },
      {
        path: "articles",
        element: <ArticleRootLayout/>,
        children: [
          { index: true, element: <ArticleListPage /> },
          {
            path: ":anum",
            id: "article-detail",
            children: [
              { index: true, element: <ArticleDetailPage /> },
              { path: "edit", element: <p>article editor</p> },
            ],
          },
          { path: "new", element: <p>article editor</p> },
        ],
      },
      {
        path: 'auth',
        element: <AuthPage />,
        // action: authAction
      },
      {
        path: 'logout',
        // action: logoutAction
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;