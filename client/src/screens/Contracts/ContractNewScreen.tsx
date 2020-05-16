/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";

import PageHeader from "../../components/PageHeader/PageHeader";
import { Breadcrumb } from "../../components/PageHeader/Breadcrumb";
import { FormView } from "../../containers/Contracts/FormView";

import { getDetailsItem } from "../../store/dataloader";
import { STATUS } from "../../utils/status";
import { RootState } from "../../store";
import { Contract, DefaultNewContract } from "../../core/contract";
import { DataFormScreen } from "../../components/DataLoader/DataFormScreen";

import actions from "../../store/actions";
import { Loading } from "../../components/Loading";

interface MatchParams {
  template_id: string;
}

interface ContractNewScreenProps extends RouteComponentProps<MatchParams> {}

export const ContractNewScreen: React.FC<ContractNewScreenProps> = ({
  match: {
    params: { template_id },
  },
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hash, setHash] = useState(new Date().toISOString());

  useEffect(() => {
    dispatch(
      actions.contracts.createUpdateDetails(
        "new",
        { ...DefaultNewContract, template_id },
        hash
      )
    );
  }, [template_id]);

  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status
  );

  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== "0") {
      switch (operationStatus) {
        case STATUS.SUCCESS:
          history.push(`/contracts/`);
          break;

        case STATUS.FAILURE:
          alert("Cant submit your operation to server");
      }
    }
  }, [hash, operationStatus]);

  return <Loading />;
};
