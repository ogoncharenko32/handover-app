import clsx from "clsx";
import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import css from "./ClipboardModa.module.css";
import {useSelector} from "react-redux";
import {selectTickets} from "../../redux/tickets/selectors";
import {ErrorMessage, Field, Form, Formik} from "formik";

const ClipboardModal = ({isOpen, onClose}) => {
    const tickets = useSelector(selectTickets);

    const [result, setResult] = useState("");

    useEffect(() => {
        let output = "";
        tickets.map((ticket) => {
            output += `# ${ticket.link} - *${ticket.status}* - ${ticket.description}\n`;
        });
        setResult(output);
    }, [tickets]);

    const handleSubmit = (payload) => {
        navigator.clipboard.writeText(payload.textArea);
        onClose();
    };

    return (
        <div>
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
                    initialValues={{textArea: result}}
                    onSubmit={handleSubmit}
                    //   validationSchema={ticketSchema}
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
                        <Form className={clsx(css.form)}>
                            {/* <label htmlFor="status">Status of ticket</label> */}
                            <Field
                                as="textarea"
                                className={css.textArea}
                                // id="status"
                                // as="select"
                                name="textArea"
                                autoFocus={true}
                            />
                            {/* <ErrorMessage
                className={clsx(css.error)}
                name="status"
                component="span"
              /> */}

                            <button
                                className={clsx(css.button)}
                                type="submit"
                                autoFocus="true"
                            >
                                Copy
                            </button>
                        </Form>
                    )}
                </Formik>
                {/* <div>
          <textarea className={clsx(css.textArea)} value={result} />
        </div> */}
            </Modal>
        </div>
    );
};

export default ClipboardModal;
