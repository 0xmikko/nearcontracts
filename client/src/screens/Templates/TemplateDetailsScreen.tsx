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
import { DetailsView } from "../../containers/Templates/DetailsView";

import actions from "../../store/actions";
import { STATUS } from "../../utils/status";
import { Loading } from "../../components/Loading";
import { getDetailsItem } from "../../store/dataloader";
import { DataScreen } from "../../components/DataScreen";

interface MatchParams {
  id: string;
  tab?: string;
}

interface TemplateDetailsScreenProps extends RouteComponentProps<MatchParams> {}

export const TemplateDetailsScreen: React.FC<TemplateDetailsScreenProps> = ({
  match: {
    params: { id, tab },
  },
}: TemplateDetailsScreenProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.templates.getDetails(id));
  }, [dispatch, id]);

  const dataItem = useSelector((state: RootState) =>
    getDetailsItem(state.templates.Details, id)
  );

  if (!dataItem || !dataItem.data || dataItem.status !== STATUS.SUCCESS) {
    return <Loading />;
  }

  const { data, status } = dataItem;

  const breadcrumbs: Breadcrumb[] = [
    {
      url: "/templates",
      title: "Templates",
    },
  ];

  return (
    <div className="content content-fixed">
      <PageHeader title={data.name} breadcrumbs={breadcrumbs} />
      <DataScreen data={data} status={status} component={DetailsView} />
    </div>
  );
};
