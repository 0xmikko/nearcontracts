import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Form, Col, FormLabel, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { ErrorMessage, Field, FieldProps } from "formik";
import AceEditor from "react-ace";
import ReactMarkdown from "react-markdown";

interface MarkdownFieldProps {
  name: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

export const MarkdownField: React.FC<MarkdownFieldProps> = ({
  name,
  label,
  value,
  onChange,
}) => {
  const [text, setText] = useState(value || '');

  const update = (text: string) => {
    setText(text);
    onChange(text);
  };

  return (
    <Field placeholder={label} name={name}>
      {({
        field, // { name, value, onChange, onBlur }
      }: // form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      // meta,
      FieldProps) => (
        <Row>
          <Col lg={4} xl={6} md={6}>
            <AceEditor
              mode="markdown"
              theme="github"
              onChange={update}
              value={text}
              name={name}
              highlightActiveLine={true}
              // editorProps={{ $blockScrolling: true }}
            />
          </Col>
          <Col sm={6} lg={6} xl={6} md={6}>
            <ReactMarkdown source={text} />
          </Col>
        </Row>
      )}
    </Field>
  );
};
