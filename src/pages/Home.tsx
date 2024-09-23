import styles from "@/styles/Dashboard.module.css";
import Image from "next/image";

import { Navigationmobile } from "@/Components/NavigationMobile/NavigationMobile";
import ChartsHome from "@/Components/ChartsHome/ChartsHome";
import ChartsDesktopHome from "@/Components/ChartsDesktopHome/ChartsDesktopHome";
import { useState, useContext, useEffect } from "react";
import AppContext from "@/Context/AppContext";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";

export default function Home() {
  const { usuario, setUsuario } = useContext(AppContext);
  const { senha, setSenha } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("e_m");
    const savedPassword = localStorage.getItem("p_s");
    if (!savedUser || !savedPassword ) {
      router.push("/NotFound");
    }
  }, [router]);

  return (
    <>
      <Navigationmobile />
      <div className={styles.containerPrincipalDash}>
      <div className={styles.containerImageBetesda}>
          {/* <img  className='logo' src="/logo-mac.svg" alt="" /> */}
          <Image
            src={"/logo-diaconato-canva.png"}
            alt="Logo da Igreja"
            width={300}
            height={300}
            // style={{ borderRadius: "7vw" }}
          />
        </div>

        <h1 className={styles.dashTitle}>Coordenadoria Regional Diaconato</h1>
        

        
      </div>
    </>
  );
}
