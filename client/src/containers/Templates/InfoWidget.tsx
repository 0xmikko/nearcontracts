/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from "react";
import { Template } from "../../core/template";
import { Card, Col, Row, Table } from "react-bootstrap";
import { ContractMarkdown } from "../../components/ContractMarkdown/ContractMarkdown";

interface InfoWidgetProps {
  data: Template;
}

export const InfoWidget: React.FC<InfoWidgetProps> = ({ data }) => {
  return (
    <Row style={{ marginTop: "20px" }}>
      <Col lg={8} md={8} xs={12}>
        <ContractMarkdown source={data.content} />
      </Col>
      <Col lg={4} md={4} xs={12}>
        <Card>
          <Card.Header className="card-header">
            <h6 className="mg-b-0">Info</h6>
          </Card.Header>
          <Card.Body className="pd-20">
            <div className="table-responsive">
              Owner: Mikhail Lazarev
              <br />
              Description: {data.description}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
