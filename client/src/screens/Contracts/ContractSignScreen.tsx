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
import {SignView} from "../../containers/Contracts/SignView";

interface MatchParams {
  id: string;
  tab?: string;
}

interface ContractSignScreenProps extends RouteComponentProps<MatchParams> {}

export const ContractSignScreen: React.FC<ContractSignScreenProps> = ({
  match: {
    params: { id, tab },
  },
}: ContractSignScreenProps) => {
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



  return (
    <div className="content content-fixed">
      <PageHeader
        title={data.name}
        breadcrumbs={breadcrumbs}
      />
      <DataScreen data={data} status={status} component={SignView} />
    </div>
  );
};
