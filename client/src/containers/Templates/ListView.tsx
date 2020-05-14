/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Table} from 'react-bootstrap';
import {Template} from '../../core/template';

interface TemplatesListProps {
  items: Template[];
  onItemSelected: (id: string) => void;
}

export const TemplatesList: React.FC<TemplatesListProps> = ({
  items,
  onItemSelected,
}: TemplatesListProps) => {
  const renderLine = (h: Template) => (
    <tr onClick={() => onItemSelected(h.id)} key={h.id}>
      <td className="tx-color-03 text-left tx-normal">{h.name}</td>
      <td className="tx-medium text-left">{h.description}</td>
      <td className="tx-medium text-left">{h.signed}</td>
    </tr>
  );
  // tx-teal tx-pink
  const renderTableContent = items.map(h => renderLine(h));

  return (
    <div className="card card-dashboard-table mg-t-20">
      {/*<!-- card-body -->}*/}
      <div className="table-responsive">
        <Table className="table-dashboard mg-b-0" hover={true}>
          <thead>
            <tr>
              <th style={{width: '25%'}}>Name</th>

              <th>Descrption</th>
              <th>Signed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderTableContent}</tbody>
        </Table>
      </div>
    </div>
  );
};
