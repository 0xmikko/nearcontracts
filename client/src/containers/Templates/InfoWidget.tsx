/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from "react";
import { Template } from "../../core/template";
import { Card, Table } from "react-bootstrap";

interface InfoWidgetProps {
  data: Template;
}

export const InfoWidget: React.FC<InfoWidgetProps> = ({ data }) => {
  return (
    <Card>
      <Card.Header className="card-header">
        <h6 className="mg-b-0">Info</h6>
      </Card.Header>
      <Card.Body className="pd-20">
        <div className="table-responsive">
          Owner: Mikhail Lazarev
          <br />
          Category: Freelance
        </div>
      </Card.Body>
    </Card>
  );
};
