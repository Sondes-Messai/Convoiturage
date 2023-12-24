import React, { useEffect } from "react";
import statService from "../../services/statService";
import { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

function StatTypeTrajets() {
  const [ridesByType, setRidesByType] = useState();

  async function loadRides() {
    const response = await statService.getRidesByType();

    setRidesByType(response);
  }

  useEffect(() => {
    loadRides();
  }, []);

  const jsonData = {
    labels: ridesByType?.map((ride) => ride[1]),
    datasets: [
      {
        label: "Types de trajets",
        data: ridesByType?.map((ride) => ride[0]),
        backgroundColor: [
          "#898989", 
          "#87bb34"
        ],
        hoverBackgroundColor: [
          "#f1f1f1",
          "#333333",
        ],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
    },
    plugins: {
      legend: {
        position: 'right',
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const label = data.labels[tooltipItem.index];
          const value = dataset.data[tooltipItem.index];
          return `${label}: ${value}`;
        },
      },
    },
  }
  
  return (
    <div className="flex-col justify-center pr-8">
      <label className="flex justify-center pb-4">Types de trajets actifs</label>
      <div>
              {jsonData ? <Pie data={jsonData} options={pieChartOptions}/> : <p>Aucune valeur à afficher</p>}

      </div>
      <p className="font-jakartaSans text-xs text-center mt-8">
        Nombre de trajets déclarés pour chaque type de trajet (un trajet "weekly" n'est déclaré qu'une fois quelque soit le nombre de semaines d'activité).
      </p>
    </div>
  );
}

export default StatTypeTrajets;
