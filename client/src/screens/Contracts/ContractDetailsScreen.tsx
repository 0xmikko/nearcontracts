/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";

import { RootState } from "../../store";

import PageHeader from "../../components/PageHeader/PageHeader";
import { Breadcrumb } from "../../components/PageHeader/Breadcrumb";
import { DetailsView } from "../../containers/Contracts/DetailsView";

import actions from "../../store/actions";
import { STATUS } from "../../utils/status";
import { Loading } from "../../components/Loading";
import { getDetailsItem } from "../../store/dataloader";
import { DataScreen } from "../../components/DataLoader/DataScreen";
import { Button } from "react-bootstrap";
import {ContractManager} from "../../core/contract";

interface MatchParams {
  id: string;
  tab?: string;
}

interface ContractDetailsScreenProps extends RouteComponentProps<MatchParams> {}

export const ContractDetailsScreen: React.FC<ContractDetailsScreenProps> = ({
  match: {
    params: { id, tab },
  },
}: ContractDetailsScreenProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.contracts.getDetails(id));
  }, [id]);

  const dataItem = useSelector((state: RootState) =>
    getDetailsItem(state.contracts.Details, id)
  );

  if (!dataItem || !dataItem.data || dataItem.status !== STATUS.SUCCESS) {
    return <Loading />;
  }

  const { data, status } = dataItem;

  const breadcrumbs: Breadcrumb[] = [
    {
      url: "/contracts",
      title: "Contracts",
    },
  ];

  const contractManager = new ContractManager(data);

  const rightToolbar = !data.isDeployed ? (
    <div className="d-none d-md-block">
      <Button
        className="btn-sm pd-x-15 btn-brand-01 btn-uppercase"
        onClick={() => history.push(`/contracts/${id}/edit/`)}
        style={{marginRight: '10px'}}
      >
        Edit
      </Button>
    </div>
  ) : <div /> ;

  return (
    <div className="content content-fixed">
      <PageHeader
        title={data.name}
        breadcrumbs={breadcrumbs}
        rightPanel={rightToolbar}
      />
      <DataScreen data={data} status={status} component={DetailsView} />
    </div>
  );
};
