import React from "react";
import Table from "react-bootstrap/Table";

function ReceptTableList(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nazev</th>
          <th>Instrukce</th>
        </tr>
      </thead>
      <tbody>
        {props.receptList.map((recept) => {
          return (
            <tr key={recept.id}>
              <td>{recept.receptname}</td>
              <td>{recept.description}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ReceptTableList;