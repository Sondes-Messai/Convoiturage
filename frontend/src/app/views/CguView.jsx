import React from "react";
import CurrentPageBar from "../components/utils/CurrentPageBar";

const CGU = () => {
  return (
    <>
      <CurrentPageBar text={"Conditions Générales d'Utilisation"} />
      <div className="px-96 py-10">
        <h2 className="text-xl text-green-afpa font-bold font-jakartaSans">
          Charte des bonnes pratiques du convoiturage
        </h2>
        <br />
        <p className="font-jakartaSans">
          La présente charte a pour vocation à dicter les principes régissant
          les bonnes pratiques inhérentes aux trajets effectués en covoiturage.
          Chaque participant covoitureur, conducteur ou passager, s’engage, en
          signant cette charte, à tout mettre en oeuvre pour que les trajets
          s’effectuent en toute sécurité et dans le respect d’autrui.
        </p>
        <br />
        <details>
          <summary className="text-base text-green-afpa font-bold font-jakartaSans">
            A qui s'adresse ce site ?
          </summary>
          <br />
          <div className="font-jakartaSans">
            <p className="font-bold">
              Ce site est strictement réservé aux salariés de la formation
              professionnelle de l’Afpa désireux de trouver des covoitureurs
              pour leurs trajets réguliers ou ponctuels. Le site Kawaa ! est
              strictement réservé aux personnes majeures.
            </p>
            <p>
              Les utilisateurs sont libres de déterminer les modalités de leurs
              trajets communs. Ils peuvent utiliser leur véhicule personnel mais
              en aucun cas le véhicule de leur employeur.
            </p>
          </div>
        </details>
        <br />
        <details>
          <summary className="text-base text-green-afpa font-bold font-jakartaSans">
            Règles d'utilisation
          </summary>
          <br />
          <div className="font-jakartaSans">
            Le covoiturage est fondé sur l’accord réciproque entre le conducteur
            et les passagers. Cela implique également de :
            <ul className="list-disc">
              <li className="font-jakartaSans ml-5">
                Respecter les accords fixés au préalable (heures et lieux de
                rendez-vous, ou de dépose).
              </li>
              <li className="font-jakartaSans ml-5">
                Respecter les conditions établies sur l’utilisation en
                alternance d’un véhicule ou l’échange de services.
              </li>
              <li className="font-jakartaSans ml-5">
                Maintenir à jour régulièrement les données personnelles (trajet,
                coordonnées, horaires, lieu de travail).
              </li>
              <li className="font-jakartaSans ml-5">
                Prévenir les covoitureurs en cas d’indisponibilité (congés,
                maladie, déplacement professionnel) dans la mesure du possible,
                au moins 24h à l’avance.
              </li>
              <li className="font-jakartaSans ml-5">
                Suivre les règles élémentaires de sécurité, d’hygiène et
                d’amabilité.
              </li>
            </ul>
          </div>
        </details>
        <br />
        <details>
          <summary className="text-base text-green-afpa font-bold font-jakartaSans">
            Engagement des conducteurs
          </summary>
          <br />
          <div className="font-jakartaSans">
            Les conducteurs s'engagent à :
            <ul className="list-disc">
              <li className="font-jakartaSans ml-5">
                Vérifier que leur véhicule est en parfait état de marche et en
                règle avec les contrôles de sécurité obligatoires.
              </li>
              <li className="font-jakartaSans ml-5">
                Ne prendre aucun risque au volant et n’absorber aucun produit
                dangereux pouvant altérer leurs capacités à conduire avec
                vigilance et en toute sécurité.
              </li>
              <li className="font-jakartaSans ml-5">
                Être titulaire d’un permis de conduire en cours de validité.
              </li>
              <li className="font-jakartaSans ml-5">
                Être assuré pour les déplacements domicile-travail et que leur
                contrat d’assurance comporte une clause de Responsabilité Civile
                prenant en charge les passagers en cas d’accident. Il est
                recommandé au conducteur d’informer sa compagnie d’assurance
                qu’il pratique le covoiturage dans le cadre de ses déplacements
                domicile-travail.
              </li>
              <li className="font-jakartaSans ml-5">
                Être en mesure de présenter immédiatement ses papiers à un autre
                utilisateur si celui-ci les lui demande. Pour le conducteur, il
                s’agit des papiers du véhicule, d’assurance et son permis de
                conduire.
              </li>
              <li className="font-jakartaSans ml-5">
                Adopter une conduite prudente et respecter scrupuleusement le
                code de la route. Le conducteur prend la responsabilité de
                conduire les passagers.
              </li>
            </ul>
          </div>
        </details>
        <br />
        <details>
          <summary className="text-base text-green-afpa font-bold font-jakartaSans">
            Engagement des passagers
          </summary>
          <br />
          <div className="font-jakartaSans">
            Les passagers s'engagent à :
            <ul className="list-disc">
              <li className="font-jakartaSans ml-5">
                Ne pas gêner la conduite du conducteur.
              </li>
              <li className="font-jakartaSans ml-5">
                Respecter la propreté du véhicule dans lequel ils sont
                transportés.
              </li>
              <li className="font-jakartaSans ml-5">
                Vérifier que le conducteur est bien titulaire du permis de
                conduire et que la vignette d’assurance placée sur le pare-brise
                est bien à jour.
              </li>
              <li className="font-jakartaSans ml-5">
                Vérifier que le conducteur est assuré pour transporter des
                passagers, dans le cadre de ses déplacements domicile-travail
              </li>
            </ul>
          </div>
        </details>
        <br />
        <details>
          <summary className="text-base text-green-afpa font-bold font-jakartaSans">
            Les frais de transport
          </summary>
          <br />
          <p className="font-jakartaSans">
            Le covoiturage repose en principe sur l’alternance de l’utilisation
            du véhicule ou l’échange de services. Aucune participation aux frais
            n’est mise en place de façon impérative. Il s’agit d’un arrangement
            conclu directement entre les covoitureurs dans lequel l’Afpa
            n’intervient pas. Dans le cas où l’alternance d’utilisation du
            véhicule n’est pas possible l’Afpa préconise l’échange de « services
            » (petit déjeuner, repas à la cantine …).
            <br />
            <span className="italic">
              Il est cependant recommandé que les éventuels échanges d’argent
              entre conducteurs et passagers s’effectuent dans les limites d’une
              indemnisation normale des frais d’essence, de péage et de
              stationnement, sans bénéfice. Le non-respect de cette consigne
              serait susceptible de placer l’utilisateur en infraction vis-à-vis
              de l’administration fiscale et de sa compagnie d’assurance.
            </span>
          </p>
        </details>
        <br />
        <details>
          <summary className="text-base text-green-afpa font-bold font-jakartaSans">
            Responsabilités
          </summary>
          <br />
          <p className="font-jakartaSans">
            Le covoiturage est fondé sur l’accord réciproque entre le conducteur
            et les passagers, les utilisateurs acceptent d’agir sous leur seule
            et entière responsabilité. Les informations d’itinéraire notamment
            sont fournies par les utilisateurs eux-mêmes. Elles n’engagent que
            l’utilisateur ayant fourni l’information. La responsabilité de
            l’Afpa ne saurait être engagée de quelque manière que ce soit et
            notamment en cas de dommages survenant à l’occasion d’un voyage,
            d’un retard ou de l’absence d’un conducteur ou d’un passager ;
            l’Afpa en tant que tiers organisateur ne sera en aucun cas tenu pour
            responsable d’incident résultant de la mise en relation de
            personnes.
          </p>
        </details>
        <br />
        <details>
          <summary className="text-base text-green-afpa font-bold font-jakartaSans">
            Acceptation des conditions d’utilisation
          </summary>
          <br />
          <p className="font-jakartaSans">
            Le site de covoiturage est mis à disposition de l’utilisateur à
            condition que celui-ci accepte sans dérogation les conditions et
            notifications contenues dans la présente charte. Par l’accès et
            l’utilisation de ce site, l’accord de l’utilisateur avec les
            dispositions de la charte est considéré comme donné. Si
            l’utilisateur n’accepte pas les conditions d’utilisation énoncées
            dans la charte comme elles sont, il n’est pas en droit d’utiliser le
            site.
          </p>
        </details>
      </div>
    </>
  );
};

export default CGU;
