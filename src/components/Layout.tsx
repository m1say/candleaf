import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/dist/client/router";
import styles from "./Layout.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const route = useRouter();
  const full = route.pathname === "/";

  return (
    <div className={styles["layout"]}>
      <div>
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
