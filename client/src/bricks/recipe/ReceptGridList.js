import React from "react";
import Recept from "./Recept";

function ReceptGridList(props) {

  return (
      <div class="row">
        {props.receptList.map((recept) => {
          return (
              <div
                  class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
                  style={{ paddingBottom: "16px" }}
              >
                <Recept key={recept.id} recept={recept} ingredientlist={props.ingredientList} />
              </div>
          );
        })}
      </div>
  );
  // return props.receptList.map((recept) => {
  //   return <Recept key={recept.id} recept={recept} ingredientlist={props.ingredientList} />;
  // });
}

export default ReceptGridList;