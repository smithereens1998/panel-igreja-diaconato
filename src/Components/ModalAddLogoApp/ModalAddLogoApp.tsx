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
  Avatar
  
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { useState , useContext } from "react";
import AppContext from "@/Context/AppContext";
import styles from "@/styles/ModalAddLogo.module.css";
import sizeOf from 'image-size';
import { useToast } from "@chakra-ui/react";

export default function ModalAddLogoApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {imageLogo, setImageLogo}= useContext(AppContext);
  const toast = useToast()
  
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleDrop = (event:any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImage(file);
  };

  const handleImageChange = (event:any) => {
    const selectedImage = event.target.files[0];
    handleImage(selectedImage);
  };

  const handleImage = async (selectedImage:any) => {
    const reader = new FileReader();
  
    reader.onload = async () => {
      if (reader.readyState === 2) {
        const result = reader.result;
  
        if (result && typeof result === 'string') {
          try {
            const response = await fetch('/api/getImageSize', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ imageUrl: result }),
            });
  
            if (!response.ok) {
              throw new Error(`Erro ao chamar API de dimensões da imagem. Status: ${response.status}`);
            }
  
            const dimensions = await response.json();
  
            console.log('Dimensões da imagem:', dimensions);
          } catch (error) {
            console.error('Erro ao chamar API de dimensões da imagem:', error);
          }
  
          setImageLogo((prevImage:any) => result || prevImage);
          console.log('Verificando se está em base64 a logo', result);
        } else {
          console.error('O resultado não é uma string válida:', result);
        }
      }
    };
  
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };
  const handleDragOver = (event:any) => {
    event.preventDefault();
  };


  
  function reloadReq () {
    location.reload();
  }


  const upLogo = async () => {
    try {
      // Check admin credentials
      const response = await fetch('https://boxer-relieved-impala.ngrok-free.app/servico/upLogo', {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          ID: localStorage.getItem('IdUserUpLogo'),
          LOGO: imageLogo 
        
        }),
      });
  
      const data = await response.json();
      console.log(data);
      if(data.message.includes("Logo atualizada com sucesso")) {
        toast({
          title: "Sucesso",
          description: "Logo atualizada com sucesso",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "bottom-left",
        });
        onClose();
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
        description: "Essa imagem é muito pesada!",
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

        className={styles.openButtonLogo}
      >
        <IoMdAdd size={25} color="white" />
        Adicionar Logo no App
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Logo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            

            {/* <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl> */}
            <div
            className={styles.editInputImgFile}
              
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >



              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="file-input"
              />
              <label htmlFor="file-input">
               
                <Avatar
                size='2xl'
                  // className={styles.avatarEdit}
                 
                  // name="profile-image"
                  src={imageLogo || 'https://bit.ly/broken-link/150'}
                  cursor="pointer"
                />
              </label>


              <div>
                <span className={styles.textArea} > Arraste e solte a imagem aqui ou clique ao lado para selecionar</span>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=> {
              upLogo()
            }} colorScheme="black" variant={'solid'}  mr={3} style={{backgroundColor: "black" , color: 'white' , fontWeight: 'bold'}} >
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
