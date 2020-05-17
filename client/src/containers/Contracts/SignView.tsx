/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from "react";
import {Button, Col, Container} from "react-bootstrap";

import { Contract } from "../../core/contract";

import { useHistory } from "react-router";
import { InfoWidget } from "./InfoWidget";
import TabsBar from "../../components/PageHeader/TabsBar";
import { TabPane } from "../../components/PageHeader/TabPane";
import {MilestonesWidget} from "../Milestones/MilestonesWidget";
import {SignWidget} from "./SignWidget";

interface ContractDetailsProps {
  data: Contract;
}

export const SignView: React.FC<ContractDetailsProps> = ({
  data,
}: ContractDetailsProps) => {
  const history = useHistory();
  const tabs: string[] = ['Contract'];

  return (
    <Container className="pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-30-f">
      <TabsBar tabs={tabs} selected={'contract'} />
      <TabPane hash={'#contract'}>
        <SignWidget data={data} />
      </TabPane>
    </Container>
  );
};

