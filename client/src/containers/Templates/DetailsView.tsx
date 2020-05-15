/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Template} from '../../core/template';
import {TotalBar} from '../Bonds/TotalBar';
import {Col, Container, Row} from 'react-bootstrap';
import {useHistory} from 'react-router';
import {InfoWidget} from './InfoWidget';

interface TemplateDetailsProps {
  data: Template;
}

export const DetailsView: React.FC<TemplateDetailsProps> = ({
  data,
}: TemplateDetailsProps) => {
  const history = useHistory();

  const onBondSelected = (id: string) => {
    history.push('/bonds/' + id);
  };

  return (
    <Container className="pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-30-f">
      <Row style={{marginTop: '20px'}}>
        <Col lg={8} md={8} xs={12}>
          {data.content}
        </Col>
        <Col lg={4} md={4} xs={12}>
          <InfoWidget data={data} />
        </Col>
      </Row>
    </Container>
  );
};
