import { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import Layout from "./Layout/Layout";

import PrivateRoute from "./PrivateRoute/PrivateRoute";
import RestrictedRoute from "./RestrictedRoute/RestrictedRoute.jsx";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { selectIsRefreshing } from "../redux/auth/selectors.js";
import { refreshUser } from "../redux/auth/operations.js";
// Ліниве завантаження компонентів
const MainPage = lazy(() => import("../pages/MainPage/MainPage.jsx"));
// const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const SigninPage = lazy(() => import("../pages/SigninPage/SigninPage.jsx"));
const SignupPage = lazy(() => import("../pages/SignupPage/SignupPage.jsx"));
const BrowsePage = lazy(() => import("../pages/BrowsePage/BrowsePage.jsx"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<PrivateRoute component={<MainPage />} />} />
          {/* Сторінка для авторизованих користувачів */}
          {/* <Route
            path="home"
            element={<PrivateRoute component={<HomePage />} />}
          /> */}
          {/* Сторінка для входу */}
          <Route
            path="signin"
            element={<RestrictedRoute component={<SigninPage />} />}
          />
          {/* Сторінка для реєстрації */}
          <Route
            path="signup"
            element={<RestrictedRoute component={<SignupPage />} />}
          />
          {/* <Route
            path="browse"
            element={<PrivateRoute component={<BrowsePage />} />}
          /> */}
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
