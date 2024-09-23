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
  Textarea,
  Image
  
} from "@chakra-ui/react";
import firebase from 'firebase/app';
import 'firebase/storage';
import { StorageReference , ref , getStorage , uploadBytes  , getDownloadURL , FullMetadata } from '@firebase/storage';
import {storage , storageRef} from '../../firebase-config';

import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { useState , useContext } from "react";
import AppContext from "@/Context/AppContext";
import styles from "@/styles/ModalAddBarber.module.css";
import sizeOf from 'image-size';
import { useToast } from "@chakra-ui/react";

export default function ModalArtigo3() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image3, setImage3]= useState("");
  const [titulo3, setTitulo3] = useState("");
  const [conteudo3, setConteudo3] = useState("");
  const {URLPutArtigo3, setURLPutArtigo3} = useContext(AppContext);

  const toast = useToast()
  
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  // const handleDrop = (event:any) => {
  //   event.preventDefault();
  //   const file = event.dataTransfer.files[0];
  //   setImage3(file);
  // };


  async function createArtigo3() {
    try {
      if (titulo3 === '' || conteudo3 === '') {
        toast({
          title: "Erro",
          description: "Preencha todos os campos!",
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "bottom-left",
        });
        return; 
      }
   
      
      const response = await 
      // `https://boxer-relieved-impala.ngrok-free.app/allDiaconato/upArtigo`
      fetch(`${URLPutArtigo3}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          TITULO: titulo3,
          CONTEUDO: conteudo3,
          IMG3: image3,
        }),
      });
  
      console.log(response);
      const data = await response.json();
      console.log(data);
    

      
      if (data.message.includes("Ok")) {
        onClose() 
          toast({
            title: "Sucesso",
            description: "Artigo 3 criado com sucesso!",
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "bottom-left",
          });

      } 
      //prox validação fazer criando o usuario
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Erro API",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }



  const handleImageChange = (event:any) => {
    const selectedImage = event.target.files[0];
    uploadImage(selectedImage);
     downImage(selectedImage );
  };
  

  const uploadImage = (imageFile: any) => {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    uploadBytes(storageRef, imageFile)
      .then((snapshot) => {
        // Obter a URL de download após o upload
        // return snapshot.ref.fullPath;
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setImage3(downloadURL);
        console.log('URL de download:', downloadURL);
      })
      .catch((error) => {
        console.error('Erro ao fazer upload da imagem:', error);
      });
  };

  const downImage = (imageFile: any) => {
    const imagePath = `images/${imageFile.name}`
    const storageRef = ref(storage, imagePath);
    getDownloadURL(storageRef)
      .then((url2) => {
        // `url` é a URL de download para o arquivo
        console.log('URL de download  yyyyyyy:', url2);
        // Para baixar diretamente o arquivo usando a URL
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
          console.log('Blob:', blob);
          
          // Agora você pode fazer o que quiser com o blob, como salvá-lo localmente ou exibi-lo em uma imagem
        };
        xhr.open('GET', url2);
        xhr.send();
        setImage3(url2);
        console.log("Verificando o valor de estado da imagem " , image3);
        
        
      })
      .catch((error) => {
        console.error('Erro ao obter URL de download:', error);
      });
  };


  

  function reloadReq () {
    location.reload();
  }

  
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
        Adicionar Artigo 3
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicione Aqui seu conteúdo e imagem </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Título do Artigo </FormLabel>
              <Input value={titulo3} onChange={(e) => setTitulo3(e.target.value)} focusBorderColor="black" ref={initialRef} placeholder="Digite aqui o título do artigo" />
            </FormControl>
            <FormControl style={{visibility: 'initial'}} >
              <FormLabel>Conteúdo</FormLabel>
              <Textarea  value={conteudo3} style={{marginBottom: "2vw"}} size={'lg'} onChange={(e) => setConteudo3(e.target.value)}  focusBorderColor="black" ref={initialRef} placeholder="Digite todo o conteúdo do artigo aqui!" />
            </FormControl>
           
            <div
            className={styles.editInputImgFile}
              
              // onDrop={handleDrop}
              // onDragOver={handleDragOver}
            >



              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="file-input"
              />
              <label htmlFor="file-input">
               
                <Image
                width={320}
                height={320}
                  // className={styles.avatarEdit}
                 
                  // name="profile-image"
                  src={image3 || "/img-sec-banner.png"}
                  cursor="pointer"
                />
              </label>


              <div>
              </div>
            </div>
                <p className={styles.textArea} > Arraste e solte a foto acima ou clique em <strong>415x300 para adicionar</strong>  </p>
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=> {
              createArtigo3()
              // createBarber()
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
