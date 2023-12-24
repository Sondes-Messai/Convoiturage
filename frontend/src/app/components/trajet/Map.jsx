import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import Adress from "../../models/Adress";
import { NavIcon } from "../../assets/icons/NavIcon";

function Map(props) {
  const [waypoints, setWaypoints] = useState([]);

  useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13);
    const adresses = [];
    props.waypoints.forEach((element) => {
      const adress = new Adress(
        element.id_address,
        { latitude: element.latitude, longitude: element.longitude },
        element.road,
        element.town,
        element.zip_code,
        element.type,
      );
      adresses.push(adress);
    });
    setWaypoints(adresses);
    console.log("Waypoints :", adresses);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
      attribution: "© CartoDB",
    }).addTo(map);

    const icon = L.icon({
      iconUrl: NavIcon,
    });

    const control = L.Routing.control({
      waypoints: [
        {
          latLng: L.latLng(
            adresses[0].coordonnees.latitude,
            adresses[0].coordonnees.longitude,
          ),
          icon: icon,
        },
        {
          latLng: L.latLng(
            adresses[1].coordonnees.latitude,
            adresses[1].coordonnees.longitude,
          ),
          icon: icon,
        },
      ],
      routeWhileDragging: true,
    }).addTo(map);
  }, []);

  return <div id="map" className="w-full h-full"></div>;

  //   TODO - Z-index of navbar scroll menu
}

export default Map;
