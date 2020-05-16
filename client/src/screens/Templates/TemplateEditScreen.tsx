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
import { FormView } from "../../containers/Templates/FormView";

import { getDetailsItem } from "../../store/dataloader";
import { STATUS } from "../../utils/status";
import { RootState } from "../../store";
import { Template, TemplateNewDefault } from "../../core/template";
import { DataFormScreen } from "../../components/DataLoader/DataFormScreen";

import actions from "../../store/actions";

interface MatchParams {
  id: string;
}

interface TemplateEditScreenProps extends RouteComponentProps<MatchParams> {}

export const TemplateEditScreen: React.FC<TemplateEditScreenProps> = ({
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
      dispatch(actions.templates.getDetails(id));
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
          history.push(`/templates/${id}`);
          break;

        case STATUS.FAILURE:
          setHash("0");
          setIsSubmitted(false);
          alert("Cant submit your operation to server");
      }
    }
  }, [hash, operationStatus]);

  const dataItem = useSelector((state: RootState) =>
    getDetailsItem(state.templates.Details, id || "0")
  );

  const data: Template | undefined =
    id === "new" ? TemplateNewDefault : dataItem?.data;
  const status: STATUS =
    id === "new" ? STATUS.SUCCESS : dataItem?.status || STATUS.LOADING;

  const breadcrumbs: Breadcrumb[] = [
    {
      url: "/template",
      title: 'Templates',
    },
  ];

  const onSubmit = (values: Template) => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);

    // Emit data
    dispatch(actions.templates.createUpdateDetails(values.id, values, newHash));
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
