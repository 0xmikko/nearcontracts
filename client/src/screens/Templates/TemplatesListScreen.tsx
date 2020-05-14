/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumb } from "../../components/PageHeader/Breadcrumb";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { Loading } from "../../components/Loading";
import { STATUS } from "../../store/utils/status";
import { TemplatesList } from "../../containers/Templates/ListView";
import { RootState } from "../../store";
import actions from "../../store/actions";

export const TemplatesListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("QQ")
    dispatch(actions.templates.getList());
  }, []);

  const { data, status } = useSelector(
    (state: RootState) => state.templates.List
  );

  const breadcrumbs: Breadcrumb[] = [
    {
      url: "/templates",
      title: "Templates",
    },
  ];

  const onPay = () => {
    history.push("/payments/new/edit/");
  };
  const onItemSelected = (id: string) => history.push(`/templates/${id}`);

  return (
    <div className="content content-fixed">
      <PageHeader title={"Templates"} breadcrumbs={breadcrumbs} />
      {status === STATUS.SUCCESS ? (
        <Container style={{ padding: 0 }}>
          <Row>
            <Col lg={12} md={12} xs={12}>
              <TemplatesList items={data} onItemSelected={onItemSelected} />
            </Col>
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </div>
  );
};
