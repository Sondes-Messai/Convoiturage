import React, { useState } from "react";
import { Link } from "react-router-dom";
import StatUtilisateursActifs from "../stats/StatUtilisateursActifs";
import StatTypeTrajets from "../stats/StatTypeTrajets";
import StatContacts from "../stats/StatContacts";

const AdminStatistiques = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  //menu des stats
  const graphs = [
    {
      id: "res",
      name: "Reservations",
    },
    {
      id: "actifs",
      name: "Utilisateurs actifs",
    },
    {
      id: "type",
      name: "Type de trajets",
    },
    {
      id: "contacts",
      name: "Formulaires de contact",
    },
  ];

  /**
   * garde l'index du menu sur lequel l'utilisateur click
   * @param {*} index
   */
  const handleLiClick = async (index) => {
    setFocusedIndex(index);
  };

  return (
    <div className="w-full h-3/6 flex flex-col">
      <span className="font-jakartaSans font-bold text-xl text-center mb-8">
        Statistiques
      </span>
      <div className="grid grid-cols-4 gap-2 pb-16">
        <ul className="pl-8">
          {graphs.map((graph, index) => (
            <li key={graph.id} onClick={() => handleLiClick(index)}>
              <Link
                style={{
                  fontWeight: index == focusedIndex ? "bold" : "normal",
                  borderBottomColor:
                    index == focusedIndex ? "#87bb34" : "#f1f1f1",
                }}
                className="font-jakartaSans text-sm border-b-4 border-grey-afpa-light focus:border-green-afpa focus:font-bold"
              >
                {graph.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="col-span-3">
          {{
            // 0: (<></>),
            1: <StatUtilisateursActifs />,
            2: <StatTypeTrajets />,
            3: <StatContacts/>,
          }[focusedIndex] || (
            <p className="flex justify-center items-center">En construction</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStatistiques;
