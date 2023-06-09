import styles from "../css/cookbooke.module.css";

function Home() {
    return <div className={styles.home}>
        <h1>Vítejte v aplikaci Kuchařka!</h1>
        <p>
            Tato aplikace slouží k evidenci receptů a ingrediencí.

        </p>
    </div>;

}

export default Home;