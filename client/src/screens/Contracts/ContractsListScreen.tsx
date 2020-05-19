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

  const hash = history.location.hash;

  const onFilter = (filter: string) => {
    history.push('/contracts#' + filter);
  };

  const rightToolbar = (
      <ButtonGroup className="flex-fill m-0" >
        <Button variant={'outline-primary'} size={'sm'} active={hash === ''} onClick={() => onFilter("")}>All</Button>
        <Button variant={'outline-primary'} size={'sm'} active={hash === '#mine'} onClick={() => onFilter("mine")}>Mine</Button>
        <Button variant={'outline-primary'} size={'sm'} active={hash === '#incoming'} onClick={() => onFilter("incoming")}>Incoming</Button>
      </ButtonGroup>
  );

  let dataFiltered = data;
  if (hash === '#mine') {
      dataFiltered = data.filter(e => e.isIOwner)
  }
    if (hash === '#incoming') {
        dataFiltered = data.filter(e => !e.isIOwner)
    }

  return (
    <div className="content content-fixed">
      <PageHeader
        title={"My contracts"}
        breadcrumbs={breadcrumbs}
        rightPanel={rightToolbar}
      />
      <DataScreen
        data={dataFiltered}
        status={status}
        component={ContractsList}
        onSelect={onSelect}
      />
    </div>
  );
};
