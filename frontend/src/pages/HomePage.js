import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import axios from "../axios-post";
import ReviewList from "../components/review/ReviewList";
import ClinicList from "../components/clinic/ClinicList";
import HomeFirstSection from "../components/home/HomeFirstSection";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import TopRatingClinic from "../components/home/TopRatingClinic";
import RecentlyCreatedReviewsSection from "../components/home/RecentlyCreatedReviewsSection";

const HomePage = () => {
  const { topRatingClinics, recentlyCreatedReviews } = useLoaderData();

  return (
    <>
      <HomeFirstSection />
      <AboutSection />
      <ServicesSection />
      <TopRatingClinic />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={recentlyCreatedReviews}>
          {(loadedReviews) => (
            <RecentlyCreatedReviewsSection
              recentlyCreatedReviews={loadedReviews}
            />
          )}
        </Await>
      </Suspense>

      {/* <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={topRatingClinics}>
          {(loadedClinics) => <ClinicList clinics={loadedClinics} />}
        </Await>
      </Suspense> */}
    </>
  );
};

export default HomePage;

const loadTopRatingClinics = async () => {
  const res = await axios.get("clinics/search/?ordering=rating_descending");
  const slicedTopRatingClinics = res.data.slice(0, 6);

  return slicedTopRatingClinics;
};

const loadRecentlyCreatedReviews = async () => {
  const res = await axios.get("reviews/search/");
  const slicedRecentlyCreatedReviews = res.data.slice(0, 20);

  return slicedRecentlyCreatedReviews;
};

export const loader = async () => {
  return defer({
    topRatingClinics: await loadTopRatingClinics(),
    recentlyCreatedReviews: loadRecentlyCreatedReviews(),
  });
};
