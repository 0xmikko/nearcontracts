import React from "react";
import ReactMarkdown from "react-markdown";
import {convertMarkdown} from "../../core/milestone";

export interface ContractMarkdownProps {
  source: string;
}

export const ContractMarkdown: React.FC<ContractMarkdownProps> = ({ source }) => {

    const contractEmbeddedSource = convertMarkdown(source);
    return <ReactMarkdown source={contractEmbeddedSource} />
};
