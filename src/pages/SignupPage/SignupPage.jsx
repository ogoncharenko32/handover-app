import React, { useEffect, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import clsx from "clsx";
import css from "./SignUpPage.module.css";
import { apiGetGroups } from "../../api";

const SignupPage = () => {
  const dispatch = useDispatch();

  const [groups, setGroups] = useState([]);

  const handleGetGroups = async () => {
    const result = await apiGetGroups();
    setGroups(result.data);
  };

  useEffect(() => {
    handleGetGroups();
  }, []);

  const handleSubmit = (formData, { resetForm }) => {
    dispatch(
      register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        groupId: formData.groupId,
      })
    );
    resetForm();
  };

  return (
    <div className={clsx(css.wrapper)}>
      <AuthForm mode="register" onSubmit={handleSubmit} groups={groups} />
    </div>
  );
};

export default SignupPage;
