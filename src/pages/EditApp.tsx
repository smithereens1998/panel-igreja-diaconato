import { Button, useDisclosure , useToast } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";

import { useState, useContext, useEffect } from "react";
import AppContext from "@/Context/AppContext";
import styles from "@/styles/EditApp.module.css";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import ModalAddLogoApp from "@/Components/ModalAddLogoApp/ModalAddLogoApp";
import ModalAddCarouselHome from "@/Components/ModalAddCarouselHome/ModalAddCarouselHome";
import { Navigationmobile } from "@/Components/NavigationMobile/NavigationMobile";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { ImgsPropsCarousel } from "@/Context/Provider";
import ModalRemovePhoto from "@/Components/ModalRemovePhoto/ModalRemovePhoto";
import { useRouter } from "next/router";


export default function EditApp() {
  const { img1, setImg1 } = useContext(AppContext);
  const { img2, setImg2 } = useContext(AppContext);
  const { img3, setImg3 } = useContext(AppContext);
  const { img4, setImg4 } = useContext(AppContext);
  const { getImgsCarouselRender, setGetImgsCarouselRender } =
    useContext(AppContext);
  const [galleryImages, setGalleryImages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
  const { usuario, setUsuario } = useContext(AppContext);
  const { senha, setSenha } = useContext(AppContext);
  const router = useRouter()

  useEffect(() => {
    const savedUser = localStorage.getItem("e_m");
    const savedPassword = localStorage.getItem("p_s");
    if (!savedUser  || !savedPassword) {
      router.push('/NotFound');
    }
  }, [ router]);
  


  useEffect(() => {
    const savedUserAdm = localStorage.getItem("r_m");
    const savedPasswordAdm = localStorage.getItem("r_s");
    if (!savedUserAdm  || !savedPasswordAdm) {
      router.push('/NotFound');
    }
  }, [ router]);

  useEffect(() => {
    console.log("Valor de img1 ", img1);
  });

  useEffect(() => {
    //console.log('Renderizando o barbeiro selecionado na tela de agendamento', selectedBarber);
    getImgsCarousel();
  }, []);

  const getImgsCarousel = async () => {
    try {
      const response = await fetch(
        "https://boxer-relieved-impala.ngrok-free.app/servico/getImgGallery"
      );
      const data = await response.json();
      if (data.message === "sucesso" && data.imgs.length > 0) {
        console.log("Verificando dados vindo da api ", data.imgs[0].IMG1);
        const requestServico = data.imgs.map((ImgsPropsCarousel: any) => {
          return {
            ID: ImgsPropsCarousel.ID,
            IMG1: ImgsPropsCarousel.IMG1 || "", // Verifica se IMG1 é undefined e atribui uma string vazia
            IMG2: ImgsPropsCarousel.IMG2 || "", // Verifica se IMG2 é undefined e atribui uma string vazia
            IMG3: ImgsPropsCarousel.IMG3 || "", // Verifica se IMG3 é undefined e atribui uma string vazia
            IMG4: ImgsPropsCarousel.IMG4 || "", // Verifica se IMG4 é undefined e atribui uma string vazia
          };
        });

        setGetImgsCarouselRender([...requestServico]);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };





  const RemovePhoto1 = async () => {
    try {
      // Check admin credentials
      const response = await fetch('https://boxer-relieved-impala.ngrok-free.app/servico/removePhotoCarousel', {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          ID: localStorage.getItem('IdUserUpLogo'),
        }),
      });
  
      const data = await response.json();
      console.log(data);
      if(data.message.includes("Imagem 1 removida com sucesso")) {
        toast({
          title: "Sucesso",
          description: "Imagem removida com sucesso",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "bottom-left",
        });
        onClose();
        reloadReq()
      }  else {
        toast({
          title: "Erro",
          description: "Erro ao remover a foto",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-left",
        });
      }
        
     
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Erro ao remover a foto",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  
  const RemovePhoto2 = async () => {
    try {
      // Check admin credentials
      const response = await fetch('https://boxer-relieved-impala.ngrok-free.app/servico/removePhotoCarousel2', {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          ID: localStorage.getItem('IdUserUpLogo'),
        }),
      });
  
      const data = await response.json();
      console.log(data);
      if(data.message.includes("Imagem 2 removida com sucesso")) {
        toast({
          title: "Sucesso",
          description: "Imagem removida com sucesso",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "bottom-left",
        });
        onClose();
        reloadReq()
      }  else {
        toast({
          title: "Erro",
          description: "Erro ao remover a foto",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-left",
        });
      }
        
     
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Erro ao remover a foto",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const RemovePhoto3 = async () => {
    try {
      // Check admin credentials
      const response = await fetch('https://boxer-relieved-impala.ngrok-free.app/servico/removePhotoCarousel3', {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          ID: localStorage.getItem('IdUserUpLogo'),
        }),
      });
  
      const data = await response.json();
      console.log(data);
      if(data.message.includes("Imagem 3 removida com sucesso")) {
        toast({
          title: "Sucesso",
          description: "Imagem removida com sucesso",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "bottom-left",
        });
        onClose();
        reloadReq()
      }  else {
        toast({
          title: "Erro",
          description: "Erro ao remover a foto",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-left",
        });
      }
        
     
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Erro ao remover a foto",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const RemovePhoto4 = async () => {
    try {
      // Check admin credentials
      const response = await fetch('https://boxer-relieved-impala.ngrok-free.app/servico/removePhotoCarousel4', {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          ID: localStorage.getItem('IdUserUpLogo'),
        }),
      });
  
      const data = await response.json();
      console.log(data);
      if(data.message.includes("Imagem 4 removida com sucesso")) {
        toast({
          title: "Sucesso",
          description: "Imagem removida com sucesso",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "bottom-left",
        });
        onClose();
        reloadReq()
      }  else {
        toast({
          title: "Erro",
          description: "Erro ao remover a foto",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-left",
        });
      }
        
     
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Erro ao remover a foto",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };


  function reloadReq() {
    location.reload();
  }






  return (
    <>
      <Navigationmobile />
      <div className={styles.editContainerApp}>
        <div className={styles.containerEditTitle}>
          <h1 className={styles.titleEdit}>Personalize seu Aplicativo</h1>
        </div>

        <div className={styles.containerTitleAndImage}>
          <Image
            // src="/logo-teste.png"
            // src={"https://untraditionalmedia.com/wp-content/uploads/2019/07/shutterstock_384669169.jpg"}
            src={
              "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={300}
            height={300}
            alt="Card de serviço 1"
            className={styles.imgCardAbout}
          />
          <div className={styles.contextAbout}>
            <p className={styles.textAbout}>
              A{" "}
              <span style={{ color: "black", fontWeight: "bold" }}>
                Versatilidade{""}
              </span>{" "}
              do painel administrativo se estende à capacidade de adicionar
              imagens de forma rápida e simples. Seja para banners promocionais
              ou ilustrações dentro do aplicativo, os administradores podem
              fazer upload e gerenciar esses elementos visuais com facilidade.
              Isso oferece uma flexibilidade valiosa para manter o conteúdo
              visual sempre atualizado.
            </p>
          </div>
        </div>
        <div className={styles.containerTitleAndImage}>
          <div className={styles.contextAbout}>
            <p className={styles.textAbout}>
              Controle total em suas mãos, sempre explorando a{" "}
              <span style={{ color: "black", fontWeight: "bold" }}>
                criatividade
              </span>{" "}
              do cliente e a{" "}
              <span style={{ color: "Black", fontWeight: "bold" }}>
                experiência{" "}
              </span>{" "}
              do usuário
            </p>
          </div>
          <Image
            // src="/logo-teste.png"
            src={
              "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={300}
            height={300}
            alt="Card de serviço 1"
            className={styles.imgCardAbout}
          />
        </div>
        <div className={styles.containerImgTextAndAnimation}>
          {/* <Link href={"#add"}> */}
          <a href="#add">
            <div className={styles.arrowIcon}>
              <MdOutlineKeyboardDoubleArrowDown
                color="black"
                size={60}
                cursor={"pointer"}
                // onClick={scrollToSection}
              />
            </div>
          </a>
          {/* </Link> */}
        </div>

        <section className={styles.sectionButtons} id="add">
          <div className={styles.containerButtonsModalsAdd}>
            <ModalAddLogoApp />
          </div>
          <div className={styles.containerButtonsModalsAdd}>
            <ModalAddCarouselHome />
          </div>
        </section>
        <div className={styles.containerGalleryPhotos}>
          <h1 className={styles.titlePhotosSaved}>Ultimas fotos salvas</h1>
          {getImgsCarouselRender.map((item: ImgsPropsCarousel) => {
            return (
              <div key={item.ID} className={styles.containerPhotos}>
                <div className={styles.containerImgButtonGallery}>
                  <Image
                    width={400}
                    height={400}
                    src={item.IMG1 || "/walper.png"}
                    alt="imagem 1 do carousel do aplicativo "
                    className={styles.imgEnvEdit}
                  />
                  <ModalRemovePhoto onSave={(()=> {
                    onOpen()
                    RemovePhoto1()
                  })} />
                </div>
                <div className={styles.containerImgButtonGallery}>
                  <Image
                    width={400}
                    height={400}
                    src={item.IMG2 || "/walper.png"}
                    alt="imagem 2 do carousel do aplicativo"
                    className={styles.imgEnvEdit}
                  />
                  <ModalRemovePhoto onSave={(()=> {
                    onOpen()
                    RemovePhoto2()
                  })}
                  
                  />
                </div>
                <div className={styles.containerImgButtonGallery}>
                  <Image
                    width={400}
                    height={400}
                    src={item.IMG3 || "/walper.png"}
                    alt="imagem 3 do carousel do aplicativo "
                    className={styles.imgEnvEdit}
                  />
                  <ModalRemovePhoto 
                  onSave={(()=> {
                    onOpen()
                    RemovePhoto3()
                  })}
                  />
                </div>
                <div className={styles.containerImgButtonGallery}>
                  <Image
                    width={400}
                    height={400}
                    src={item.IMG4 || "/walper.png"}
                    alt="imagem 4 do carousel do aplicativo "
                    className={styles.imgEnvEdit}
                  />
                  <ModalRemovePhoto onSave={(()=> {
                    onOpen()
                    RemovePhoto4()
                  })}
                  
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
