import { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import Layout from "./Layout/Layout";

import PrivateRoute from "./PrivateRoute/PrivateRoute";
import RestrictedRoute from "./RestrictedRoute/RestrictedRoute.jsx";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
// Ліниве завантаження компонентів
const WelcomePage = lazy(() => import("../pages/WelcomePage/WelcomePage.jsx"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const SigninPage = lazy(() => import("../pages/SigninPage/SigninPage.jsx"));
const SignupPage = lazy(() => import("../pages/SignupPage/SignupPage.jsx"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* <Route index element={<WelcomePage />} /> */}

          {/* Обмежений доступ для неавторизованих користувачів */}
          <Route
            path="/"
            element={<RestrictedRoute component={<WelcomePage />} />}
          />
          {/* Сторінка для авторизованих користувачів */}
          <Route
            path="home"
            element={<PrivateRoute component={<HomePage />} />}
          />
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
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
