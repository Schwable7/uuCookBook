import React from "react";
import Recept from "./Recept";

function ReceptGridList(props) {
  return props.receptList.map((recept) => {
    return <Recept key={recept.id} recept={recept} />;
  });
}

export default ReceptGridList;