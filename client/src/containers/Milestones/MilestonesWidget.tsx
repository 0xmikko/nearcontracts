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
  return (
    <Card style={{ marginBottom: "20px" }}>
      <Card.Header style={{ backgroundColor: "#F0F0F0" }}>
        <strong>{data.name}</strong>
      </Card.Header>
      <Card.Body>
        Description:
        <br />
        {data.description}
        <br />
        Payment: <br />
        {data.payment}
        <br />
        Deadline: {data.deadline}
        <br />
        DisputShare: {data.disputeShare}
        <br />
      </Card.Body>
    </Card>
  );
};

export const MilestonesWidget: React.FC<MilestonesWidgetProps> = ({
  data
}) => {

  const milestoneRendered =
    data.length === 0
      ? "No milestones yet"
      : data.map((m) => <MilestoneItem data={m} />);
  return <div>{milestoneRendered} </div>;
};
