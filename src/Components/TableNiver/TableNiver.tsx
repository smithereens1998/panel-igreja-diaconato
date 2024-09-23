import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import Image from "next/image";
import styles from "@/styles/Table.module.css";
import { MdDelete } from "react-icons/md";
import { ItemScheduling } from "@/Context/Provider";
import { useState, useEffect, useContext } from "react";
import AppContext from "@/Context/AppContext";
import ModalDeleteScheduling from "../Modals/ModalDeleteScheduling/ModalDeleteScheduling";
import { useToast } from "@chakra-ui/react";
import { ItemNiver } from "@/Context/Provider";
export default function TableNiver() {
  const { allNiver, setAllNiver } = useContext(AppContext);
  const { searchTextNiver, setSearchTextNiver } = useContext(AppContext);
  const { searchNameBarberNiver, setSearchNameBarberNiver } =
    useContext(AppContext);
  const { searchDateNiver, setSearchDateNiver } = useContext(AppContext);
  const { searchBarberLocate, setSearchBarbertLocated } =
    useContext(AppContext);
  const { userRestrito, setUserRestrito } = useContext(AppContext);
  const { passRestrito, setPassRestrito } = useContext(AppContext);
  const { URLGetNiver, setURLGetNiver } = useContext(AppContext);
  const { ImgNiver, setImgNiver } = useContext(AppContext);
  const { idDeleteNiver, setIdDeleteNiver } = useContext(AppContext);
  const { URLDeleteUniqueNiver, setURLDeleUniqueNiver } =
    useContext(AppContext);

  useEffect(() => {
    console.log("Verifica o ID para delete ", idDeleteNiver);
  }, []);
  useEffect(() => {
    getNiver();
   
    const interval = setInterval(getNiver, 1 * 60 * 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  const toast = useToast();
  const formatDate = (dateString: any) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "pt-BR",
      options
    );
    return formattedDate;
  };

  const getNiver = async () => {
    try {
      const response = await fetch(`${URLGetNiver}`);
      // const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/teamBarber/barbers");
      const data = await response.json();
      console.log("Verificando requisição Agendados ", data);

      if (data.message === "ok") {
        const requestServico = data.result.map((ItemNiver: ItemNiver) => ({
          // ID: localStorage.setItem('idAgendamento' , String(ItemScheduling.ID)),
          ID: ItemNiver.ID,
          IMG1: String(ItemNiver.IMG1),
          NOME: ItemNiver.NOME,
          TELEFONE: ItemNiver.TELEFONE,
          ANIVERSARIO: String(ItemNiver.ANIVERSARIO),
        }));

        setAllNiver([...requestServico]);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const filteredItems = allNiver.filter(
    (item: any) =>
      item.NOME.toLowerCase().includes(searchTextNiver.toLowerCase()) &&
      item.TELEFONE.toLowerCase().includes(
        searchNameBarberNiver.toLowerCase()
      ) &&
      item.ANIVERSARIO.toLowerCase().includes(searchDateNiver)
  );

  const DeleteNiver = async (id:number) => {
    try {
      const response = await fetch(`${URLDeleteUniqueNiver}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({
          ID: id,
        }),
      });

      console.log(response);
      const data = await response.json();
      console.log("Debugando requisição!!");
      console.log(data);

      if(data.message.includes("Ok")) {
          toast({
            title: "Sucesso",
            description: "Deletado com sucesso!",
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "bottom-left",
          });
        }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer
      style={{
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        borderRadius: 10,
        marginTop: "10vh",
        height: "50vh",
        // backgroundColor: "red",

        overflowY: "auto",
        // marginBottom: "5vw",
        width: "80%",
      }}
      // className={styles.tableEdit}
    >
      <Table colorScheme="blackAlpha" size="md">
        <Thead>
          <Tr>
            <Th>COD</Th>
            <Th>FOTO</Th>
            <Th>NOME</Th>
            <Th>TELEFONE</Th>
            <Th>ANIVERSÁRIO</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredItems.map((item: ItemNiver, index: number) => {
            // const base64String = btoa(item.IMG1)
            return (
              <Tr key={item.ID}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // marginTop: 15,
                    marginLeft: 10,
                  }}
                >
                  <MdDelete
                    size={25}
                    color="red"
                    cursor={"pointer"}
                    onClick={()=> {
                      DeleteNiver(item.ID);
                    }}
                  />

                  <Td isNumeric>{item.ID}</Td>
                </div>
                <Td>
                  <WrapItem>
                    <Avatar size="md" name="Ryan Florence" src={item.IMG1} />{" "}
                  </WrapItem>
                  {/* <img
                    width={60}
                    height={60}
                    alt="Imagem do aniversáriante"
                    src={base64String}
                    style={{ borderRadius: 30 }}
                  />{" "} */}
                </Td>
                <Td>{item.NOME}</Td>
                <Td>{item.TELEFONE}</Td>
                <Td>{formatDate(item.ANIVERSARIO)}</Td>

                {/* <Td>{item.icon}</Td> */}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
