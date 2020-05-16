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
import { Contract } from "../../core/contract";
import { DataFormScreen } from "../../components/DataLoader/DataFormScreen";

import actions from "../../store/actions";
import {Loading} from "../../components/Loading";

interface MatchParams {
  id: string;
}

interface ContractEditScreenProps extends RouteComponentProps<MatchParams> {}

export const ContractEditScreen: React.FC<ContractEditScreenProps> = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hash, setHash] = useState("0");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (id && id !== "new") {
      console.log("ID: ", id);
      dispatch(actions.contracts.getDetails(id));
    }
  }, [id]);

  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status
  );

  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== "0") {
      switch (operationStatus) {
        case STATUS.SUCCESS:
          history.push(`/contracts/${id}`);
          break;

        case STATUS.FAILURE:
          setHash("0");
          setIsSubmitted(false);
          alert("Cant submit your operation to server");
      }
    }
  }, [hash, operationStatus]);

  const dataItem = useSelector((state: RootState) =>
    getDetailsItem(state.contracts.Details, id || "0")
  );

  if (dataItem === undefined) return <Loading/>;
  const { data, status} = dataItem;

  const breadcrumbs: Breadcrumb[] = [
    {
      url: "/contract",
      title: 'Contracts',
    },
  ];

  const onSubmit = (values: Contract) => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);

    // Emit data
    dispatch(actions.contracts.createUpdateDetails(values.id, values, newHash));
  };

  return (
    <div className="content content-fixed">
      <PageHeader title={data?.name || ''} breadcrumbs={breadcrumbs} />
      <DataFormScreen
        data={data}
        status={status}
        component={FormView}
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
      />
    </div>
  );
};
