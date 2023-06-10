import React from "react";
import styles from "../../css/cookbooke.module.css";

class ReceptInfo extends React.Component {
    render() { 
    return (
    <h1>
        Kniha {" "}
        <span className={styles.cookbookNameHeader}>
        {this.props.cookbook.name}
        </span>
        </h1>
        );
}
}    
export default ReceptInfo;