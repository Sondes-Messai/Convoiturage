import React, { useState, useEffect } from "react";
import statService from "../../services/statService";
import { Line } from "react-chartjs-2";

function StatContacts() {
  const [contactsByDate, setContactsByDate] = useState();
  const [treatedContacts, setTreatedContacts] = useState();
  const [nb, setNb] = useState();

  /**
   * récupère les données du back
   */
  async function loadContacts() {
    const response = await statService.getContactsByCreationDate();
    const response2 = await statService.getTreatedContacts()
    const response3 = await statService.getTreatmentTime();

    setContactsByDate(response);
    setTreatedContacts(response2)
    setNb(response3);
  }

  useEffect(() => {
    loadContacts();
  }, []);

  // Vérifiez si usersByDate est défini
  if (!contactsByDate) {
    return <p>Chargement en cours...</p>;
  }

  // Créer un tableau avec toutes les étiquettes de mois possibles
  const allMonths = Array.from({ length: 12 }, (_, i) =>
    new Date(new Date().setMonth(new Date().getMonth() - i))
      .toLocaleDateString("en-US", { month: "2-digit", year: "numeric" })
      .replace("/", "-")
  ).reverse();

  // Créer un objet pour stocker les données par mois
    const dataByMonth = contactsByDate?.reduce((acc, contact) => {
    const month = contact[1];
    if (!acc[month]) {
      acc[month] = { count1: 0, count2: 0 };
    }
  
    // Utilisation de  contact[0] pour mettre à jour les valeurs
    acc[month].count1 += contact[0];
    return acc;
  }, Object.fromEntries(allMonths.map((month) => [month, 0])));
  
// Mettez à jour les valeurs de count2 avec celles de treatedContacts
treatedContacts?.forEach((contact) => {
  const month = contact[1];
  if (dataByMonth[month]) {
    dataByMonth[month].count2 += contact[0];
  }
});

  /**
   * transformations des données dans un json
   */
  const jsonData = {
    labels: allMonths,
    datasets: [
      {
        label: "Nombre total de formulaires",
        data: allMonths.map(month => dataByMonth[month]?.count1 || 0),
        borderColor: "#898989", 
      },
      {
        label: "Nombre de formulaires traités",
        data: allMonths.map(month => dataByMonth[month]?.count2 || 0),
        borderColor: "#87bb34", 
      },
    ],
  };

  // assure que nb n'est pas NaN
  const timeForTreatment = isNaN(nb) ? 0 : Math.max(0, nb - 2);

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 justify-around">
        <div className="col-span-3">
          <label className="flex justify-center">
            Formulaires de contact reçus sur 12 mois glissants
          </label>
          {jsonData ? (
            <Line
              data={jsonData}
              options={{
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
            Temps moyen de traitement :
          </span>
          <span className="btnKawaaGreenCo text-white text-center font-semibold py-2 px-4 rounded-3xl font-jakartaSans">
            {timeForTreatment}
          </span>
        </div>
      </div>
      <p className="font-jakartaSans text-xs text-center mt-8">
        Nombre total de formulaires de contact par mois sur les 12 derniers mois, nombre de formulaires ayant été traités et
        temps moyen de traitement (en jours).
      </p>
    </div>
  );
}

export default StatContacts;
