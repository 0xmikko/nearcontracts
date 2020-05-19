import React from "react";
import { Button, Card } from "react-bootstrap";
import { Milestone } from "../../core/milestone";
import { ContractManager } from "../../core/contract";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import actions from "../../store/actions";
import { MilestoneItem } from "./MilestoneItem";

interface MilestonesWidgetProps {
  data: Milestone[];
  cm?: ContractManager;
}

export const MilestonesWidget: React.FC<MilestonesWidgetProps> = ({
  data,
  cm,
}) => {
  const accountID = useSelector((state: RootState) => state.near.accountId);

  const milestoneRendered =
    data.length === 0
      ? "No milestones yet"
      : data.map((m) => (
          <MilestoneItem data={m} cm={cm} accountID={accountID} />
        ));
  return <div>{milestoneRendered} </div>;
};
