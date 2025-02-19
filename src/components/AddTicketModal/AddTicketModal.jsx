import clsx from "clsx";
import React from "react";
import css from "./AddTicketModal.module.css";
import Modal from "react-modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { ticketStatus } from "../../js/constants.js";
import { useDispatch } from "react-redux";
import { addTicket } from "../../redux/tickets/operations.js";

Modal.setAppElement("#root");

const AddTicketModal = ({ isOpen, onClose }) => {
  const ticketSchema = Yup.object().shape({
    status: Yup.string().required(),
    link: Yup.string().required(),
    description: Yup.string().required(),
    isImportant: Yup.boolean(),
  });

  const initialValues = {
    status: "In progress",
    link: "",
    description: "",
    isImportant: false,
  };

  const dispatch = useDispatch();

  const handleSubmit = async (ticket, actions) => {
    console.log(ticket);
    dispatch(addTicket(ticket));
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
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ticketSchema}
      >
        <Form className={clsx(css.addTicketForm)}>
          <label htmlFor="status">Status of ticket</label>
          <Field id="status" as="select" name="status">
            {ticketStatus.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Field>
          <ErrorMessage
            className={clsx(css.formSpan)}
            name="status"
            component="span"
          />
          <label htmlFor="link">Link to ticket</label>
          <Field id="link" name="link" placeholder="Link" />
          <ErrorMessage
            className={clsx(css.formSpan)}
            name="link"
            component="span"
          />
          <label htmlFor="description">Description</label>
          <Field id="description" name="description" placeholder="Descrition" />
          <ErrorMessage
            className={clsx(css.formSpan)}
            name="description"
            component="span"
          />
          <label htmlFor="isImportant">Mark as important</label>
          <Field
            id="isImportant"
            type="checkbox"
            name="isImportant"
            // value="false"
          />
          <button type="submit">Add Ticket</button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddTicketModal;
