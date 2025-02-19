import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import clsx from "clsx";
import css from "./SignUpPage.module.css";

const SignupPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (formData, { resetForm }) => {
    dispatch(
      register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );
    resetForm();
  };

  return (
    <div className={clsx(css.wrapper)}>
      <AuthForm mode="register" onSubmit={handleSubmit} />
    </div>
  );
};

export default SignupPage;
