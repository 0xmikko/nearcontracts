/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React, { ReactElement } from "react";
import { STATUS } from "../store/utils/status";
import { Loading } from "./Loading";
import FailureView from "./Failure";

export interface DataScreenComponentProps<T> {
  data: T;
  onSelect?: (id: string) => void;
  onSubmit?: (values: T) => void;
  isSubmitted?: boolean;
}

interface DataScreenProps<T> {
  data: T;
  status: STATUS;
  component: (props: DataScreenComponentProps<T>) => React.ReactElement;
  onSelect?: (id: string) => void;
  onSubmit?: (values: T) => void;
  isSubmitted?: boolean;
}

export function DataScreen<T>({
  data,
  status,
  component,
  onSelect,
  onSubmit,
  isSubmitted,
}: DataScreenProps<T>): ReactElement {
  switch (status) {
    default:
    case STATUS.LOADING:
      return <Loading />;

    case STATUS.FAILURE:
      return <FailureView error="Oops! It's a problem connecting server" />;

    case STATUS.UPDATING:
    case STATUS.SUCCESS:
      return component({ data, onSelect, onSubmit, isSubmitted });
  }
}
