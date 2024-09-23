import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "@/store/store";
import DarkMode from "@/Components/DarkMode/DarkMode";
import Provider from "@/Context/Provider";
import { ChakraProvider } from "@chakra-ui/react";
// import { Navigationmobile } from "@/Components/NavigationMobile/NavigationMobile";
// import Navigation from "@/Components/Navigation/Navigation";
import ThemeProvider from "@/Components/ThemeProvider";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Provider>
        <ThemeProvider>
          <div>
            {/* <Navigationmobile /> */}
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </Provider>
    </ChakraProvider>

  );
};

export default wrapper.withRedux(App);
