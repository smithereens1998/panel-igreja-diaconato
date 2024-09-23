import { Switch, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setDarkModeState, selectDarkModeState } from "@/store/DarkModeSlice";

export default function DarkMode() {

  const dispatch = useDispatch();//função de disparo das actions dos reducers
  const darkModeState = useSelector(selectDarkModeState); // estado inicial "light"

  /* dentro do hooks useEffect tem uma variável "themeFromLocalStorage" 
  tem como objetivo pegar as classes salvas no localStorage, logo após com uma validação obtendo o valor do localStorage
  é executado uma ação com o dispatch com "setDarkModeState(themeFromLocalStorage)" passando como paramentro o valor que está
  vindo do localStorage   
  */
  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem("temaDarkMode");
    if (themeFromLocalStorage) {
      dispatch(setDarkModeState(themeFromLocalStorage));//dispara a action do reducers com "darkModeState(themeFromLocalStorage)" passando por paramentro a varaivel que busca o valor no localStorage
    }
  }, [dispatch]);// toda vez que renderizado a tela é executado a ação do reducers com o "dispatch"

  //função do evento onChange() que é executada toda vez ao mudar o switch DarkMode
  const handleThemeChange = () => {
    const newTheme = darkModeState === "light" ? "dark" : "light";//passando uma nova chamada do thema armazenando o estado inicial "darkModeState" e validando com ternário 
    localStorage.setItem("temaDarkMode", newTheme); //salvando no localStorage "newTheme"
    dispatch(setDarkModeState(newTheme)); // quando o switch é clicado é executado o onChange logo acontece o disparo das action do reducers setando no parametro newTheme que está sendo salvo no localStorage
  };

  return (
    <Stack align="center" direction="row">
      <Switch
      // `${darkModeState === "dark" ? styles.navDark : styles.nav} ${styles.openMenu}  ${styles.darkDisabledInvisible}    `}
        className={`${darkModeState === "dark" ? styles.dark : styles.light}`}
        id="isFocusable"
        isFocusable
        size="lg"
        colorScheme="linkedin"
        onChange={handleThemeChange}
        isChecked={darkModeState === "dark"}
      />
    </Stack>
  );
}
