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
  Image,
  InputGroup
  
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

export default function ModalLeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {imageLeader, setImageLeader}= useContext(AppContext);
  const [nomeLeader, setNomeLeader] = useState("");
  const [carg, setCarg] = useState("");
  const [valueNiver, setValueNiver] = useState("");
  const {URLPostLeader, setURLPostLeader}= useContext(AppContext);

  const toast = useToast()
  
  const initialRef = useRef(null);
  const finalRef = useRef(null);



  async function createLeader() {
    try {
      
      if (nomeLeader === '' || carg === '') {
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
      fetch(`${URLPostLeader}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          NOME: nomeLeader,
          CARGO: carg,
          IMG: imageLeader ,
        })  
      });
  
      console.log(response);
      const data = await response.json();
      console.log(data);
    

      
      if (data.message.includes("Ok")) {
        onClose() 
          toast({
            title: "Sucesso",
            description: "Líder criado com sucesso!",
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "bottom-left",
          })

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
        setImageLeader(downloadURL);
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
        setImageLeader(url2);
        console.log("Verificando o valor de estado da imagem " , imageLeader);
        
        
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
        Adicionar Liderança
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicione aqui os Líderes da igreja </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome </FormLabel>
              <Input value={nomeLeader} onChange={(e) => setNomeLeader(e.target.value)} focusBorderColor="black" ref={initialRef} placeholder="Digite aqui o nome do Líder" />
            </FormControl>
            <FormControl>
              <FormLabel>Cargo</FormLabel>
              <InputGroup className={styles.inputGroupEdit}>
              <Input value={carg} onChange={(e) => setCarg(e.target.value)} focusBorderColor="black" ref={initialRef} placeholder="Digite aqui o Cargo do Líder" />
              
            </InputGroup>
            </FormControl>
            
            <p style={{textAlign: "center" , marginBottom: "1vw"}} >foto do Líder</p>
            <div
            className={styles.editInputImgFile}
              
              
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
                width={100}
                height={100}
                  // className={styles.avatarEdit}
                style={{ borderRadius: "4vw" }}
                  // name="profile-image"
                  src={imageLeader || "/walper.png"}
                  cursor="pointer"
                />
              </label>


              <div>
              </div>
            </div>
                <p className={styles.textArea} > Arraste e solte a foto acima ou clique em <strong>320x320 para adicionar</strong>  </p>
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=> {
              onClose()
              createLeader();
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
