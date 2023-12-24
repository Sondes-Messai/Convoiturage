import React from "react";
import AccueilCard from "../../components/utils/AccueilCard";
import { AdaptIcon } from "./../../assets/icons/AdaptIcon";
import { EconomicIcon } from "./../../assets/icons/EconomicIcon";
import { EnvironmentIcon } from "./../../assets/icons/EnvironmentIcon";
import { WaveBackground } from "./../../assets/icons/WaveBackground";
import Group_1 from "./../../assets/img/elements-dubg.png";
import Group_2 from "./../../assets/img/Group_2.png";

const AccueilNonConnecte = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-3/5 flex relative">
        <div className="h-3/4 w-full">
          <WaveBackground width="100%" className="h-full" />
        </div>
        <div className="absolute h-full w-full flex">
          <div className="h-full w-1/2 relative">
            <img className="absolute right-10 top-1/4 h-3/4" src={Group_1} />
          </div>
          <div className="h-full w-1/2">
            <img
              className="absolute right-10 top-[21px] h-[95%]"
              src={Group_2}
            />
          </div>
        </div>
      </div>
      <div className="h-2/5 px-52 bg-grey-afpa-light flex justify-around items-center">
        <AccueilCard icon={<AdaptIcon width="50px" height="50px" />}>
          <p className="text-center font-jakartaSans font-bold text-sm mb-4 text-gradient">
            Avantage de l'adaptabilité
          </p>
          <p className="text-center font-jakartaSans font-medium text-[13px]">
            La personnalisation des trajets est l'un des avantages clés du
            covoiturage, offrant aux utilisateurs la possibilité d'adapter leurs
            déplacements en fonction de leurs besoins spécifiques.
          </p>
        </AccueilCard>
        <AccueilCard icon={<EnvironmentIcon width="50px" height="50px" />}>
          <p className="text-center font-jakartaSans font-bold text-sm mb-4 text-gradient">
            Avantages environnementaux
          </p>
          <p className="text-center font-jakartaSans font-medium text-[13px]">
            En partageant une voiture, plusieurs personnes utilisent un seul
            véhicule, réduisant ainsi le nombre de voitures sur la route et les
            émissions de gaz à effet de serre.
          </p>
        </AccueilCard>
        <AccueilCard icon={<EconomicIcon width="50px" height="50px" />}>
          <p className="text-center font-jakartaSans font-bold text-sm mb-4 text-gradient">
            Avantages économiques
          </p>
          <p className="text-center font-jakartaSans font-medium text-[13px]">
            Le covoiturage, c'est partager plus qu'un simple trajet. C'est aussi
            partager les coûts et faire des économies importantes sur les frais
            de transport.
          </p>
        </AccueilCard>
      </div>
    </div>
  );
};

export default AccueilNonConnecte;
