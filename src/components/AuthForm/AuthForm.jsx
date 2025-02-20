import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import css from "./AuthForm.module.css";

const AuthForm = ({ mode = "login", onSubmit, isLoading, groups }) => {
  const isRegister = mode === "register";

  const validationSchema = Yup.object({
    username: isRegister
      ? Yup.string().min(2, "Too short!").required("Required")
      : Yup.string(),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    confirmPassword: isRegister
      ? Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Required")
      : Yup.string(),
    groupId: isRegister
      ? Yup.string().required("Select a group")
      : Yup.string(),
  });

  return (
    <Formik
      initialValues={
        isRegister
          ? { username: "", email: "", password: "", groupId: "" }
          : { email: "", password: "" }
      }
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid }) => (
        <Form className={css.form}>
          <h2 className={css.title}>{isRegister ? "Register" : "Login"}</h2>

          {isRegister && (
            <div className={css.inputGroup}>
              <label className={css.label} htmlFor="username">
                Name
              </label>
              <Field
                className={css.input}
                id="username"
                type="text"
                name="username"
                disabled={isLoading}
              />
              <ErrorMessage
                name="username"
                component="div"
                className={css.error}
              />
            </div>
          )}

          <div className={css.inputGroup}>
            <label className={css.label} htmlFor="email">
              Email
            </label>
            <Field
              className={css.input}
              id="email"
              type="email"
              name="email"
              disabled={isLoading}
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>

          <div className={css.inputGroup}>
            <label className={css.label} htmlFor="password">
              Password
            </label>
            <Field
              className={css.input}
              id="password"
              type="password"
              name="password"
              disabled={isLoading}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </div>
          {isRegister && (
            <div className={css.inputGroup}>
              <label className={css.label} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <Field
                className={css.input}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                disabled={isLoading}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={css.error}
              />
            </div>
          )}
          {isRegister && (
            <div className={css.inputGroup}>
              <label className={css.label} htmlFor="groupId">
                Select a group
              </label>
              <Field className={css.input} as="select" name="groupId">
                <option value="" label="Select a group" />
                {groups.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.groupName}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="groupId"
                component="div"
                className={css.error}
              />
            </div>
          )}

          <button
            type="submit"
            className={clsx(css.button, { [css.disabled]: isLoading })}
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Loading..." : isRegister ? "Sign Up" : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
