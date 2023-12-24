import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import rideService from "../../services/rideService";

const MapView = ({ obj }) => {
  const [latDep, setLatDep] = useState(0);
  const [lonDep, setLonDep] = useState(0);
  const [latArr, setLatArr] = useState(0);
  const [lonArr, setLonArr] = useState(0);
  const [distance, setDistance] = useState(0);
  const [zoom, setZoom] = useState(5);
  const [itineraire, setItineraire] = useState(null);


  console.log("MapView", obj);
  useEffect(() => {
    if (obj && obj.itinery && obj.itinery.geometry) {
      setLatDep(obj.lieuDepart.geometry.coordinates[1]);
      setLonDep(obj.lieuDepart.geometry.coordinates[0]);
      setLatArr(obj.lieuArrivee.geometry.coordinates[1]);
      setLonArr(obj.lieuArrivee.geometry.coordinates[0]);
      setItineraire(obj.itinery.geometry.coordinates);
      setDistance(obj.itinery.distance);
      if (obj.itinery.distance <= 50000) {
        setZoom(11);
      } else if (
        obj.itinery.distance < 100000 &&
        obj.itinery.distance > 50000
      ) {
        setZoom(9);
      } else {
        setZoom(5);
      }
    } else {
      console.log("else");
      loadRide();
    }
  }, [obj]);

  const centre = [(latArr + latDep) / 2, (lonArr + lonDep) / 2];
  const bounds = {
    North: Math.min(latArr, latDep),
    South: Math.max(latArr, latDep),
    East: Math.min(lonArr, lonDep),
    West: Math.max(lonArr, lonDep),
  };
  const coordDepart = [latDep, lonDep];
  const coordArrivee = [latArr, lonArr];
  console.log("bounds", bounds);

  return (
    <>
      {latDep && lonDep && latArr && lonArr ? (
        <div className="flex-col items-center cursor w-4/5 ">
          <MapContainer
            center={centre}
            zoom={zoom}
            minZoom={5}
            maxZoom={13}
            maxBounds={[
              [bounds.South - 50, bounds.West - 50],
              [bounds.North + 50, bounds.East + 50],
            ]}
            scrollWheelZoom={false}
            style={{ height: "400px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              bounds={[
                [bounds.South - 250, bounds.West - 250],
                [bounds.North + 250, bounds.East + 250],
              ]}
              noWrap={true}
            />
            {coordDepart && coordArrivee ? (
              <>
                <CircleMarker
                  center={coordDepart}
                  pathOptions={{ color: "red" }}
                  radius={5}
                >
                  <Popup>
                    {obj.lieuDepart?.properties.city || obj.addresses[1]?.town}
                  </Popup>
                </CircleMarker>
                <CircleMarker
                  center={coordArrivee}
                  pathOptions={{ color: "red" }}
                  radius={5}
                >
                  <Popup>
                    {obj.lieuArrivee.properties.city || obj.addresses[0]?.town}
                  </Popup>
                </CircleMarker>
              </>
            ) : (
              <p>En cours de chargement ...</p>
            )}

            {itineraire && (
              <Polyline
                positions={itineraire.map((coord) => [coord[1], coord[0]])} //met les coordonnées dans le bon sens
                color="red" // Couleur de l'itinéraire
                weight={3} // Épaisseur de la ligne
                opacity={1} // Opacité de la ligne
              />
            )}
          </MapContainer>
        </div>
      ) : (
        <p>En chargement ...</p>
      )}
    </>
  );
};

export default MapView;
