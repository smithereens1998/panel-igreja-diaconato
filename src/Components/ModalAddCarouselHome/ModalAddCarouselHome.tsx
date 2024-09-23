import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Avatar,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { useState, useContext } from "react";
import AppContext from "@/Context/AppContext";
import styles from "@/styles/ModalAddCarouselHome.module.css";
import sizeOf from "image-size";
import { useToast } from "@chakra-ui/react";
import Image from "next/image";
export default function ModalAddCarouselHome() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { img1, setImg1 } = useContext(AppContext);
  const { img2, setImg2 } = useContext(AppContext);
  const { img3, setImg3 } = useContext(AppContext);
  const { img4, setImg4 } = useContext(AppContext);
  const toast = useToast();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleDrop1 = (event: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImage(file, setImg1);
  };
  
  const handleDrop2 = (event: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImage(file, setImg2);
  };
  
  const handleDrop3 = (event: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImage(file, setImg3);
  };
  
  const handleDrop4 = (event: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImage(file, setImg4);
  };
  const handleImageChange1 = (event: any) => {
    const selectedImage = event.target.files[0];
    handleImage(selectedImage, setImg1);
  };
  
  const handleImageChange2 = (event: any) => {
    const selectedImage = event.target.files[0];
    handleImage(selectedImage, setImg2);
  };
  
  const handleImageChange3 = (event: any) => {
    const selectedImage = event.target.files[0];
    handleImage(selectedImage, setImg3);
  };
  
  const handleImageChange4 = (event: any) => {
    const selectedImage = event.target.files[0];
    handleImage(selectedImage, setImg4);
  };
  









  const handleImage = async (selectedImage: any, setImage: any) => {
    const reader = new FileReader();
  
    reader.onload = async () => {
      if (reader.readyState === 2) {
        const result = reader.result;
  
        if (result && typeof result === "string") {
          try {
            const response = await fetch("/api/getImageSize", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ imageUrl: result }),
            });
  
            if (!response.ok) {
              throw new Error(
                `Erro ao chamar API de dimensões da imagem. Status: ${response.status}`
              );
            }
  
            const dimensions = await response.json();
  
            console.log("Dimensões da imagem:", dimensions);
          } catch (error) {
            console.error(
              "Erro ao chamar API de dimensões da imagem:",
              error
            );
          }
  
          setImage((prevImage: any) => result || prevImage);
          console.log("Verificando se está em base64 a logo", result);
        } else {
          console.error("O resultado não é uma string válida:", result);
        }
      }
    };
  
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };
  
  
  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  function reloadReq() {
    location.reload();
  }


  const upImgCarousel = async () => {
    try {
      // Check admin credentials
      const response = await fetch('https://boxer-relieved-impala.ngrok-free.app/servico/upCarousel', {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          ID: localStorage.getItem('IdUserUpLogo'),
          IMG1: img1,
          IMG2: img2,
          IMG3: img3,
          IMG4: img4,
         
        
        }),
      });
  
      const data = await response.json();
      console.log(data);
      if(data.message.includes("Imagens atualizada com sucesso")) {
        toast({
          title: "Sucesso",
          description: "Imagens atualizada com sucesso",
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
          description: "Erro ao atualizar a logo!",
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
        description: "Alguma das imagens é muito pesada!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  



  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Button
        onClick={onOpen}
        marginRight={"1vw"}
        variant={"solid"}
        style={{
          
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <IoMdAdd size={25} color="white" />
        Adicionar Imagens no App
      </Button>

      <Modal
      // size={"xs"}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Imagens</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} style={{ overflowY: 'auto', maxHeight: '60vh' }} >
            {/* <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl> */}
            <div>
                <span className={styles.textArea}>
                  {" "}
                  Arraste e solte a imagem aqui ou clique abaixo para
                  selecionar a <span style={{color: 'black' , fontWeight: 'bold'}} >imagem 1</span> 
                </span>
              </div>
              
              
              
            <div
              className={styles.editInputImgFile}
              onDrop={handleDrop1}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange1}
                style={{ display: "none" }}
                id="file-input"
              />
              <label htmlFor="file-input">
                {/* <Avatar
                  size="2xl"
                  // className={styles.avatarEdit}

                  // name="profile-image"
                  src={image || "https://bit.ly/broken-link/150"}
                  cursor="pointer"
                /> */}
                
                  <Image
                    width={400}
                    height={400}
                    src={img1 || "/walper.png"}
                  alt="imagem 1 do carousel do aplicativo "
                  className={styles.imgEnv}
                  />
                  
                
              </label>

              
            </div>


            <div>
                <span className={styles.textArea}>
                  {" "}
                  Arraste e solte a imagem aqui ou clique ao lado para
                  selecionar <span style={{color: 'black' , fontWeight: 'bold'}} >imagem 2</span> 
                </span>
              </div>  
            <div
              className={styles.editInputImgFile}
              onDrop={handleDrop2}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange2}
                style={{ display: "none" }}
                id="file-input2"
              />
              <label htmlFor="file-input2">
                <Image
                  width={400}
                  height={400}
                  src={img2 || "/walper.png"}
                alt="imagem 2 do carousel do aplicativo "
                className={styles.imgEnv}
                />
              </label>

              
            </div>
            <div>
                <span className={styles.textArea}>
                  {" "}
                  Arraste e solte a imagem aqui ou clique ao lado para
                  selecionar <span style={{color: 'black' , fontWeight: 'bold'}} >imagem 3</span> 
                </span>
              </div>  
            <div
              className={styles.editInputImgFile}
              onDrop={handleDrop3}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange3}
                style={{ display: "none" }}
                id="file-input3"
              />
              <label htmlFor="file-input3">
                <Image
                  width={400}
                  height={400}
                  src={img3 || "/walper.png"}
                alt="imagem 3 do carousel do aplicativo "
                className={styles.imgEnv}
                />
              </label>

              
            </div>
            <div>
                <span className={styles.textArea}>
                  {" "}
                  Arraste e solte a imagem aqui ou clique ao lado para
                  selecionar <span style={{color: 'black' , fontWeight: 'bold'}} >imagem 4</span> 
                </span>
              </div>  
            <div
              className={styles.editInputImgFile}
              onDrop={handleDrop4}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange4}
                style={{ display: "none" }}
                id="file-input4"
              />
              <label htmlFor="file-input4">
                <Image
                  width={400}
                  height={400}
                  src={img4 || "/walper.png"}
                alt="imagem 4 do carousel do aplicativo "
                className={styles.imgEnv}
                />
              </label>

              
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                upImgCarousel()
              }}
              colorScheme="black"
              variant={"solid"}
              mr={3}
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
