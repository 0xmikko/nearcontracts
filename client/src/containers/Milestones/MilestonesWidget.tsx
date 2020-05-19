import React from "react";
import { Button, Card } from "react-bootstrap";
import { Milestone } from "../../core/milestone";
import { ContractManager } from "../../core/contract";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import actions from "../../store/actions";

interface MilestonesWidgetProps {
  data: Milestone[];
  cm?: ContractManager;
}

interface MilestonesItemProps {
  data: Milestone;
  cm?: ContractManager;
  accountID?: string;
}

const MilestoneItem: React.FC<MilestonesItemProps> = ({
  data,
  cm,
  accountID,
}) => {
  const dispatch = useDispatch();

  const additionalInfo = data.isDeployed ? (
    <>
      Started at block: {data.startedBlock == 0 ? "-" : data.startedBlock}{" "}
      <br />
      Submitted at block: {data.submittedBlock == 0
        ? "-"
        : data.submittedBlock}{" "}
      <br />
      Paid at block: {data.paidBlock == 0 ? "-" : data.paidBlock} <br />
    </>
  ) : undefined;

  let actionsBlock: React.ReactElement = <div />;
  console.log(cm);
  if (
    cm?.signedByOwner === "yes" &&
    cm.signedByPartner === "yes" &&
    accountID !== undefined
  ) {
    if (cm.isClient(accountID) && !data.isStarted) {
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

    if (!cm.isClient(accountID) && data.isStarted && !data.isSubmitted) {
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

      if (cm.isClient(accountID) && data.isStarted && data.isSubmitted && !data.isPaid) {
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

        {data.isStarted ? (
          <span
            style={{
              backgroundColor: "#07a707",
              marginLeft: "15px",
              padding: "5px",
            }}
          >
            STARTED{" "}
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
        <br />
        {actionsBlock}
      </Card.Body>
    </Card>
  );
};

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
