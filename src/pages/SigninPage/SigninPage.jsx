import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import clsx from "clsx";
import css from "./SignInPage.module.css";

const SigninPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (formData, { resetForm }) => {
    dispatch(login(formData));
    resetForm();
  };

  return (
    <div className={clsx(css.wrapper)}>
      <AuthForm mode="signin" onSubmit={handleSubmit} />
    </div>
  );
};

export default SigninPage;
