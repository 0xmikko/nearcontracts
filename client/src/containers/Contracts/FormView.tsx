/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React, { useState } from "react";
import * as yup from "yup";
import {
  FormikForm,
  FormikFormViewProps,
} from "../../components/Forms/FormikForm";
import { Contract } from "../../core/contract";
import { Loading } from "../../components/Loading";

const formSchema = yup.object({
  name: yup.string().required().min(3),
});

interface FormViewProfileProps extends FormikFormViewProps<Contract> {}

export const FormView: React.FC<FormViewProfileProps> = ({
  data,
  onSubmit,
  isSubmitted,
}) => {
  const fields = {
    name: {
      label: "Contract name",
    },
    partner: {
      label: "Partner",
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
