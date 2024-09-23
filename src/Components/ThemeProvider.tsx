import { useEffect } from 'react';
import { extendTheme ,ChakraProvider} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectDarkModeState } from '@/store/DarkModeSlice';

/*children: Esta propriedade é do tipo React.ReactNode. Em React, ReactNodeé um tipo usado para representar os filhos de um componente React. Pode ser um único elemento React ou uma matriz de elementos React, ou pode ser uma string ou número. Essencialmente, representa o conteúdo que 
será renderizado entre as tags de abertura e fechamento do ThemeProvidercomponente.*/
interface ThemeProviderProps {
  children: React.ReactNode;
}


const ThemeProvider = ({children}:ThemeProviderProps ) => {
  const darkModeState = useSelector(selectDarkModeState);

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: darkModeState === 'light' ? 'white' : '#1a202c',
          color: darkModeState === 'light' ? 'black' : 'white',
        },
      },
    },
  });

  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem('temaDarkMode');
    if (themeFromLocalStorage) {
      localStorage.removeItem('chakra-ui-color-mode')
      
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
};

export default ThemeProvider;