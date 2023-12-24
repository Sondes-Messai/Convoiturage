import React, { useState, useEffect } from "react";
import statService from "../../services/statService";
import { Line } from "react-chartjs-2";

function StatUtilisateursActifs() {
  const [usersByDate, setUsersByDate] = useState();
  const [nb, setNb] = useState();

  /**
   * récupère les données du back
   */
  async function loadActifUsers() {
    const response = await statService.getUsersByCreationDate();
    const response2 = await statService.getNbActifsUsers();

    setUsersByDate(response);
    setNb(response2);
  }

  useEffect(() => {
    loadActifUsers();
  }, []);

  // Vérifiez si usersByDate est défini
  if (!usersByDate) {
    return <p>Chargement en cours...</p>;
  }

  // Créer un tableau avec toutes les étiquettes de mois possibles
  const allMonths = Array.from({ length: 12 }, (_, i) =>
    new Date(new Date().setMonth(new Date().getMonth() - i))
      .toLocaleDateString("en-US", { month: "2-digit", year: "numeric" })
      .replace("/", "-")
  ).reverse();

  // Créer un objet pour stocker les données par mois
  const dataByMonth = usersByDate?.reduce((acc, user) => {
    const month = user[1];
    acc[month] = user[0];
    return acc;
  }, Object.fromEntries(allMonths.map((month) => [month, 0])));

  /**
   * transformations des données dans un json
   */
  const jsonData = {
    labels: allMonths,
    datasets: [
      {
        label: "Utilisateurs inscrits",
        data: allMonths.map((month) => dataByMonth[month]),
      },
    ],
  };

  //assure que nb n'est pas NaN
  const activeUsers = isNaN(nb) ? 0 : Math.max(0, nb - 2);

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 justify-around">
        <div className="col-span-3">
          <label className="flex justify-center">
            Utilisateurs inscrits sur 12 mois glissants
          </label>
          {jsonData ? (
            <Line
              data={jsonData}
              options={{
                borderColor: ["#87bb34"],
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          ) : (
            <p>Aucune valeur à afficher</p>
          )}
        </div>
        <div className="flex flex-col mr-4">
          <span className="font-jakartaSans text-xl text-center mb-8">
            Nombre d'utilisateurs actifs :
          </span>
          <span className="btnKawaaGreenCo text-white text-center font-semibold py-2 px-4 rounded-3xl font-jakartaSans">
            {activeUsers}
          </span>
        </div>
      </div>
      <p className="font-jakartaSans text-xs text-center mt-8">
        Nombre de nouveaux utilisateurs par mois sur les 12 derniers mois et
        nombre d'utilisateurs actifs (hors administrateurs).
      </p>
    </div>
  );
}

export default StatUtilisateursActifs;
