/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import PageHeader from "../../components/PageHeader/PageHeader";
import { Breadcrumb } from "../../components/PageHeader/Breadcrumb";
import { FormView } from "../../containers/Templates/FormView";
import { Loading } from "../../components/Loading";

import { getDetailsItem } from "../../store/dataloader";
import { STATUS } from "../../store/utils/status";
import { RootState } from "../../store";
import actions from "../../store/actions";
import { Template } from "../../core/template";
import { DataScreen } from "../../components/DataScreen";
import {DataFormScreen} from "../../components/DataFormScreen";

export const TemplateEditScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hash, setHash] = useState("0");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status
  );

  const id = useSelector((state: RootState) => state?.auth?.access?.user_id);
  console.log(id);

  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== "0") {
      switch (operationStatus) {
        case STATUS.SUCCESS:
          history.push(`/templates/${id}`);
          break;

        case STATUS.FAILURE:
          setHash("0");
          setIsSubmitted(false);
          alert("Cant submit your operation to server");
      }
    }
  }, [hash, operationStatus]);

  useEffect(() => {
    if (id) dispatch(actions.templates.getDetails(id));
  }, [dispatch, id]);

  const dataItem = useSelector((state: RootState) =>
    getDetailsItem(state.templates.Details, id || "0")
  );

  if (!dataItem || !dataItem.data) {
    return <Loading />;
  }

  if (dataItem.status === STATUS.FAILURE) {
    return <>"Oops! Error happened!"</>;
  }

  if (dataItem.status === STATUS.LOADING) {
    return <Loading />;
  }

  const { data, status } = dataItem;

  const breadcrumbs: Breadcrumb[] = [
    {
      url: "/profile",
      title: "profile",
    },
  ];

  const onSubmit = (values: Template) => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);

    // Emit data
    dispatch(actions.templates.createUpdateDetails("new", values, newHash));
  };

  return (
    <div className="content content-fixed">
      <PageHeader title="Profile" breadcrumbs={breadcrumbs} />
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
