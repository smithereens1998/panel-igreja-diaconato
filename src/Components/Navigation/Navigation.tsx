// // import styles from "@/styles/Navigation.module.css";
// // import styless from '@/styles/';
// // import DarkMode from "@/Components/DarkMode/DarkMode";
// import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";
// import { setDarkModeState, selectDarkModeState } from "@/store/DarkModeSlice";

// import { Navigationmobile } from "../NavigationMobile/NavigationMobile";

// export default function Navigation() {
//   const dispatch = useDispatch(); //função de disparo das actions dos reducers
//   const darkModeState = useSelector(selectDarkModeState); // estado inicial "light"
  

//   return (
//     <>
//     <div className="navMenu" >  
//       <Navigationmobile />  

//     </div>
//       <div
//         className={`${darkModeState === "dark" ? styles.navDark : styles.nav} ${
//           styles.teste
//         }`}
//       >
//         <div className={styles.containerLogo}>
//           <Image
//             // src="/logo-teste.png"
//             src={
//               darkModeState === "dark" ? "/logo-2.webp" : "/logo-teste-2.webp"
//             }
//             width={270}
//             height={270}
//             alt="Logo Smithereens"
//             className={styles.logo}
//           />
      
//         </div>
//         <div className={styles.editList}>
//           <ul className={styles.ListItensMenu}>
//             <li className={styles.liEdit}>HOME</li>
//             <li className={styles.liEdit}>SERVIÇO</li>
//             <li className={styles.liEdit}>TIME</li>
//             <li className={styles.liEdit}>CONTATO</li>
//           </ul>
//           {/* <DarkMode /> */}
//         </div>
//       </div>
//     </>
//   );
// }
