import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { tokenLoader, checkAuthLoader } from "./util/auth";
import AuthPage, { action as authAction } from "./pages/AuthPage";
import HomePage, { loader as homeLoader } from "./pages/HomePage";
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
import ArticleListPage, {
  action as filterArticlesAction,
} from "./pages/ArticleListPage";
import ArticleDetailPage, {
  loader as articleDetailLoader,
  action as deleteArticleAction,
} from "./pages/ArticleDetailPage";
import RootLayout from "./pages/layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import { action as logoutAction } from "./pages/Logout";
import UserProfilePage, {
  loader as userProfileLoader,
} from "./pages/UserProfilePage";
import ClinicListPage, {
  loader as clinicListLoader,
  action as filterClinicsAction,
} from "./pages/ClinicListPage";
import ClinicHome, {
  loader as clinicDetailLoader,
} from "./components/clinic/ClinicHome";
import EditArticlePage from "./pages/EditArticlePage";
import { action as manipulateArticleAction } from "./components/article/ArticleForm";
import NewArticlePage from "./pages/NewArticlePage";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    loader: tokenLoader,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader },
      {
        path: "user/:userId",
        loader: userProfileLoader,
        element: <UserProfilePage />,
      },
      {
        path: "clinics",
        children: [
          {
            index: true,
            element: <ClinicListPage />,
            loader: clinicListLoader,
            action: filterClinicsAction,
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
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new/:cnum",
            element: <NewReviewPage />,
            action: manipulateReviewAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "articles",
        children: [
          {
            index: true,
            element: <ArticleListPage />,
            action: filterArticlesAction,
          },
          {
            path: ":anum",
            id: "article-detail",
            loader: articleDetailLoader,
            children: [
              {
                index: true,
                element: <ArticleDetailPage />,
                action: deleteArticleAction,
              },
              {
                path: "edit",
                element: <EditArticlePage />,
                action: manipulateArticleAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewArticlePage />,
            action: manipulateArticleAction,
            loader: checkAuthLoader,
          },
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
