import Head from "next/head";
import styles from "@/styles/Home.module.css";
// import Navigation from '@/Components/Navigation/Navigation'
import Image from "next/image";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import Login from "./Login";
// import SectionService from '@/Sections/SectionService/SectionService';
// import SectionAbout from '@/Sections/SectionAbout/SectionAbout';



// Import the functions you need from the SDKs you need


export default function Home() {
  
  
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Controle e Personalize seu Aplicativo"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
        >
          
        </link>
         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>

        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,400;1,700&display=swap')
        </style>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.containerPrincipalHome}>
        <Login />
      </main>
    </>
  );
}
