import React from "react";
import { Card } from "react-bootstrap";
import { getMilestones, Milestone } from "../../core/milestone";

interface MilestonesWidgetProps {
  contractText: string;
}

interface MilestonesItemProps {
  data: Milestone;
}

const MilestoneItem: React.FC<MilestonesItemProps> = ({ data }) => {
  return (
    <Card style={{marginBottom: '20px'}}>
      <Card.Header style={{backgroundColor: '#F0F0F0'}}>
        <strong>{data.name}</strong></Card.Header>
      <Card.Body>
        Description:<br />
        {data.description}<br/>
        Payment: <br />
        {data.payment}<br/>
        Deadline: {data.deadline}<br/>
        DisputShare: {data.disputeShare}<br/>
      </Card.Body>
    </Card>
  );
};

export const MilestonesWidget: React.FC<MilestonesWidgetProps> = ({
  contractText,
}) => {
  const milestones = getMilestones(contractText);

  console.log("MMS>>>>r", milestones);
  const milestoneRendered = milestones.map((m) => <MilestoneItem data={m} />);
  console.log("MMS>>>>22", milestoneRendered);
  return <div>{milestoneRendered} </div>;
};
