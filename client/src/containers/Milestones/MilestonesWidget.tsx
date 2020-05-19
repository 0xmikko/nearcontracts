import React from "react";
import { Card } from "react-bootstrap";
import { Milestone } from "../../core/milestone";

interface MilestonesWidgetProps {
  data: Milestone[];
}

interface MilestonesItemProps {
  data: Milestone;
}

const MilestoneItem: React.FC<MilestonesItemProps> = ({ data }) => {
  const additionalInfo = data.isDeployed ? (
    <>
        Started at block: {data.startedBlock == 0 ? "-" : data.startedBlock}{" "}
        <br />
        Submitted at block: {data.submittedBlock == 0 ? "-" : data.submittedBlock}{" "}
        <br />
        Paid at block: {data.paidBlock == 0 ? "-" : data.paidBlock} <br />
    </>
  ) : undefined;

  return (
    <Card style={{ marginBottom: "20px" }}>
      <Card.Header style={{ backgroundColor: "#F0F0F0" }}>
        <strong>{data.name}</strong>
        {data.isDeployed ? (
          <span
            style={{
              backgroundColor: "#07a707",
              marginLeft: "15px",
              padding: "5px",
            }}
          >
            DEPLOYED{" "}
          </span>
        ) : (
          ""
        )}
        {data.isSubmitted ? (
          <span
            style={{
              backgroundColor: "#07a707",
              marginLeft: "15px",
              padding: "5px",
            }}
          >
            SUBMITTED{" "}
          </span>
        ) : (
          ""
        )}

        {data.isPaid ? (
          <span
            style={{
              backgroundColor: "#07a707",
              marginLeft: "15px",
              padding: "5px",
            }}
          >
            PAID{" "}
          </span>
        ) : (
          ""
        )}
      </Card.Header>
      <Card.Body>
        Description:
        <br />
        {data.description}
        <br />
        Payment:
        {data.payment}
        <br />
        DisputShare: {data.disputeShare}
        <br />
        {additionalInfo}
      </Card.Body>
    </Card>
  );
};

export const MilestonesWidget: React.FC<MilestonesWidgetProps> = ({ data }) => {
  const milestoneRendered =
    data.length === 0
      ? "No milestones yet"
      : data.map((m) => <MilestoneItem data={m} />);
  return <div>{milestoneRendered} </div>;
};
