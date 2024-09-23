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
import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { useState , useContext } from "react";
import AppContext from "@/Context/AppContext";
import styles from "@/styles/ModalAddBarber.module.css";
import sizeOf from 'image-size';
import { useToast } from "@chakra-ui/react";
import firebase from 'firebase/app';
import 'firebase/storage';
import { StorageReference , ref , getStorage , uploadBytes  , getDownloadURL , FullMetadata } from '@firebase/storage';
import {storage , storageRef} from '../../firebase-config';
export default function ModalArtigo2() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image2, setImage2]= useState("");
  const [titulo2, setTitulo2] = useState("");
  const [conteudo2, setConteudo2] = useState("");
  const {URLPutArtigo2, setURLPutArtigo2}= useContext(AppContext);
  

  const toast = useToast()
  
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleDrop = (event:any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setImage2(file);
  };

  const handleImageChange = (event:any) => {
    const selectedImage = event.target.files[0];
    uploadImage(selectedImage);
     downImage(selectedImage );
  };
  

  async function createArtigo2() {
    try {
      if (titulo2 === '' || conteudo2 === '') {
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
      fetch(`${URLPutArtigo2}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          TITULO: titulo2,
          CONTEUDO: conteudo2,
          IMG2: image2,
        }),
      });
  
      console.log(response);
      const data = await response.json();
      console.log(data);
    

      
      if (data.message.includes("Ok")) {
        onClose() 
          toast({
            title: "Sucesso",
            description: "Artigo 2 criado com sucesso!",
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







  const uploadImage = (imageFile: any) => {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    uploadBytes(storageRef, imageFile)
      .then((snapshot) => {
        // Obter a URL de download após o upload
        // return snapshot.ref.fullPath;
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setImage2(downloadURL);
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
        setImage2(url2);
        console.log("Verificando o valor de estado da imagem " , image2);
        
        
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
        Adicionar Artigo 2
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
              <Input value={titulo2} onChange={(e) => setTitulo2(e.target.value)} focusBorderColor="black" ref={initialRef} placeholder="Digite aqui o título do artigo" />
            </FormControl>
            <FormControl style={{visibility: 'initial'}} >
              <FormLabel>Conteúdo</FormLabel>
              <Textarea  value={conteudo2} style={{marginBottom: "2vw"}} size={'lg'} onChange={(e) => setConteudo2(e.target.value)}  focusBorderColor="black" ref={initialRef} placeholder="Digite todo o conteúdo do artigo aqui!" />
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
                  src={image2 || "/img-sec-banner.png"}
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
              createArtigo2()
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
