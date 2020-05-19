/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React, {useEffect, useState} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import ReactGA from "react-ga";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../store/actions";
import { Profile } from "../../core/profile";
import { RootState } from "../../store";
import "./JoinScreen.css";
import { useHistory } from "react-router";
import { Loading } from "../../components/Loading";

const formSchema = yup.object({
  name: yup.string().required(),
});

type FormValues = yup.InferType<typeof formSchema>;

export const JoinScreen: React.FC = () => {


  useEffect(() => {
    dispatch(actions.near.isSignIn());
  }, []);

  const dispatch = useDispatch();
  const profile: Profile = useSelector((state: RootState) => state.profile);
  const { accountId, status } = useSelector((state: RootState) => state.near);
  const [addressSetUp, setAddressSetUp] = useState(false);

  useEffect(() => {
    if (status === "LOGGED_IN") {
      dispatch(actions.near.getAccount());
      setAddressSetUp(true);
    }
  }, [status]);

  console.log(profile);

  const onSubmit = (values: FormValues) => {
    // updating current profile
    const updatedProfile : Profile = {
      ...profile,
      address: accountId || '',
      ...values,
    };
    dispatch(actions.profile.updateProfile(updatedProfile));
  };

  let nearAddress: React.ReactElement;
  switch (status) {
    case "LOADING":
      nearAddress = <Loading />;
      break;
    case "AUTH_REQUIRED":
      nearAddress = <Button>Login to Near</Button>;
      break;
    case "LOGGED_IN":
      nearAddress = (
        <>
          <Field
            type="text"
            placeholder="Address"
            name="address"
            disabled={true}
            value={accountId}
          />
          <ErrorMessage name="address" component="div" className={"feedback"} />
        </>
      );

      break;
  }

  const initialValues: FormValues = {
    name: "",
  };

  return (
    <Container className="join-screen onescreen" fluid>
      <Row>
        <Col>
          <h1>Welcome to Near Contracts!</h1>
          <h2>Please, finish your registration</h2>
          <Formik
            validationSchema={formSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="singnup-form">
                <Field type="text" placeholder="Name" name="name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={"feedback"}
                />
                {nearAddress}
                <Button
                  type={"submit"}
                  className="theme-button"
                  disabled={isSubmitting || !addressSetUp}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
