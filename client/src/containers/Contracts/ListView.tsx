/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from "react";
import { Table } from "react-bootstrap";
import { Contract } from "../../core/contract";
import { DataScreenComponentProps } from "../../components/DataLoader/DataScreen";

export const ContractsList: React.FC<DataScreenComponentProps<Contract[]>> = ({
  data,
  onSelect,
}) => {

  const onPressed = (id: string) => {
    if (onSelect) {
      onSelect(id);
    }
  }

  const renderLine = (h: Contract) => (
    <tr onClick={() => onPressed(h.id)} key={h.id}>
      <td className="tx-color-03 text-left tx-normal">{h.name}</td>
      <td className="tx-medium text-left">{h.partnerID}</td>
      <td className="tx-medium text-left">{h.date}</td>
    </tr>
  );
  // tx-teal tx-pink
  const renderTableContent = data.map((h) => renderLine(h));

  return (
    <div className="card card-dashboard-table mg-t-20">
      {/*<!-- card-body -->}*/}
      <div className="table-responsive">
        <Table className="table-dashboard mg-b-0" hover={true}>
          <thead>
            <tr>
              <th style={{ width: "25%" }}>Name</th>

              <th>Description</th>
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
