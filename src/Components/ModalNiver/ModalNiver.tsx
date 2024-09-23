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
import firebase from 'firebase/app';
import 'firebase/storage';
import { StorageReference , ref , getStorage , uploadBytes  , getDownloadURL , FullMetadata } from '@firebase/storage';
// import { getDownloadURL } from '../../firebase';
// import { getDownloadURL } from '@firebase/storage';
import {storage , storageRef} from '../../firebase-config';
import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { useState , useContext } from "react";
import AppContext from "@/Context/AppContext";
import styles from "@/styles/ModalAddBarber.module.css";

import sizeOf from 'image-size';

import { useToast } from "@chakra-ui/react";
// import  firebase  from 'firebase/app';

// declare function getDownloadURL(ref: StorageReference): Promise<string>; 

export default function ModalNiver() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {imageNiver , setImageNiver} =  useContext(AppContext)
  const [nomeNiver, setNomeNiver] = useState("");
  const [numberTel, setNumberTel] = useState("");
  const [valueNiver, setValueNiver] = useState("");
  const {URLPostNiver, setURLPostNiver}= useContext(AppContext);
  const {idDeleteNiver , setIdDeleteNiver}= useContext(AppContext);
  
  // const storage = firebase.storage();
  
  // const storageRefOn = storageRef.ref();
  
  // const fileInputRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null); 
  // const storage = getStorage();




  
  const toast = useToast()
  
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleDrop = (event:any) => {
    event.preventDefault ();
    const file = event.dataTransfer.files[0];
    // handleImage(file);
  };

  // const handleImageChange = (event:any) => {
  //   const selectedImage = event.target.files[0];
  //   handleImage(selectedImage);
  // };
  const handleImageChange = (event:any) => {
    const selectedImage = event.target.files[0];
    uploadImage(selectedImage);
     downImage(selectedImage );
  };
  
  // const uploadImage = (imageFile:any) => {
    
  //   // const gsReference = ref(storage, `gs://bucket/images/${imageFile.name}`);
  //   const imageRef = ref(storage , `images/${imageFile.name}`);
  //     uploadBytes(imageRef, imageFile).then((snapshot:any) => {
  //     setImageVideo3()
      
  //       });
        
      
  //     console.log("Verifica oque esta sendo salvo no estado da imagem " , imageVideo3);
    
  // }
   
  

  async function createNiver() {
    try {
      
      if (nomeNiver === '' || valueNiver === '' || numberTel === "") {
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
      fetch(`${URLPostNiver}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          NOME: nomeNiver,
          ANIVERSARIO: valueNiver,
          TELEFONE: numberTel ,
          IMG1: imageNiver ,
        })  
      });
  
      console.log(response);
      const data = await response.json();
      console.log("Pegando o ID ", data.result.insertId);
    

      
      if (data.message.includes("Ok")) {
        setIdDeleteNiver(data.result.insertId)
        onClose() 

          toast({
            title: "Sucesso",
            description: "Aniversariante criado com sucesso!",
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


  const uploadImage = (imageFile: any) => {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    uploadBytes(storageRef, imageFile)
      .then((snapshot) => {
        // Obter a URL de download após o upload
        // return snapshot.ref.fullPath;
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setImageNiver(downloadURL);
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
      .then((url) => {
        // `url` é a URL de download para o arquivo
        console.log('URL de download  xxxx-xxxx:', url);
        // Para baixar diretamente o arquivo usando a URL
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
          console.log('Blob:', blob);
          
          // Agora você pode fazer o que quiser com o blob, como salvá-lo localmente ou exibi-lo em uma imagem
        };
        xhr.open('GET', url);
        xhr.send();
        setImageNiver(url);
        console.log("Verificando o valor de estado da imagem " , imageNiver);
        
        
      })
      .catch((error) => {
        console.error('Erro ao obter URL de download:', error);
      });
  };
  


  

  function reloadReq () {
    location.reload();
  }
// Função para obter a data de hoje
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1; // Mês é base 0
  let day = today.getDate();

  // Adiciona um zero à frente do mês e do dia, se necessário
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}-${formattedMonth}-${formattedDay}`;
};

const currentDate = getCurrentDate();
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
        Adicionar Aniversáriante
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicione aqui os Aniversáriantes </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome </FormLabel>
              <Input value={nomeNiver} onChange={(e) => setNomeNiver(e.target.value)} focusBorderColor="black" ref={initialRef} placeholder="Digite aqui o nome do Aniversáriante" />
            </FormControl>
            <FormControl>
              <FormLabel>Data do aniversário</FormLabel>
              <InputGroup className={styles.inputGroupEdit}>
              <Input
                className={styles.input}
                style={{ border: "1px solid black", width: "80%" }}
                focusBorderColor="black"
                type="date"
                // min={currentDate} // Definindo a data mínima como a data atual
                // max={maxDate} // Definindo a data máxima como 7 dias a partir da data atual
                placeholder="Data do aniversário"
                value={valueNiver} // Usar a data atual se searchDate estiver vazio
                onChange={(e) => setValueNiver(e.target.value)}
              />
            </InputGroup>
            </FormControl>
            <FormControl style={{visibility: 'initial'}} >
              <FormLabel>Número de Telefone</FormLabel>
              <Input  value={numberTel} style={{marginBottom: "2vw"}} type='tel' maxLength={11} onChange={(e) => setNumberTel(e.target.value)}  focusBorderColor="black" ref={initialRef} placeholder="ex 34992095260" />
            </FormControl>
            <p style={{textAlign: "center" , marginBottom: "1vw"}} >foto Aniversáriante</p>
            <div
            className={styles.editInputImgFile}
              
              // onDrop={handleDrop}
              // onDragOver={handleDragOver}
            >



              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="file-input"
              />
              <label htmlFor="file-input">
               
                <Image
                
                // width={100}
                // height={100}
                  // className={styles.avatarEdit}
                style={{ borderRadius: "4vw" }}
                  // name="profile-image"
                  // src={imageVideo3 || "/walper.png"}
                  // cursor="pointer"
                  width={100}
                height={100}
                src={imageNiver || "/walper.png"}
                cursor="pointer"
                // onClick={() => {
                //   if (fileInputRef.current) {
                //     fileInputRef.current.click();
                //   }
                // }}
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
              createNiver()
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
