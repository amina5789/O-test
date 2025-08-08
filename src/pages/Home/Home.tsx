import React, { useRef } from "react";
import styles from "./Home.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import PdfViewer from "../../components/PdfViewer/PdfViewer";

const Home: React.FC = () => {
  const fetchFoldersRef = useRef<() => void>(() => {});

  return (
    <div className={styles.container}>
      <Topbar />
      <div className={styles.body}>
        <Sidebar
          onFoldersUpdate={(fetchFn) => {
            console.log("✅ fetchFolders получен в Home");
            fetchFoldersRef.current = fetchFn;
          }}
        />

        <PdfViewer />
      </div>
    </div>
  );
};

export default Home;
