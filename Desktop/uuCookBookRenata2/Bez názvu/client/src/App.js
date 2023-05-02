import './App.css';
import { useEffect, useState } from "react";
import ReceptInfo from "./bricks/ReceptInfo";
import ReceptList from "./bricks/ReceptList";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/cookbooke.module.css";

function App() {
  const [cookbookLoadCall, setCookbookLoadCall] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/cookbook/load?id=${"f780b198cf290778"}`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setCookbookLoadCall({ state: "error", error: responseJson });
      } else {
        setCookbookLoadCall({ state: "success", data: responseJson });
      }
    });
  }, []);

  function getIngredients() {
    switch (cookbookLoadCall.state) {
      case "pending":
        return (
          <div className={styles.loading}>
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
        return (
          <>
            <ReceptInfo cookbook={cookbookLoadCall.data} />
            <ReceptList receptList={cookbookLoadCall.data} />
          </>
        );
      case "error":
        return (<div className={styles.error}>
          <div>Nepodařilo se načíst data o třídě.</div>
          <br />
          <pre>{JSON.stringify(cookbookLoadCall.error, null, 2)}</pre>
        </div>
      );
    default:
      return null;
  }
}

return <div className="App">{getIngredients()}</div>;
}

export default App;