import React, { Component } from "react";
import { render } from "react-dom";
// import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage, { action as authAction } from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ReviewListPage, {
  loader as reviewsLoader,
  action as filterReviewsAction,
} from "./pages/ReviewListPage";
import ReviewDetailPage, {
  loader as reviewDetailLoader,
  deleteReviewAction,
} from "./pages/ReviewDetailPage";
import { action as manipulateReviewAction } from "./components/review/ReviewForm";
import EditReviewPage from "./pages/EditReviewPage";
import NewReviewPage from "./pages/NewReviewPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import RootLayout from "./pages/layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import ClinicRootLayout from "./pages/layout/ClinicRootLayout";
import ReviewRootLayout from "./pages/layout/ReviewRootLayout";
import ArticleRootLayout from "./pages/layout/ArticleRootLayout";
import { tokenLoader } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";
import UserProfilePage, {
  loader as userProfileLoader,
} from "./pages/UserProfilePage";
import ClinicListPage, {
  loader as clinicListLoader,
} from "./pages/ClinicListPage";
import ClinicHome, {
  loader as clinicDetailLoader,
} from "./components/clinic/ClinicHome";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    loader: tokenLoader,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "user/:userId",
        loader: userProfileLoader,
        element: <UserProfilePage />,
      },
      {
        path: "clinics",
        element: <ClinicRootLayout />,
        children: [
          {
            index: true,
            element: <ClinicListPage />,
            loader: clinicListLoader,
          },
          {
            path: ":name",
            element: <ClinicHome />,
            loader: clinicDetailLoader,
          },
        ],
      },
      {
        path: "reviews",
        element: <ReviewRootLayout />,
        children: [
          {
            index: true,
            element: <ReviewListPage />,
            loader: reviewsLoader,
            action: filterReviewsAction,
          },
          {
            path: ":rnum",
            id: "review-detail",
            loader: reviewDetailLoader,
            children: [
              {
                index: true,
                element: <ReviewDetailPage />,
                action: deleteReviewAction,
              },
              {
                path: "edit",
                element: <EditReviewPage />,
                action: manipulateReviewAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewReviewPage />,
            action: manipulateReviewAction,
          },
        ],
      },
      {
        path: "articles",
        element: <ArticleRootLayout />,
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
        path: "auth",
        element: <AuthPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
