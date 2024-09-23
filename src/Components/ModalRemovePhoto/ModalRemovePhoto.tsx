import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
  useToast
} from "@chakra-ui/react";

import styles from "@/styles/ModalRemovePhoto.module.css";

import { useState , useEffect , useContext , useRef } from "react";
import AppContext from "@/Context/AppContext";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";

interface Props {
  onClick: () => void;
  onSave: () => void;
}

export default function ModalRemovePhoto({ onClick , onSave }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { scheduling, setScheduling } = useContext(AppContext);
  const { userRestrito, setUserRestrito } = useContext(AppContext);
  const { passRestrito, setPassRestrito } = useContext(AppContext);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null); // New state
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const router = useRouter();
  const cancelRef = useRef();

  

  return (
    <>
       <Button
                  onClick={onOpen}
                  // marginRight={"1vw"}
                  variant={"solid"}
                  style={{
                    // width: "15vw",
                    // marginTop: "2vw",
                    backgroundColor: "black",
                    color: "white",
                    // fontWeight: "bold",
                  }}
                  className={styles.buttonRemoveImg}
                >
                  <MdDelete size={25} color="white" />
                  Remover Foto
                </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
             Deletar Foto
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar a foto?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={onSave} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}