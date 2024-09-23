import { useState, useContext, useEffect } from "react";
import styles from "@/styles/EditHours.module.css";
import AppContext from "../Context/AppContext";
import { itemBarber } from "../Context/Provider";
import { Navigationmobile } from "../Components/NavigationMobile/NavigationMobile";
import { useRouter } from "next/router.js";
import {
  Avatar,
  WrapItem,
  Wrap,
  Input,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Image,
  Divider,
  useToast,
} from "@chakra-ui/react";

// Atualizar o tipo itemBarber para incluir as propriedades para contagem de colunas para cada dia da semana
interface ExtendedItemBarber extends itemBarber {
  mondayCols: { start: string; end: string }[];
  tuesdayCols: { start: string; end: string }[];
  wednesdayCols: { start: string; end: string }[];
  thursdayCols: { start: string; end: string }[];
  fridayCols: { start: string; end: string }[];
  saturdayCols: { start: string; end: string }[];
}

export default function EditHours() {
  const { getBarber, setGetBarber } = useContext(AppContext);
  const router = useRouter();
  const [hoursData, setHoursData] = useState<{ [key: number]: any }>({});
  useEffect(() => {
    const savedUser = localStorage.getItem("e_m");
    const savedPassword = localStorage.getItem("p_s");
    if (!savedUser || !savedPassword) {
      router.push("/NotFound");
    }
  }, [router]);

  const addColumn = (barberId: number, day: string) => {
    const updatedBarbers = [...getBarber];
    const currentBarber = updatedBarbers.find(
      (barber) => barber.ID === barberId
    ); // Encontrando o barbeiro pelo ID
    if (!currentBarber) return; // Verificando se o barbeiro foi encontrado
    switch (day) {
      case "monday":
        if (!currentBarber.mondayCols) {
          currentBarber.mondayCols = [];
        }
        currentBarber.mondayCols.push({
          start: "",
          end: "",
        });
        break;
      case "tuesday":
        if (!currentBarber.tuesdayCols) {
          currentBarber.tuesdayCols = [];
        }
        currentBarber.tuesdayCols.push("");
        break;
      case "wednesday":
        if (!currentBarber.wednesdayCols) {
          currentBarber.wednesdayCols = [];
        }
        currentBarber.wednesdayCols.push("");
        break;
      case "thursday":
        if (!currentBarber.thursdayCols) {
          currentBarber.thursdayCols = [];
        }
        currentBarber.thursdayCols.push("");
        break;
      case "friday":
        if (!currentBarber.fridayCols) {
          currentBarber.fridayCols = [];
        }
        currentBarber.fridayCols.push("");
        break;
      case "saturday":
        if (!currentBarber.saturdayCols) {
          currentBarber.saturdayCols = [];
        }
        currentBarber.saturdayCols.push("");
        break;
      default:
        break;
    }
    setGetBarber(updatedBarbers);
  };

  const removeColumn = (barberIndex: number, day: string) => {
    const updatedBarbers = [...getBarber];
    const currentBarber = updatedBarbers[barberIndex];
    switch (day) {
      case "monday":
        currentBarber.mondayCols.pop();
        break;
      case "tuesday":
        currentBarber.tuesdayCols.pop();
        break;
      case "wednesday":
        currentBarber.wednesdayCols.pop();
        break;
      case "thursday":
        currentBarber.thursdayCols.pop();
        break;
      case "friday":
        currentBarber.fridayCols.pop();
        break;
      case "saturday":
        currentBarber.saturdayCols.pop();
        break;
      default:
        break;
    }
    setGetBarber(updatedBarbers);
  };

  const getBarberService = async () => {
    try {
      const response = await fetch(
        "https://boxer-relieved-impala.ngrok-free.app/teamBarber/barbers"
      );
      // const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/teamBarber/barbers");
      const data = await response.json();
      console.log("Verificando requisição team ", data);

      if (data.message === "sucesso") {
        const requestServico = data.servico.map((itemBarber: itemBarber) => ({
          ID: itemBarber.ID,
          NOME: itemBarber.NOME,
          IMG: itemBarber.IMG,
          // IMG: image,
          MEDIA_AV: itemBarber.MEDIA_AV.toFixed(2),
        }));
        const sortedBarbers = requestServico.sort(
          (a: any, b: any) => b.MEDIA_AV - a.MEDIA_AV
        );
        setGetBarber([...sortedBarbers]);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    getBarberService();
    console.log("Serviços render");
  }, []);

  const toast = useToast();
  async function addHours(barberId: number) {
    try {
      const response = await fetch(
        `https://boxer-relieved-impala.ngrok-free.app/servico/insertDay`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            ID: barberId,
            SEGUNDA: {
              start: hoursData[0]?.monday,
              end: hoursData[0]?.tuesday,
            },
            TERCA: { start: hoursData[1]?.tuesday, end: hoursData[1]?.tuesday },
            QUARTA: {
              start: hoursData[2]?.wednesday,
              end: hoursData[2]?.wednesday,
            },
            QUINTA: {
              start: hoursData[3]?.thursday,
              end: hoursData[3]?.thursday,
            },
            SEXTA: { start: hoursData[4]?.friday, end: hoursData[4]?.friday },
            SABADO: {
              start: hoursData[5]?.saturday,
              end: hoursData[5]?.saturday,
            },
          }),
        }
      );
      console.log("Verificando o meu ID BARBER ", barberId);
      console.log("Verificando o meu Horario ", hoursData);

      console.log(response);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Erro na api ao salvar o serviço",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  // Função para inicializar os dados dos horários para cada barbeiro
  const initializeHoursData = () => {
    const initialData: { [key: number]: any } = {};
    getBarber.forEach((barber) => {
      initialData[barber.ID] = {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
      };
    });
    setHoursData(initialData);
  };
  useEffect(() => {
    initializeHoursData();
  }, [getBarber]);

  // Função para lidar com a alteração de entrada de dados de horários
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    barberId: number,
    day: string,
    type: string
  ) => {
    const { value } = e.target;
    setHoursData((prevData) => {
      // Verificar se já existe um objeto de horário para este barbeiro
      const barberHours = prevData[barberId] || {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
      };

      return {
        ...prevData,
        [barberId]: {
          ...barberHours,
          [day]: {
            ...barberHours[day],
            [type]: value,
          },
        },
      };
    });
  };
  return (
    <>
      <Navigationmobile />
      <div className={styles.containerPrincipalHours}>
        <h1 className={styles.titleHours}>Editar Horário</h1>
        <div className={styles.containerCardsTeamHours}>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Imagem</Th>
                  <Th>Nome</Th>
                  <Th>Segunda-Feira</Th>
                  <Th>Terça- Feira</Th>
                  <Th>Quarta-Feira</Th>
                  <Th>Quinta-Feira</Th>
                  <Th>Sexta-Feira</Th>
                  <Th>Sábado</Th>
                </Tr>
              </Thead>
              <Tbody>
                {getBarber.map((item: ExtendedItemBarber, index: any) => (
                  <Tr key={item.ID}>
                    <Td>
                      <Wrap>
                        <WrapItem>
                          <Avatar size="2xl" src={item.IMG} />
                        </WrapItem>
                      </Wrap>
                    </Td>
                    <Td>{item.NOME}</Td>
                    <Td>
                      {item.mondayCols &&
                        item.mondayCols.map((timeSlot, colIndex) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: 20,
                            }}
                            key={colIndex}
                          >
                            <div>
                              <Input
                                type="time"
                                value={
                                  hoursData[index]?.monday?.start ||
                                  timeSlot.start
                                }
                                onChange={(e) =>
                                  handleInputChange(e, index, "monday", "start")
                                }
                              />
                            </div>
                            <p>Até</p>
                            <div>
                              <Input
                                type="time"
                                value={
                                  hoursData[index]?.monday?.end || timeSlot.end
                                }
                                onChange={(e) =>
                                  handleInputChange(e, index, "monday", "end")
                                }
                              />
                            </div>
                          </div>
                        ))}
                      <div className={styles.containerButtonEdit}>
                        <Button
                          style={{
                            marginBottom: 20,
                            backgroundColor: "black",
                            color: "white",
                          }}
                          onClick={() => addColumn(item.ID, "monday")}
                        >
                          Adicionar
                        </Button>
                        {item.mondayCols && item.mondayCols.length > 0 && (
                          <Button
                            style={{
                              marginBottom: 20,
                              backgroundColor: "#90ee90",
                              color: "white",
                            }}
                            onClick={() => {
                              addHours(item.ID);
                            }}
                          >
                            Salvar
                          </Button>
                        )}
                        {item.mondayCols && item.mondayCols.length > 0 && (
                          <Button
                            style={{
                              marginBottom: 20,
                              backgroundColor: "#FF0040",
                              color: "white",
                            }}
                            onClick={() => removeColumn(index, "monday")}
                          >
                            Remover
                          </Button>
                        )}
                      </div>
                    </Td>
                    <Td>
                      {item.tuesdayCols &&
                        item.tuesdayCols.map((value, colIndex) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: 20,
                            }}
                            key={colIndex}
                          >
                            <div>
                              <Input type="time" />
                            </div>
                            <p>Até</p>
                            <div>
                              <Input type="time" />
                            </div>
                          </div>
                        ))}
                      <div className={styles.containerButtonEdit}>
                        <Button
                          style={{
                            marginBottom: 20,
                            backgroundColor: "black",
                            color: "white",
                          }}
                          onClick={() => addColumn(index, "tuesday")}
                        >
                          Adicionar
                        </Button>
                        {item.tuesdayCols && item.tuesdayCols.length > 0 && (
                          <Button
                            style={{
                              marginBottom: 20,
                              backgroundColor: "#90ee90",
                              color: "white",
                            }}
                          >
                            Salvar
                          </Button>
                        )}
                        {item.tuesdayCols && item.tuesdayCols.length > 0 && (
                          <Button
                            style={{
                              marginBottom: 20,
                              backgroundColor: "#FF0040",
                              color: "white",
                            }}
                            onClick={() => removeColumn(index, "tuesday")}
                          >
                            Remover
                          </Button>
                        )}
                      </div>
                    </Td>
                    <Td>
                      {item.wednesdayCols &&
                        item.wednesdayCols.map((value, colIndex) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: 20,
                            }}
                            key={colIndex}
                          >
                            <div>
                              <Input type="time" />
                            </div>
                            <p>Até</p>
                            <div>
                              <Input type="time" />
                            </div>
                          </div>
                        ))}
                      <div className={styles.containerButtonEdit}>
                        <Button
                          style={{
                            marginBottom: 20,
                            backgroundColor: "black",
                            color: "white",
                          }}
                          onClick={() => addColumn(index, "wednesday")}
                        >
                          Adicionar
                        </Button>
                        {item.wednesdayCols &&
                          item.wednesdayCols.length > 0 && (
                            <Button
                              style={{
                                marginBottom: 20,
                                backgroundColor: "#90ee90",
                                color: "white",
                              }}
                            >
                              Salvar
                            </Button>
                          )}
                        {item.wednesdayCols &&
                          item.wednesdayCols.length > 0 && (
                            <Button
                              style={{
                                marginBottom: 20,
                                backgroundColor: "#FF0040",
                                color: "white",
                              }}
                              onClick={() => removeColumn(index, "wednesday")}
                            >
                              Remover
                            </Button>
                          )}
                      </div>
                    </Td>
                    <Td>
                      {item.thursdayCols &&
                        item.thursdayCols.map((value, colIndex) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: 20,
                            }}
                            key={colIndex}
                          >
                            <div>
                              <Input type="time" />
                            </div>
                            <p>Até</p>
                            <div>
                              <Input type="time" />
                            </div>
                          </div>
                        ))}
                      <div className={styles.containerButtonEdit}>
                        <Button
                          style={{
                            marginBottom: 20,
                            backgroundColor: "black",
                            color: "white",
                          }}
                          onClick={() => addColumn(index, "thursday")}
                        >
                          Adicionar
                        </Button>
                        {item.thursdayCols && item.thursdayCols.length > 0 && (
                          <Button
                            style={{
                              marginBottom: 20,
                              backgroundColor: "#90ee90",
                              color: "white",
                            }}
                          >
                            Salvar
                          </Button>
                        )}
                        {item.thursdayCols && item.thursdayCols.length > 0 && (
                          <Button
                            style={{
                              marginBottom: 20,
                              backgroundColor: "#FF0040",
                              color: "white",
                            }}
                            onClick={() => removeColumn(index, "thursday")}
                          >
                            Remover
                          </Button>
                        )}
                      </div>
                    </Td>
                    <Td>
                      {item.fridayCols &&
                        item.fridayCols.map((value, colIndex) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: 20,
                            }}
                            key={colIndex}
                          >
                            <div>
                              <Input type="time" />
                            </div>
                            <p>Até</p>
                            <div>
                              <Input type="time" />
                            </div>
                          </div>
                        ))}
                      <div className={styles.containerButtonEdit}>
                        <Button
                          style={{
                            marginBottom: 20,
                            backgroundColor: "black",
                            color: "white",
                          }}
                          onClick={() => addColumn(index, "friday")}
                        >
                          Adicionar
                        </Button>
                        {item.fridayCols && item.fridayCols.length > 0 && (
                          <Button
                            style={{
                              marginBottom: 20,
                              backgroundColor: "#90ee90",
                              color: "white",
                            }}
                          >
                            Salvar
                          </Button>
                        )}
                        {item.fridayCols && item.fridayCols.length > 0 && (
                          <Button
                            style={{
                              marginBottom: 20,
                              backgroundColor: "#FF0040",
                              color: "white",
                            }}
                            onClick={() => removeColumn(index, "friday")}
                          >
                            Remover
                          </Button>
                        )}
                      </div>
                    </Td>
                    <Td>
                      {item.saturdayCols &&
                        item.saturdayCols.map((value, colIndex) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: 20,
                            }}
                            key={colIndex}
                          >
                            <div>
                              <Input type="time" />
                            </div>
                            <p>Até</p>
                            <div>
                              <Input type="time" />
                            </div>
                          </div>
                        ))}
                      <div className={styles.containerButtonEdit}>
                        <Button
                          style={{
                            marginBottom: 20,
                            backgroundColor: "black",
                            color: "white",
                          }}
                          onClick={() => addColumn(index, "saturday")}
                        >
                          Adicionar
                        </Button>
                        {item.saturdayCols && item.saturdayCols.length > 0 && (
                          <Button
                            style={{
                              marginBottom: 20,
                              backgroundColor: "#90ee90",
                              color: "white",
                            }}
                          >
                            Salvar
                          </Button>
                        )}

                        {item.saturdayCols && item.saturdayCols.length > 0 && (
                          <Button
                            style={{
                              marginBottom: 20,
                              backgroundColor: "#FF0040",
                              color: "white",
                            }}
                            onClick={() => removeColumn(index, "saturday")}
                          >
                            Remover
                          </Button>
                        )}
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}






// RASCUNHO 2 

import { useState, useContext, useEffect } from "react";
import styles from "@/styles/EditHours.module.css";
import AppContext from "../Context/AppContext";
import { itemBarber } from "../Context/Provider";
import { Navigationmobile } from "../Components/NavigationMobile/NavigationMobile";
import { useRouter } from "next/router.js";
import {
  Avatar,
  WrapItem,
  Wrap,
  Input,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  useToast,
} from "@chakra-ui/react";

// Atualizar o tipo itemBarber para incluir as propriedades para contagem de colunas para cada dia da semana
interface ExtendedItemBarber extends itemBarber {
  mondayCols: { start: string; end: string }[];
  tuesdayCols: { start: string; end: string }[];
  wednesdayCols: { start: string; end: string }[];
  thursdayCols: { start: string; end: string }[];
  fridayCols: { start: string; end: string }[];
  saturdayCols: { start: string; end: string }[];
}

export default function EditHours() {
  const { getBarber, setGetBarber } = useContext(AppContext);
  const router = useRouter();
  const [hoursData, setHoursData] = useState<{ [key: number]: any }>({});
  useEffect(() => {
    const savedUser = localStorage.getItem("e_m");
    const savedPassword = localStorage.getItem("p_s");
    if (!savedUser || !savedPassword) {
      router.push("/NotFound");
    }
  }, [router]);

  const addColumn = (barberId: number, day: string) => {
    const updatedBarbers = [...getBarber];
    const currentBarberIndex = updatedBarbers.findIndex(barber => barber.ID === barberId);
    if (currentBarberIndex === -1) return; // Barbeiro não encontrado
    
    const currentBarber = updatedBarbers[currentBarberIndex];
    
    let dayCols: { start: string; end: string }[];
    switch (day) {
      case "monday":
        dayCols = currentBarber.mondayCols;
        break;
      case "tuesday":
        dayCols = currentBarber.tuesdayCols;
        break;
      case "wednesday":
        dayCols = currentBarber.wednesdayCols;
        break;
      case "thursday":
        dayCols = currentBarber.thursdayCols;
        break;
      case "friday":
        dayCols = currentBarber.fridayCols;
        break;
      case "saturday":
        dayCols = currentBarber.saturdayCols;
        break;
      default:
        return;
    }

    // Verificar se já existem 8 pares de horários
    if (dayCols.length >= 8) {
      return; // Limitado a 8 pares de horários
    }

    // Adicionar um novo par de horários vazio
    dayCols.push({ start: "", end: "" });
    setGetBarber(updatedBarbers);
  };

  const removeColumn = (barberId: number, day: string, columnIndex: number) => {
    const updatedBarbers = [...getBarber];
    const currentBarberIndex = updatedBarbers.findIndex(barber => barber.ID === barberId);
    if (currentBarberIndex === -1) return; // Barbeiro não encontrado
    
    const currentBarber = updatedBarbers[currentBarberIndex];
    
    let dayCols: { start: string; end: string }[];
    switch (day) {
      case "monday":
        dayCols = currentBarber.mondayCols;
        break;
      case "tuesday":
        dayCols = currentBarber.tuesdayCols;
        break;
      case "wednesday":
        dayCols = currentBarber.wednesdayCols;
        break;
      case "thursday":
        dayCols = currentBarber.thursdayCols;
        break;
      case "friday":
        dayCols = currentBarber.fridayCols;
        break;
      case "saturday":
        dayCols = currentBarber.saturdayCols;
        break;
      default:
        return;
    }

    // Verificar se o índice da coluna a ser removida é válido
    if (columnIndex < 0 || columnIndex >= dayCols.length) {
      return; // Índice inválido
    }

    // Remover a coluna
    dayCols.splice(columnIndex, 1);
    setGetBarber(updatedBarbers);
  };

  const getBarberService = async () => {
    try {
      const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/teamBarber/barbers");
      const data = await response.json();

      if (data.message === "sucesso") {
        const requestServico = data.servico.map((itemBarber: itemBarber) => ({
          ID: itemBarber.ID,
          NOME: itemBarber.NOME,
          IMG: itemBarber.IMG,
          mondayCols: [],
          tuesdayCols: [],
          wednesdayCols: [],
          thursdayCols: [],
          fridayCols: [],
          saturdayCols: [],
        }));
        setGetBarber(requestServico);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    getBarberService();
  }, []);

  const toast = useToast();
  async function addHours(barberId: number) {
    try {
      const response = await fetch(
        `https://boxer-relieved-impala.ngrok-free.app/servico/insertDay`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            ID: barberId,
            SEGUNDA: {
              start: hoursData[barberId]?.monday?.start,
              end: hoursData[barberId]?.monday?.end,
            },
            TERCA: {
              start: hoursData[barberId]?.tuesday?.start,
              end: hoursData[barberId]?.tuesday?.end,
            },
            QUARTA: {
              start: hoursData[barberId]?.wednesday?.start,
              end: hoursData[barberId]?.wednesday?.end,
            },
            QUINTA: {
              start: hoursData[barberId]?.thursday?.start,
              end: hoursData[barberId]?.thursday?.end,
            },
            SEXTA: {
              start: hoursData[barberId]?.friday?.start,
              end: hoursData[barberId]?.friday?.end,
            },
            SABADO: {
              start: hoursData[barberId]?.saturday?.start,
              end: hoursData[barberId]?.saturday?.end,
            },
          }),
        }
      );
      const data = await
      response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Erro na api ao salvar o serviço",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  // Função para inicializar os dados dos horários para cada barbeiro
  const initializeHoursData = () => {
    const initialData: { [key: number]: any } = {};
    getBarber.forEach((barber:any) => {
      initialData[barber.ID] = {
        monday: { start: "", end: "" },
        tuesday: { start: "", end: "" },
        wednesday: { start: "", end: "" },
        thursday: { start: "", end: "" },
        friday: { start: "", end: "" },
        saturday: { start: "", end: "" },
      };
    });
    setHoursData(initialData);
  };

  useEffect(() => {
    initializeHoursData();
  }, [getBarber]);

  // Função para lidar com a alteração de entrada de dados de horários
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    barberId: number,
    day: string,
    type: string
  ) => {
    const { value } = e.target;
    setHoursData((prevData) => {
      // Verificar se já existe um objeto de horário para este barbeiro
      const barberHours = prevData[barberId] || {
        monday: { start: "", end: "" },
        tuesday: { start: "", end: "" },
        wednesday: { start: "", end: "" },
        thursday: { start: "", end: "" },
        friday: { start: "", end: "" },
        saturday: { start: "", end: "" },
      };

      return {
        ...prevData,
        [barberId]: {
          ...barberHours,
          [day]: {
            ...barberHours[day],
            [type]: value,
          },
        },
      };
    });
  };

  return (
    <>
      <Navigationmobile />
      <div className={styles.containerPrincipalHours}>
        <h1 className={styles.titleHours}>Editar Horário</h1>
        <div className={styles.containerCardsTeamHours}>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Imagem</Th>
                  <Th>Nome</Th>
                  <Th>Segunda-Feira</Th>
                  <Th>Terça-Feira</Th>
                  <Th>Quarta-Feira</Th>
                  <Th>Quinta-Feira</Th>
                  <Th>Sexta-Feira</Th>
                  <Th>Sábado</Th>
                </Tr>
              </Thead>
              <Tbody>
                {getBarber.map((item: ExtendedItemBarber, index: any) => (
                  <Tr key={item.ID}>
                    <Td>
                      <Wrap>
                        <WrapItem>
                          <Avatar size="2xl" src={item.IMG} />
                        </WrapItem>
                      </Wrap>
                    </Td>
                    <Td>{item.NOME}</Td>
                   
                  
                    <Td>
                      {/* Inputs para Sábado */}
                     
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: 20,
                            }}
                            // key={colIndex}
                          >
                            <div>
                              <Input
                                type="time"
                                // value={
                                //   hoursData[item.ID]?.saturday?.start ||
                                //   timeSlot.start
                                // }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    item.ID,
                                    "saturday",
                                    "start"
                                  )
                                }
                              />
                            </div>
                            <p>Até</p>
                            <div>
                              <Input
                                type="time"
                                // value={
                                //   hoursData[item.ID]?.saturday?.end || timeSlot.end
                                // }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    item.ID,
                                    "saturday",
                                    "end"
                                  )
                                }
                              />
                            </div>
                          </div>
                     
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: 20,
                            }}
                            // key={colIndex}
                          >
                            <div>
                              <Input
                                type="time"
                                // value={
                                //   hoursData[item.ID]?.saturday?.start ||
                                //   timeSlot.start
                                // }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    item.ID,
                                    "saturday",
                                    "start"
                                  )
                                }
                              />
                            </div>
                            <p>Até</p>
                            <div>
                              <Input
                                type="time"
                                // value={
                                //   hoursData[item.ID]?.saturday?.end || timeSlot.end
                                // }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    item.ID,
                                    "saturday",
                                    "end"
                                  )
                                }
                              />
                            </div>
                          </div>
                     
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: 20,
                            }}
                            // key={colIndex}
                          >
                            <div>
                              <Input
                                type="time"
                                // value={
                                //   hoursData[item.ID]?.saturday?.start ||
                                //   timeSlot.start
                                // }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    item.ID,
                                    "saturday",
                                    "start"
                                  )
                                }
                              />
                            </div>
                            <p>Até</p>
                            <div>
                              <Input
                                type="time"
                                // value={
                                //   hoursData[item.ID]?.saturday?.end || timeSlot.end
                                // }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    item.ID,
                                    "saturday",
                                    "end"
                                  )
                                }
                              />
                            </div>
                          </div>
                     
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: 20,
                            }}
                            // key={colIndex}
                          >
                            <div>
                              <Input
                                type="time"
                                // value={
                                //   hoursData[item.ID]?.saturday?.start ||
                                //   timeSlot.start
                                // }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    item.ID,
                                    "saturday",
                                    "start"
                                  )
                                }
                              />
                            </div>
                            <p>Até</p>
                            <div>
                              <Input
                                type="time"
                                // value={
                                //   hoursData[item.ID]?.saturday?.end || timeSlot.end
                                // }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    item.ID,
                                    "saturday",
                                    "end"
                                  )
                                }
                              />
                            </div>
                          </div>
                        
                      <div className={styles.containerButtonEdit}>
                          <Button
                            style={{
                              marginBottom: 20,
                              backgroundColor: "#90ee90",
                              color: "white",
                            }}
                            onClick={() => {
                              addHours(item.ID);
                            }}
                          >
                            Salvar
                          </Button>
                       
                        
                          <Button
                            style={{
                              marginBottom: 20,
                              backgroundColor: "#FF0040",
                              color: "white",
                            }}
                            onClick={() =>
                              removeColumn(
                                item.ID,
                                "saturday",
                                item.saturdayCols.length - 1
                              )
                            }
                          >
                            Remover
                          </Button>
                       
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
                            
