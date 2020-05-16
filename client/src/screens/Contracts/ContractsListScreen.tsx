/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumb } from "../../components/PageHeader/Breadcrumb";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { Loading } from "../../components/Loading";
import { STATUS } from "../../utils/status";
import { ContractsList } from "../../containers/Contracts/ListView";
import { RootState } from "../../store";
import actions from "../../store/actions";
import { ToolbarButton } from "../../containers/ToolbarButton";
import { DataScreen } from "../../components/DataLoader/DataScreen";

export const ContractsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.contracts.getList());
  }, []);

  const { data, status } = useSelector(
    (state: RootState) => state.contracts.List
  );

  const breadcrumbs: Breadcrumb[] = [
    {
      url: "/contracts",
      title: "Contracts",
    },
  ];

  const onSelect = (id: string) => history.push(`/contracts/${id}`);

  const rightToolbar = (
    <ToolbarButton
      title={"+ Contract"}
      onClick={() => history.push("/contracts/new/edit")}
    />
  );

  return (
    <div className="content content-fixed">
      <PageHeader
        title={"Contracts"}
        breadcrumbs={breadcrumbs}
        rightPanel={rightToolbar}
      />
      <DataScreen
        data={data}
        status={status}
        component={ContractsList}
        onSelect={onSelect}
      />
    </div>
  );
};
