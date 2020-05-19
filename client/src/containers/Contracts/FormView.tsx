/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React, {useEffect, useState} from "react";
import * as yup from "yup";
import {
  FormikForm,
  FormikFormViewProps,
} from "../../components/Forms/FormikForm";
import { Contract } from "../../core/contract";
import { Loading } from "../../components/Loading";
import {TypeaheadOptions} from "../../components/Forms/AutoCompleteField";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import actions from '../../store/actions'

const formSchema = yup.object({
  name: yup.string().required().min(3),
  partnerID: yup.string().required(),
});

interface FormViewProfileProps extends FormikFormViewProps<Contract> {}

export const FormView: React.FC<FormViewProfileProps> = ({
  data,
  onSubmit,
  isSubmitted,
}) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.accounts.getList());
  }, [])

  const accounts = useSelector(
      (state: RootState) => state.accounts.List
  );

  const fields = {
    name: {
      label: "Contract name",
    },
    partnerID: {
      label: "Partner",
      type: 'autocomplete',
      options: accounts.data.map<TypeaheadOptions>((account, index) => ({
        id: account.id,
        value: `${account.name} (${account.address})`,
      })),
    },
    content: {
      label: "Contract name",
      type: "markdown",
    },
  };

  if (!data) return <Loading />;

  return (
    <FormikForm
      formSchema={formSchema}
      fields={fields}
      initialValues={data}
      onSubmit={onSubmit}
      isSubmitted={isSubmitted}
    />
  );
};
