import React from "react";
import styles from "./Home.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import PdfViewer from "../../components/PdfViewer/PdfViewer";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Topbar />
      <div className={styles.body}>
        <Sidebar />
        <PdfViewer />
      </div>
    </div>
  );
};

export default Home;
