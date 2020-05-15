/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from "react";
import * as yup from "yup";
import {
  FormikForm,
  FormikFormViewProps,
} from "../../components/Forms/FormikForm";
import { Template } from "../../core/template";
import { Loading } from "../../components/Loading";

const formSchema = yup.object({
  name: yup.string().required(),
});

interface FormViewProfileProps extends FormikFormViewProps<Template> {}

export const FormView: React.FC<FormViewProfileProps> = ({
  data,
  onSubmit,
  isSubmitted,
}) => {
  const fields = {
    name: {
      label: "Template name",
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
