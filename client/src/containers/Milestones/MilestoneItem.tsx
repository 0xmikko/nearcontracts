import { Milestone } from "../../core/milestone";
import { ContractManager } from "../../core/contract";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";
import actions from "../../store/actions";

interface MilestonesItemProps {
  data: Milestone;
  cm?: ContractManager;
  accountID?: string;
}
interface MileSpanProps {
  text: string;
  show: boolean;
}
const MileSpan: React.FC<MileSpanProps> = ({ text, show }) =>
  show ? (
    <span
      style={{
        backgroundColor: "#07a707",
        marginLeft: "15px",
        padding: "5px",
        paddingLeft: "10px",
        paddingRight: "10px",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {text + " "}
    </span>
  ) : (
    <div />
  );

export const MilestoneItem: React.FC<MilestonesItemProps> = ({
  data,
  cm,
  accountID,
}) => {
  const dispatch = useDispatch();

  const additionalInfo = data.isDeployed ? (
    <>
      Started at block: {data.startedBlock} <br />
      Submitted at block: {data.submittedBlock} <br />
      Paid at block: {data.paidBlock} <br />
    </>
  ) : undefined;

  let actionsBlock: React.ReactElement = <div />;
  if (
    cm?.signedByOwner === "yes" &&
    cm.signedByPartner === "yes" &&
    accountID !== undefined
  ) {
    const isClient = cm.isClient(accountID);
    if (isClient && !data.isStarted) {
      actionsBlock = (
        <Button
          onClick={() =>
            dispatch(
              actions.contracts.startMilestone(cm.contract, data.hash, "12321")
            )
          }
        >
          Start
        </Button>
      );
    }

    if (!isClient && data.isStarted && !data.isSubmitted) {
      actionsBlock = (
        <Button
          onClick={() =>
            dispatch(
              actions.contracts.submitMilestone(cm.contract, data.hash, "12321")
            )
          }
        >
          Submit
        </Button>
      );
    }

    if (isClient && data.isStarted && data.isSubmitted && !data.isPaid) {
      actionsBlock = (
        <Button
          onClick={() =>
            dispatch(
              actions.contracts.payMilestone(cm.contract, data.hash, "12321")
            )
          }
        >
          Pay
        </Button>
      );
    }
  }

  return (
    <Card style={{ marginBottom: "20px" }}>
      <Card.Header style={{ backgroundColor: "#F0F0F0" }}>
        <strong>{data.name}</strong>
        <MileSpan text={"DEPLOYED"} show={data.isDeployed} />
        <MileSpan text={"STARTED"} show={data.isStarted} />
        <MileSpan text={"SUBMITTED"} show={data.isSubmitted} />
        <MileSpan text={"PAID"} show={data.isPaid} />
      </Card.Header>
      <Card.Body>
        Description:
        <br />
        {data.description}
        <br />
        Payment:
        {data.payment}
        <br />
        Dispute Share: {data.disputeShare}
        <br />
        Hash: {data.hash}
        <br />
        {additionalInfo}
        <br />
        {actionsBlock}
      </Card.Body>
    </Card>
  );
};
