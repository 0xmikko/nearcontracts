import React from "react";
import ReactMarkdown from "react-markdown";

export interface ContractMarkdownProps {
  source: string;
}

export const ContractMarkdown: React.FC<ContractMarkdownProps> = ({ source }) => {


    return <ReactMarkdown source={source} />
};
