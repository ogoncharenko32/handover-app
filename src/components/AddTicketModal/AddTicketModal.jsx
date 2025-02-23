import clsx from "clsx";
import React, { useState } from "react";
import css from "./AddTicketModal.module.css";
import Modal from "react-modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { ticketStatus } from "../../js/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addTicket, editTicket } from "../../redux/tickets/operations.js";
import { selectSelectedShiftId } from "../../redux/tickets/selectors.js";
import { Switch } from "@mui/material";

Modal.setAppElement("#root");

const AddTicketModal = ({ isOpen, onClose, mode, data, ticketId }) => {
  const isNewTicket = mode === "addTicket";

  const ticketSchema = Yup.object().shape({
    status: Yup.string().required(),
    link: Yup.string().required(),
    description: Yup.string().required(),
    isImportant: Yup.boolean(),
  });

  //   const initialValues = {
  //     status: "In progress",
  //     link: "",
  //     description: "",
  //     isImportant: false,
  //   };

  const dispatch = useDispatch();

  const selectedShiftId = useSelector(selectSelectedShiftId);

  const handleSubmitNewTicket = async (ticket, actions) => {
    console.log(ticket);
    dispatch(addTicket({ ...ticket, shiftId: selectedShiftId }));
    actions.resetForm();
    onClose();
  };

  const handleSubmitEditTicket = async (ticket, actions) => {
    console.log(ticket);
    dispatch(editTicket({ ...ticket, _id: ticketId }));
    actions.resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      bodyOpenClassName="no-scroll"
      className={clsx(css.modal)}
      overlayClassName={clsx(css.customOverlay)}
    >
      <Formik
        initialValues={
          isNewTicket
            ? {
                status: "In progress",
                link: "",
                description: "",
                isImportant: false,
              }
            : {
                status: data.status,
                link: data.link,
                description: data.description,
                isImportant: data.isImportant,
              }
        }
        onSubmit={isNewTicket ? handleSubmitNewTicket : handleSubmitEditTicket}
        validationSchema={ticketSchema}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          touched,
          values,
        }) => (
          <Form className={clsx(css.addTicketForm)}>
            <label htmlFor="status">Status of ticket</label>
            <Field
              className={css.input}
              id="status"
              as="select"
              name="status"
              autoFocus={true}
            >
              {ticketStatus.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Field>
            <ErrorMessage
              className={clsx(css.error)}
              name="status"
              component="span"
            />
            <label htmlFor="link">Link to ticket</label>
            <Field
              className={css.input}
              id="link"
              name="link"
              placeholder="Link"
            />
            <ErrorMessage
              className={clsx(css.error)}
              name="link"
              component="span"
            />
            <label htmlFor="description">Description</label>
            <Field
              as="textarea"
              className={clsx(css.input, css.textarea)}
              id="description"
              name="description"
              placeholder="Descrition"
            />
            <ErrorMessage
              className={clsx(css.error)}
              name="description"
              component="span"
            />
            <div className={clsx(css.checkboxWrapper)}>
              <label htmlFor="isImportant">Mark as important</label>
              {/* <Field
            className={clsx(css.input, css.checkbox)}
            id="isImportant"
            type="checkbox"
            name="isImportant"
            component={Switch}
            onChange={(e, checked) => {
              setFieldValue("isImportant");
            }}
            checked={toggle}
            // value="false"
          /> */}
              <Switch
                className={clsx(css.input, css.checkbox)}
                id="isImportant"
                name="isImportant"
                checked={values.isImportant === true}
                onChange={(e, checked) => {
                  setFieldValue("isImportant", checked ? true : false);
                }}
              />
            </div>

            <button className={clsx(css.button)} type="submit">
              {isNewTicket ? "Add" : "Update"}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddTicketModal;
