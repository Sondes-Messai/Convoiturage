package com.afpa.kawaa.controller;


import com.afpa.kawaa.domain.Ride;
import com.afpa.kawaa.dto.RideDto;
import com.afpa.kawaa.dto.RideSearch;
import com.afpa.kawaa.exception.CarNotFoundException;
import com.afpa.kawaa.exception.RideNotFoundException;
import com.afpa.kawaa.service.RideService;
import com.afpa.kawaa.service.impl.RideServiceImpl;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Contrôleur pour la gestion des trajets.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ride")
public class RideController {

    private final RideService rideService;
    private final RideServiceImpl rideServiceImpl;
    private static final Logger logger = LoggerFactory.getLogger(RideController.class);


    /**
     * Récupère tous les trajets.
     * @return Liste des trajets.
     */
    @GetMapping
    @RolesAllowed({"SUPER","ADMIN"})
    public ResponseEntity<List<RideDto>> getAllRides() {
        List<RideDto> rides = rideService.getAll();
        return ResponseEntity.ok(rides);
    }

    /**
     * Récupère un trajet par son ID.
     * @param id L'ID du trajet à récupérer.
     * @return Le trajet correspondant, ou une réponse 404 si non trouvé.
     */
    @GetMapping("/{id}")
    @RolesAllowed({"SUPER","ADMIN","USER"})
    public ResponseEntity<RideDto> getRideById(@PathVariable("id") Long id) throws RideNotFoundException {
        RideDto ride = rideService.getById(id);
        if (ride != null) {
            return ResponseEntity.ok(ride);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Crée un nouveau trajet.
     * @param rideDTO Les données du trajet à créer.
     * @return Le trajet créé, ou une réponse 201 si réussi.
     */
    @PostMapping
    @RolesAllowed({"SUPER","ADMIN","USER"})
    public ResponseEntity<Ride> createRide(@RequestBody RideDto rideDTO) throws CarNotFoundException {
        logger.info("rideDTO : " + rideDTO);
        Ride createdRide = rideService.create(rideDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRide);
    }

    /**
     * Met à jour un trajet existant.
     * @param id L'ID du trajet à mettre à jour.
     * @param rideDTO Les nouvelles données du trajet.
     * @return Le trajet mis à jour, ou une réponse 404 si le trajet n'existe pas.
     */
    @PutMapping("/{id}")
    @RolesAllowed({"SUPER","ADMIN","USER"})
    public ResponseEntity<RideDto> updateRide(@PathVariable("id") Long id, @RequestBody RideDto rideDTO) throws RideNotFoundException {
        RideDto updatedRide = rideService.update(id, rideDTO);
        if (updatedRide != null) {
            return ResponseEntity.ok(updatedRide);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Supprime un trajet.
     * @param id L'ID du trajet à supprimer.
     * @return Une réponse 204 si le trajet a été supprimé avec succès, ou une réponse 404 si le trajet n'existe pas.
     */
    @DeleteMapping("/{id}")
    @RolesAllowed({"SUPER","ADMIN","USER"})
    public ResponseEntity<Void> deleteRide(@PathVariable("id") Long id) {
        boolean deleted = rideService.delete(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Méthode qui récupère la liste des trajets aller simple en fonction des @param
     * @param ridesearch le body contenant deux adresses et la date de départ du trajet.
     * JSON : {
     *     "depart" : X,
     *     "arrival" : Y,
     *     "departDate" : "JJ-MM-AAAATHH:MM:SS"
     * }
     * @return une liste de trajets correspondant à la recherche.
     */
    @PostMapping("/search-ride")
    @RolesAllowed({"SUPER","ADMIN","USER"})
    public ResponseEntity<List<RideDto>> getDailyRidesByDateAndTown(@RequestBody RideSearch ridesearch){
        System.out.println(ridesearch);
        return ResponseEntity.ok(rideService.getDailyRidesByDateAndTown(ridesearch));
    }

    /**
     * renvoie les trajets uniques périmés et les trajets archivés
     * @param search
     * @param number numéro de page
     * @param size taille des pages
     * @param direction sens de tri
     * @param property critère de tri
     * @return
     */
    @GetMapping("/archive")
    @RolesAllowed({"SUPER","ADMIN","USER"})
    public ResponseEntity<List<RideDto>> getArchivedRides(String search, Integer number, Integer size, String direction, String property) {
        Sort.Direction sort = direction.equals("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable page = PageRequest.of(number, size, Sort.by(sort, property));
        List<RideDto> ridesListDto = rideServiceImpl.getArchivedRides();
        return ResponseEntity.ok(ridesListDto);
    }

    /**
     * récupère les trajets par id pour l'affichage dans le front de l'itinéraire
     * @param id trajet à retourner
     * @return informations concernant l'itinéraire
     * @throws RideNotFoundException
     */
    @GetMapping("/archive/{id}")
    @RolesAllowed({"SUPER","ADMIN","USER"})
    public ResponseEntity<RideDto> getArchivedRideById(@PathVariable("id") Long id) throws RideNotFoundException {
        System.out.println(id);
        RideDto ride = rideServiceImpl.getById(id);
        return ResponseEntity.ok(ride);
    }

    /**
     * récupère les trajets uniques non périmés et les autres trajets
     * @return
     */
    @GetMapping("/stat/type")
    public List<Object[]> getRidesByType() {
        return rideServiceImpl.countRidesByType();
    }
}