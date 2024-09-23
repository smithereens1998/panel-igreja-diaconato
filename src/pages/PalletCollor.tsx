import { useState , useEffect , useContext } from "react";
import { BsFileEarmarkFontFill } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { BiSolidColorFill } from "react-icons/bi";
import styles from "@/styles/PalletCollor.module.css";
import Image from "next/image.js";
import { FaFacebook } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  InputGroup,
  Input,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Stack,
  useToast
} from "@chakra-ui/react";
import { useRouter } from 'next/router.js';
import { IoIosColorPalette } from "react-icons/io";
import { HiPaintBrush } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { IoExitSharp } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";
export default function PalletCollor() {
  const [isIOS, setIsIOS] = useState(false);

  const router = useRouter()
  const [textColor, setTextColor] = useState("#000000"); // Cor inicial do texto
  const [colorSec, setColorSec] = useState("#1a202c");
  const [colorFont, setColorFont] = useState("#000000"); // Cor inicial do texto
  const [colorFontContent, setColorFontContent] = useState("#000000"); // Cor inicial do texto
  const [colorForms, setColorForms] = useState("#000000"); // Cor inicial do texto
  const [cancelButton, setCancelButton] = useState(styles.offButton); // Cor inicial do texto
  const [mostrarSalvar, setMostrarSalvar] = useState(true); 
  const [logoPallet, setLogoPallet] = useState(""); 
  const toast = useToast();
 

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(userAgent.includes("iphone") || userAgent.includes("ipad"));
  }, []);


  useEffect(() => {
    const savedUserAdm = localStorage.getItem("r_m");
    const savedPasswordAdm = localStorage.getItem("r_s");
    if (!savedUserAdm  || !savedPasswordAdm) {
      router.push('/NotFound');
    }
  }, [ router]);
  const getImgsLogo = async () => {
    try {
      const response = await fetch(
        "https://boxer-relieved-impala.ngrok-free.app/servico/getImgGallery"
      );
      const data = await response.json();
      console.log("Verificandoa se a logoLogin esta vindo ", logoPallet);
      setLogoPallet(data.imgs[0].LOGO);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {

    const storedTextColor = localStorage.getItem("corSecundaria");
    const storedColorSec = localStorage.getItem("corPrimaria");
    const storedColorFont = localStorage.getItem("CorTitulo");
    const storedColorFontContent = localStorage.getItem("CorConteudo");
    const storedColorForms = localStorage.getItem("CorInput");

    if (storedTextColor) setTextColor(storedTextColor);
    if (storedColorSec) setColorSec(storedColorSec);
    if (storedColorFont) setColorFont(storedColorFont);
    if (storedColorFontContent) setColorFontContent(storedColorFontContent);
    if (storedColorForms) setColorForms(storedColorForms);


    getImgsLogo();
    
  }, [logoPallet]);

  
  async function colorUpdate() {
    try {
      let push = localStorage.getItem("IdUserUpLogo");
      const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/servico/upcollor", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          ID: push,
          PRIMARYCOLLOR: colorSec,
          SECUNDARYCOLLOR: textColor,
          COLLORTITLE: colorFont,
          COLLORCONTENT: colorFontContent,
          COLLORINPUT: colorForms,
        }),
      });
      console.log(response);
      const data = await response.json();
      console.log("Verificando o Data " , data);
      if(data.message.includes("Cores atualizada com sucesso")) {
        toast({
          title: "Sucesso",
          description: "Cores atualizada com sucesso",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "bottom-left",
        });
        localStorage.setItem("corPrimaria", colorSec);
        localStorage.setItem("corSecundaria", textColor);
        localStorage.setItem("CorTitulo", colorFont);
        localStorage.setItem("CorConteudo", colorFontContent);
        localStorage.setItem("CorInput", colorForms);
      } else {
        toast({
          title: "Erro",
          description: "Houve algum erro inesperado tente novamente",
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "bottom-left",
        });
      }    
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Erro na api ao salvar as cores",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }



  const handleColorChange = (event: any) => {
    setTextColor(event.target.value); // Atualiza a cor do texto com a cor selecionada pelo usuário
  };
  const handleColorChangeContent = (event: any) => {
    setColorSec(event.target.value); // Atualiza a cor do texto com a cor selecionada pelo usuário
  };
  const handleColorChangeFont = (event: any) => {
    setColorFont(event.target.value); // Atualiza a cor do texto com a cor selecionada pelo usuário
  };
  const handleColorChangeFontContent = (event: any) => {
    setColorFontContent(event.target.value); // Atualiza a cor do texto com a cor selecionada pelo usuário
  };
  const handleColorChangeForms = (event: any) => {
    setColorForms(event.target.value); // Atualiza a cor do texto com a cor selecionada pelo usuário
  };

  const handleParagraphClick = () => {
    const colorInput = document.getElementById("colorInput");
    if (colorInput) {
      colorInput.click();
    }
  };

  const handleParagraphClickContent = () => {
    const colorInputContent = document.getElementById("colorInputContent");
    if (colorInputContent) {
      colorInputContent.click();
    }
  };
  const handleParagraphClickFont = () => {
    const colorInputFont = document.getElementById("colorInputFont");
    if (colorInputFont) {
      colorInputFont.click();
    }
  };
  const handleParagraphClickFontContent = () => {
    const colorInputFontContent = document.getElementById(
      "colorInputFontContent"
    );
    if (colorInputFontContent) {
      colorInputFontContent.click();
    }
  };
  const handleParagraphClickForms = () => {
    const colorInputForms = document.getElementById(
      "colorInputForms"
    );
    if (colorInputForms) {
      colorInputForms.click();
    }
  };


  const toggleButtonShow = textColor !== "#000000"  ||  colorSec !== "#1a202c"  || colorFont !==  "#000000" || colorFontContent !== "#000000" || colorForms !== "#000000"   ?  styles.buttonEditColorSave : styles.offButton
  function validButtonCancel () {
    if (toggleButtonShow  ) {
    setMostrarSalvar(false)

    } else
    setMostrarSalvar(true)
    
  }


  if (isIOS) {
    return (
      <div style={{ textAlign: "center", marginTop: "50vh" }}>
        <p>Edição do Aplicativo somente por desktop</p>
      </div>
    );
  }
  
  
  return (
    <>
    <div style={{overflowY: "hidden"}} >

    
    <div className={styles.containerButtonSave} >
      <Button
        className={styles.buttonEditColor}
        colorScheme="black"
        onClick={()=> {
          onOpen()
        setMostrarSalvar(true)

        }}
      >
        <FaEdit style={{ marginLeft: 5 }} size={24} color="white" />
        Clique para editar
      </Button>
      {mostrarSalvar && 
      <Button
      className={toggleButtonShow}
      colorScheme="black"
      onClick={()=> {
        colorUpdate()
      }}
    >
      <IoIosSave style={{ marginLeft: 5 }} size={24} color="white" />
      Salvar
    </Button>
      
      }
      {mostrarSalvar && 
      
      <Button
        className={toggleButtonShow}
        colorScheme="black"
   onClick={()=> {
    validButtonCancel()
   }}
      >
        <MdCancel style={{ marginLeft: 5 }} size={24} color="white" />
        Cancelar
      </Button>
      }

    </div>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader style={{backgroundColor: "black" , color: "white"}} borderBottomWidth="1px">Edite seu App</DrawerHeader>
          <DrawerBody>
            <div className={styles.containerItensMenuPrincipal}>
              <div className={styles.containerMenuItem}>
                <IoIosColorPalette size={25} color="black" />
                <p
                  onClick={() => {
                    handleParagraphClickContent();
                  }}
                  className={styles.primaryColor}
                >
                  Cor Primária
                </p>
              </div>

              <div className={styles.containerMenuItem}>
                <IoIosColorPalette size={25} color="black" />

                <p
                  onClick={() => {
                    handleParagraphClick();
                  }}
                  className={styles.primaryColor}
                >
                  Cor Secundária
                </p>
              </div>
              <div className={styles.containerMenuItem}>
                <BsFileEarmarkFontFill size={23} color="black" />

                <p
                  onClick={() => {
                    handleParagraphClickFont();
                  }}
                  className={styles.primaryColor}
                >
                  Cor da Fonte Título/Subtítulo
                </p>
              </div>
              <div className={styles.containerMenuItem}>
                <BsFileEarmarkFontFill size={23} color="black" />

                <p
                  onClick={() => {
                    handleParagraphClickFontContent();
                  }}
                  className={styles.primaryColor}
                >
                  Cor da Fonte do conteúdo
                </p>
              </div>
              <div className={styles.containerMenuItem}>
                <HiPaintBrush size={23} color="black" />

                <p
                  onClick={() => {
                    handleParagraphClickForms()
                  }}
                  className={styles.primaryColor}
                >
                  Cor Input Formulário 
                </p>
              </div>
               <a target='_blank' href="https://color.adobe.com/pt/create/color-wheel">
                <div className={styles.containerMenuItem}>
                  <BiSolidColorFill size={23} color="black" />
                  <p
                    className={styles.primaryColor}
                    >
                    Combinação de cores 
                  </p>
                </div>
              </a>
              <div onClick={() => {
                    router.push("/Home");

                  }} className={styles.containerMenuItem}>
                <IoExitSharp size={23} color="black" />

                <p
                  
                  className={styles.primaryColor}
                >
                  Sair
                </p>
              </div>     
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <div className={styles.containerPalletPrincipal}>
        {/* <p style={{ color: "black" }} onClick={handleParagraphClick}>ola</p> */}

        <div
          style={{ backgroundColor: colorSec }}
          className={styles.modelCellContainer}
        >
          <InputGroup display={"flex"} flexDirection={"column"}>
            <div
              style={{ backgroundColor: textColor }}
              className={styles.containerHeader}
            >
              <div>
                <i>
                  <FaArrowLeft size={25} color={colorFont} />
                </i>
              </div>

              <p style={{ color: colorFont }} className={styles.headerCell}>
                TELA PADRÃO
              </p>
            </div>

            <Input
              id="colorInput"
              placeholder="HEADER"
              height={70}
              className={styles.inputCollor}
              border={"none"}
              type="color"
              onChange={handleColorChange}
            />
            <Input
              id="colorInputContent"
              placeholder="HEADER"
              height={65}
              className={styles.inputCollorContent}
              border={"none"}
              type="color"
              onChange={handleColorChangeContent}
            />
            <Input
              id="colorInputFont"
              placeholder="HEADER"
              height={65}
              className={styles.inputCollorContent}
              border={"none"}
              type="color"
              onChange={handleColorChangeFont}
            />
            <Input
              id="colorInputForms"
              placeholder="HEADER"
              height={65}
              className={styles.inputCollorContent}
              border={"none"}
              type="color"
              onChange={handleColorChangeForms}
            />
            <h1 style={{ color: colorFont }} className={styles.titleEditFonte}>
              Cor Titulo/Subtitulo
            </h1>
            <p
              style={{ color: colorFontContent }}
              className={styles.colorContext}
            >
              Cor do texto de conteúdo
            </p>
            <div className={styles.containerIconsColor}>
              <i>
                <FaFacebook size={22} color={textColor} />
              </i>
              <i>
                <RiInstagramFill size={22} color={textColor} />
              </i>
              <i>
                <FaLinkedin size={22} color={textColor} />
              </i>
              <i>
                <RiTwitterXLine size={22} color={textColor} />
              </i>
            </div>
            <footer
              style={{ backgroundColor: textColor }}
              className={styles.footerColor}
            >
              <div className={styles.containerButtonColor}>
                <Button
                  className={styles.buttonEditColor}
                  colorScheme="black"
                  style={{ backgroundColor: colorSec }}
                >
                  <p style={{ color: textColor }}>Próximo</p>
                </Button>
              </div>
            </footer>
          </InputGroup>
        </div>

        {/*========================= Tela de formulario==================================*/}

        <div
          style={{ backgroundColor: colorSec }}
          className={styles.modelCellContainer}
        >
          <InputGroup display={"flex"} flexDirection={"column"}>
            <div
            
              style={{ backgroundColor: textColor }}
              className={styles.containerHeaderForms}
            >
              <div>
                <i>
                  <FaArrowLeft size={25} color={colorFont} />
                </i>
              </div>
              <p style={{ color: colorFont }} className={styles.headerCell}>
                FORMULARIO
              </p>
            </div>

            <Input
              id="colorInput"
              placeholder="HEADER"
              height={70}
              className={styles.inputCollor}
              border={"none"}
              type="color"
              onChange={handleColorChange}
            />
            <Input
              id="colorInputContent"
              placeholder="HEADER"
              height={65}
              className={styles.inputCollorContent}
              border={"none"}
              type="color"
              onChange={handleColorChangeContent}
            />
            <Input
              id="colorInputFont"
              placeholder="HEADER"
              height={65}
              className={styles.inputCollorContent}
              border={"none"}
              type="color"
              onChange={handleColorChangeFont}
            />
            <Input
              id="colorInputFontContent"
              placeholder="HEADER"
              height={65}
              className={styles.inputCollorContent}
              border={"none"}
              type="color"
              onChange={handleColorChangeFontContent}
            />
            <Input
              id="colorInputFontForms"
              placeholder="HEADER"
              height={65}
              className={styles.inputCollorContent}
              border={"none"}
              type="color"
              onChange={handleColorChangeFontContent}
            />
            
        <div className={styles.containerImage}>
        
            <div className={styles.containerLogoColor} >
              <Image
                src={logoPallet || "/walper.png"}
                alt="Logo da barbearia"
                width={100}
                height={100}
                style={{ borderRadius: "10vw" }}
                className={styles.editMobileRadius}
              />

            </div>
            {/* <h1 style={{ color: colorFont }} className={styles.titleEditFonte}>
              Formulário
            </h1> */}
        </div>  
            <div className={styles.containerFormsColor}>
              <Stack spacing={3}>
                <label style={{color: colorFontContent}} >Label-1</label>
                <Input style={{backgroundColor: colorForms}} width={"100%"} className={styles.inputForms} placeholder="medium size" size="md" />
              </Stack>
               
              <Stack spacing={3}>
                <label style={{color: colorFontContent}} >Label-2</label>
                <Input style={{backgroundColor: colorForms}} width={"100%"} className={styles.inputForms} placeholder="medium size" size="md" />
              </Stack>
              <div className={styles.containerButtonColorForms}>
                <Button
                  className={styles.buttonEditColor}
                  colorScheme="black"
                  style={{ backgroundColor: textColor , width: "75%"}}
                 size={'md'}
                >
                  <p style={{ color: colorFont }}>Entrar</p>
                </Button>
              </div>
            </div>
               
               
            
            

            <footer
              style={{ backgroundColor: textColor , opacity: 0 }}
              className={styles.footerColor}
            >
              <div className={styles.containerButtonColorForms}>
                <Button
                  className={styles.buttonEditColor}
                  colorScheme="black"
                  style={{ backgroundColor: colorSec }}
                >
                  <p style={{ color: textColor }}>Voltar</p>
                </Button>
              </div>
            </footer>
          </InputGroup>
        </div>



        {/*========================= Tela Home ==================================*/}

        <div
          style={{ backgroundColor: colorSec }}
          className={styles.modelCellContainer}
        >
          <InputGroup display={"flex"} flexDirection={"column"}>
            <div
            
              style={{ backgroundColor: textColor }}
              className={styles.containerHeaderFormsHome}
            >
              <div >
                <i>
                  <FaArrowLeft size={25} color={colorFont} />
                </i>
              </div>
              <p style={{ color: colorFont }} className={styles.headerCell}>
               HOME
              </p>
            </div>
            <div className={styles.containerLogoColorHome} >
              <p style={{fontWeight: "bold"}} >Imagens do carousel</p>
              <Image
                src={"/insert.png"}
                alt="Logo da barbearia"
                width={100}
                height={100}
              
              />

            </div>
            <div className={styles.containerContentHomeText} >  
              <h3 style={{color: colorFont}} className={styles.titleService} >Serviços</h3>
              <p style={{color:colorFontContent , fontSize: 16 }} >algo descritivo sobre serviços</p>
            </div>
            <div className={styles.containerContentHomeText} >  
              <h3 style={{color: colorFont}} className={styles.titleService} >Sobre nós</h3>
              <p style={{color:colorFontContent , fontSize: 16 }} >algo descritivo sobre sua empresa</p>
            </div>
            <div className={styles.containerContentHomeText} >  
              <h3 style={{color: colorFont}} className={styles.titleService} >Redes Sociais</h3>
              <div className={styles.containerIconsColorHome}>
              <i>
                <FaFacebook size={22} color={textColor} />
              </i>
              <i>
                <RiInstagramFill size={22} color={textColor} />
              </i>
              <i>
                <FaLinkedin size={22} color={textColor} />
              </i>
              <i>
                <RiTwitterXLine size={22} color={textColor} />
              </i>
            </div>
            </div>
            <Input
              id="colorInput"
              placeholder="HEADER"
              height={70}
              className={styles.inputCollor}
              border={"none"}
              type="color"
              onChange={handleColorChange}
            />
            <Input
              id="colorInputContent"
              placeholder="HEADER"
              height={65}
              className={styles.inputCollorContent}
              border={"none"}
              type="color"
              onChange={handleColorChangeContent}
            />
            <Input
              id="colorInputFont"
              placeholder="HEADER"
              height={65}
              className={styles.inputCollorContent}
              border={"none"}
              type="color"
              onChange={handleColorChangeFont}
            />
            <Input
              id="colorInputFontContent"
              placeholder="HEADER"
              height={65}
              className={styles.inputCollorContent}
              border={"none"}
              type="color"
              onChange={handleColorChangeFontContent}
            />
            <Input
              id="colorInputFontForms"
              placeholder="HEADER"
              height={65}
              className={styles.inputCollorContent}
              border={"none"}
              type="color"
              onChange={handleColorChangeFontContent}
            />
            
           
           <nav style={{backgroundColor: colorSec}} className={styles.containerTabsColor} >
           <i>
                <MdHome size={25} color={textColor} />
              </i>
              <i>
                <FaCalendarAlt size={25} color={textColor} />
              </i>
              <i>
                <IoMdSettings size={25} color={textColor} />
              </i>
             
           </nav>
          </InputGroup>
        </div>
       
      </div>
      <footer className={styles.footerEditColorApp}>
         <p>Versão.1.0.0</p>
         <div style={{display:'flex' , justifyContent: "center" , alignItems: "center" , gap: 7 , marginBottom: "1vw"}}>
             <a target='_blank' href="https://smithereens.com.br/">www.smithereens.com.br</a>
            </div>
      </footer>
      </div>
    </>
  );
}
