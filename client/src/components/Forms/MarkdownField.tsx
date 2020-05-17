import React, { Component, useState } from "react";
import { Field, FieldProps } from "formik";

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import {convertMarkdown} from "../../core/milestone";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
// function handleEditorChange({html, text}) {
//   console.log('handleEditorChange', html, text)
// }


interface MarkdownFieldProps {
  name: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

interface onChangeFunc {
  html: string,
  text: string
}
export const MarkdownField: React.FC<MarkdownFieldProps> = ({
  name,
  label,
  value,
  onChange,
}) => {
  const [text, setText] = useState(value || "");

  const update = ({html, text}: onChangeFunc) => {
    setText(text);
    onChange(text);
  };

  return (
    <Field placeholder={label} name={name}>
      {({
        field// { name, value, onChange, onBlur }
      }: // form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      // meta,
      FieldProps) => (
          <MdEditor
              value={text}
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(convertMarkdown(text))}
              onChange={update}
              name={name}
          />

        // <Container fluid>
        //   <Row>
        //     <Col lg={6} xl={6} md={6}>
        //       <AceEditor
        //         mode="markdown"
        //         theme="github"
        //         onChange={update}
        //         value={text}
        //         name={name}
        //         highlightActiveLine={true}
        //         // editorProps={{ $blockScrolling: true }}
        //       />
        //     </Col>
        //     <Col sm={6} lg={6} xl={6} md={6}>
        //       <ContractMarkdown source={text} />
        //     </Col>
        //   </Row>
        // </Container>
      )}
    </Field>
  );
};
