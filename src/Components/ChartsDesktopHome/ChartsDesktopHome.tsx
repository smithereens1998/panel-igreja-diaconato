import React from "react";
import styles from "@/styles/Dashboard.module.css";
import { itemBarber } from "@/Context/Provider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Label,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useState, useContext, useEffect } from "react";
import AppContext from "@/Context/AppContext";

export default function ChartsDesktopHome() {
  const { getBarber, setGetBarber } = useContext(AppContext);
  const [barberChartData, setBarberChartData] = useState([]);
  const [mostScheduledServices, setMostScheduledServices] = useState([]);
  // const [getTotalLucroValue, setTotalLucroValue] = useState([]);
  const [totalLucroValue, setTotalLucroValue] = useState<
    { name: string; value: number }[]
  >([]);

  // const data01 = [
  //   { name: "Grupo A", value: 400, fill: "black" },
  //   { name: "Grupo B", value: 300, fill: "#98bef2" },
  //   { name: "Grupo C", value: 300, fill: "#2c78e2" },
  // ];

  // const data02 = [
  //   { name: "Grupo A", value: 200, fill: "black" },
  //   { name: "Grupo B", value: 100, fill: "#98bef2" },
  //   { name: "Grupo C", value: 300, fill: "#2c78e2" },
  // ];

  // Função para buscar os dados do serviço do barbeiro
  const getBarberServiceChart = async () => {
    try {
      const response = await fetch("https://boxer-relieved-impala.ngrok-free.app/teamBarber/barbers");
      const data = await response.json();
      console.log("Verificando requisição team ", data);

      if (data.message === "sucesso") {
        const requestServico = data.servico.map((itemBarber: itemBarber) => ({
          name: itemBarber.NOME,
          uv: itemBarber.MEDIA_AV.toFixed(2),
        }));
        const sortedBarbers = requestServico.sort(
          (a: any, b: any) => b.uv - a.uv
        );
        setGetBarber([...sortedBarbers]);
        setBarberChartData(sortedBarbers); // Atualizando o estado com os dados do serviço do barbeiro
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  // Função para buscar os dados dos serviços mais agendados
  const getMostScheduledServices = async () => {
    try {
      const response = await fetch(
        "https://boxer-relieved-impala.ngrok-free.app/servico/getMostScheduledServices"
      );

      if (!response.ok) {
        throw new Error("Erro ao obter os dados dos serviços mais agendados.");
      }

      const responseData = await response.json();
      console.log("Dados dos serviços mais agendados:", responseData);
      setMostScheduledServices(responseData.result); // Atualiza o estado com os dados dos serviços mais agendados
    } catch (error) {
      console.error(
        "Erro ao obter os dados dos serviços mais agendados:",
        error
      );
    }
  };

  const getValueTotal = async () => {
    try {
      const response = await fetch(
        "https://boxer-relieved-impala.ngrok-free.app/servico/getValueTotalChart"
      );

      if (!response.ok) {
        throw new Error("Erro ao obter os dados da média de lucro total.");
      }

      const responseData = await response.json();
      console.log("Valor total de lucro:", responseData);
      // Verifica se a resposta contém dados
      if (
        responseData &&
        responseData.result &&
        responseData.result.length > 0
      ) {
        // Define um novo objeto de dados para o gráfico de pizza
        const totalValueData = [
          { name: "Total", value: parseInt(responseData.result[0].Total) },
        ];
        setTotalLucroValue(totalValueData); // Atualiza o estado com os dados da média de lucro total
      }
    } catch (error) {
      console.error("Erro ao obter os dados da média de lucro total:", error);
    }
  };
  useEffect(() => {
    getBarberServiceChart();
    getMostScheduledServices(); // Chama a função para buscar os serviços mais agendados
    getValueTotal();
  }, []);
  return (
    // <ResponsiveContainer width="100%" minHeight={"100vh"} >
      <div>
        <div className={styles.chartEdit}>
          <div className={styles.contentChart}>
            <h1 className={styles.labelGrafic}>Ranking de Barbeiros</h1>
            <LineChart
              width={800}
              height={400}
              data={barberChartData}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uv" stroke="black" />
            </LineChart>
          </div>

          <div className={styles.contentChart}>
            <div className={styles.titlesChart}>
              <h1 className={styles.labelGrafic2}>Cortes mais escolhidos</h1>
              <h1 className={styles.labelGrafic2}>Média de Lucro total</h1>
            </div>

            <PieChart width={1000} height={400}>
              <Pie
                data={mostScheduledServices}
                dataKey="NUMERO_DE_AGENDAMENTOS"
                nameKey="SERVICO"
                cx={200}
                cy={200}
                outerRadius={80}
                
                isAnimationActive={true}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {mostScheduledServices.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === 0
                        ? "black"
                        : index % 3 === 0
                        ? "red"
                        : index % 3 === 1
                        ? "#0ecfff"
                        : "#2c78e2"
                    }
                  />
                ))}
              </Pie>

              <Pie
                dataKey="value"
                data={totalLucroValue}
                cx={600}
                cy={200}
                innerRadius={40}
                outerRadius={80}
                isAnimationActive={true}
                label={({ name, value }) =>
                  `${name}: R$ ${value.toLocaleString("pt-BR")}`
                }
              >
                {totalLucroValue.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "green" : "red"} // A cor do menor valor é preta, as demais são azuis
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    // </ResponsiveContainer>
  );
}
