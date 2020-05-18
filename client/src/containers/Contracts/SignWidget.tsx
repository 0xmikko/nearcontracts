/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React, { useEffect, useState } from "react";
import { Contract } from "../../core/contract";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { ContractMarkdown } from "../../components/ContractMarkdown/ContractMarkdown";
import { toHumanDate } from "../../utils/formaters";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../store/actions";
import { RootState } from "../../store";
import { getDetailsItem } from "../../store/dataloader";
import { STATUS } from "../../utils/status";
import { Loading } from "../../components/Loading";
import { Breadcrumb } from "../../components/PageHeader/Breadcrumb";
import { useHistory } from "react-router";

interface InfoWidgetProps {
  data: Contract;
}

export const SignWidget: React.FC<InfoWidgetProps> = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.near.getAccount());
  });

  const [hash, setHash] = useState("0");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const accountID = useSelector((state: RootState) => state.near.accountId);

  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status
  );

  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== "0") {
      switch (operationStatus) {
        case STATUS.SUCCESS:
          history.push(`/contracts/${data.id}`);
          break;

        case STATUS.FAILURE:
          setHash("0");
          setIsSubmitted(false);
          alert("Cant submit your operation to server");
      }
    }
  }, [hash, operationStatus]);

  const onDeploy = () => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);

    // Emit data
    dispatch(actions.contracts.deployContract(data, newHash));
  };

  return (
    <Row style={{ marginTop: "20px" }}>
      <Col lg={8} md={8} xs={12}>
        <ContractMarkdown source={data.content} />
      </Col>
      <Col lg={4} md={4} xs={12}>
        <Card>
          <Card.Header
            className="card-header"
            style={{ backgroundColor: "#F0F0F0" }}
          >
            <h6 className="mg-b-0">Sign Info</h6>
          </Card.Header>
          <Card.Body className="pd-20">
            {accountID} <br />
            Pressing "Deploy & Sign" Button I agree ng this contact I undersood
            all
            <br />
            <br />
            <Button onClick={onDeploy} disabled={isSubmitted}>
              Deploy
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
