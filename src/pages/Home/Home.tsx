import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import styles from "./Home.module.scss";
import SubscribeInner from "src/components/SubscribeInner/SubscribeInner";

const Home = () => {
    return (
        <div className={styles.containerPagesContainer}>
            <Header />

            <div className={styles.outlet}>
                {/* <div className={styles.outletContainer}> */}
                    <Outlet />
                {/* </div> */}
            </div>
            <SubscribeInner />

            <Footer />
        </div>
    );
};

export default Home;
