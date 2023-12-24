package com.afpa.kawaa.service.impl;


import com.afpa.kawaa.domain.Ride;
import com.afpa.kawaa.domain.enume.TypeRide;
import com.afpa.kawaa.dto.RideDto;
import com.afpa.kawaa.dto.RideSearch;
import com.afpa.kawaa.dto.mapper.AddressMapper;
import com.afpa.kawaa.dto.mapper.RideMapper;
import com.afpa.kawaa.exception.CarNotFoundException;
import com.afpa.kawaa.exception.RideNotFoundException;
import com.afpa.kawaa.repository.RideRepository;
import com.afpa.kawaa.service.AddressService;
import com.afpa.kawaa.service.RideService;
import com.afpa.kawaa.utils.DayOfWeekConverter;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class RideServiceImpl implements RideService {
    private final RideRepository rideRepository;
    private final RideMapper rideMapper;
    private final AddressService addressService;
    private final AddressMapper addressMapper;
    private static final Logger logger = LoggerFactory.getLogger(RideServiceImpl.class);




    /**
     * Récupère tous les rides.
     *
     * @return La liste des rides DTO.
     */
    @Override
    public List<RideDto> getAll() {
        return rideRepository.findAll().stream().map(rideMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Récupère un ride par son ID.
     *
     * @param id L'ID du ride à récupérer.
     * @return Le ride DTO correspondant à l'ID, ou null si non trouvé.
     */
    @Override
    public RideDto getById(Long id) throws RideNotFoundException {
        return rideMapper.toDto(findbyID(id));
    }

    public Ride findbyID(Long id) throws RideNotFoundException {
        return rideRepository.findById(id).orElseThrow(RideNotFoundException::new);
    }

    /**
     * Crée un nouveau ride.
     *
     * @param rideDto L'entité ride à créer.
     * @return Le ride DTO créé.
     */
    @Override
    public Ride create(RideDto rideDto) throws CarNotFoundException {
        logger.info("enter create");
        Ride ride = rideMapper.toEntity(rideDto);
        logger.info("dto to entity" + ride);
        if(ride.getTypeRide() == TypeRide.WEEKLY){
            generateWeeklyRides(ride, rideDto);
        }else{
            ride = rideRepository.save(ride);
        }
        return ride;
    }


    /**
     * Met à jour un ride existant.
     *
     * @param id     L'ID du ride à mettre à jour.
     * @param rideDto L'entité ride avec les nouvelles données.
     * @return Le ride DTO mis à jour, ou null si non trouvé.
     */
    @Override
    public RideDto update(Long id, RideDto rideDto) throws RideNotFoundException {
        Ride existingRide = rideRepository.findById(id).orElseThrow(RideNotFoundException::new);
        Ride rideUpdate = rideMapper.partialUpdate(rideDto, existingRide);
        if(rideUpdate.getTypeRide() == TypeRide.WEEKLY) {
            generateWeeklyRides(rideUpdate, rideDto);
            return rideDto;
        }
        return rideMapper.toDto(rideRepository.save(rideUpdate));
    }

    /**
     * Supprime un ride par son ID.
     *
     * @param id L'ID du ride à supprimer.
     * @return true si le ride a été supprimé avec succès, false sinon.
     */
    @Override
    public boolean delete(Long id) {
        if (rideRepository.existsById(id)) {
            rideRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Récupère une liste de trajets correspondant aux identifiants fournis.
     *
     * @param ids Liste des identifiants des trajets à récupérer.
     * @return Liste des trajets correspondants.
     */
    public List<Ride> getRidesByIds(List<Long> ids) {
        return rideRepository.findAllById(ids);
    }


    /**
     * Crée de nouvelles instances de trajets hebdomadaires en se basant sur les trajets existants avec une récurrence hebdomadaire.
     * Cette méthode est programmée pour s'exécuter chaque dimanche à minuit.
     * Elle récupère les trajets existants avec une récurrence hebdomadaire depuis le dépôt de données et crée de nouvelles instances
     * de trajet pour la semaine à venir.
     *
     * @throws RuntimeException Si une erreur survient lors de la création des trajets ou de leur sauvegarde dans la base de données.
     */
    @Transactional
    @Scheduled(cron = "0 0 * * * SUN")
    public void createWeeklyRide() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime lastWeekStart = currentDateTime.minusWeeks(1).with(DayOfWeek.MONDAY).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime thisWeekStart = currentDateTime.with(DayOfWeek.MONDAY).withHour(0).withMinute(0).withSecond(0);
        List<Ride> pastWeeklyRides = rideRepository.findPastWeeklyRides(TypeRide.WEEKLY, lastWeekStart, thisWeekStart);
        for (Ride originalRide : pastWeeklyRides) {
            // Créer une nouvelle instance de trajet hebdomadaire en utilisant les détails du trajet original
            Ride newRide = new Ride(originalRide);
            newRide.setDepartDate(newRide.getDepartDate().plusWeeks(1));
            newRide.setArrivalDate(newRide.getArrivalDate().plusWeeks(1));// Prochaine semaine
            // Sauvegarder la nouvelle instance de trajet dans la base de données
            rideRepository.save(newRide);
        }
    }

    /**
     * Récupère la liste des informations sur les trajets pour une date de départ spécifique.
     *
     * @param ridesearch Les informations des address et la date de départ des trajets à récupérer.
     * @return Une liste d'informations sur les trajets pour la date de départ spécifiée.
     */
    public List<RideDto> getDailyRidesByDateAndTown(RideSearch ridesearch) {

        LocalDateTime endOfDay = ridesearch.departDate().plusDays(1);
        return rideRepository.getDailyRidesByDateAndTown(ridesearch.departDate(), endOfDay,
                        ridesearch.depart(), ridesearch.arrival()).stream().map(rideMapper::toDto)
                .collect(Collectors.toList());

    }

    /**
     * récupère les trajets archivés et les trajets uniques périmés
     * @return
     */
    public List<RideDto> getArchivedRides() {
        LocalDateTime today = LocalDateTime.now();
        Boolean status = true;
        TypeRide type = TypeRide.valueOf("UNIQUE");
        List<RideDto> archivedRides = new ArrayList<>(rideRepository.findPastSingleRide(today, type).stream().map(rideMapper::toDto).toList());
        archivedRides.addAll(rideRepository.findArchivedRides(status).stream().map(rideMapper::toDto).toList());
        return archivedRides;
    }

    /**
     * Récupère la liste de tous les trajets réguliers pour un utilisateur, une voiture et une heure spécifiques.
     *
     * @param rideDto L'entité ride avec la quelle on va faire la recherche.
     * @return Une liste de trajets réguliers pour les critères spécifiés.
     */
    public List<Ride> getAllRegularRides(RideDto rideDto){
        LocalDateTime now = LocalDateTime.now(); // Maintenant, avec date et heure
        TemporalField fieldISO = WeekFields.of(Locale.FRANCE).dayOfWeek();
        LocalDateTime weekStartDate = now.with(fieldISO, 1).with(LocalTime.MIN); // Lundi de la semaine en cours, à minuit
        LocalDateTime weekEndDate = now.with(fieldISO, 7).plusDays(1).with(LocalTime.MAX); // Dimanche de la semaine en cours, à 23:59:59
        return rideRepository.findRegularRidesByUserAndHourAndWeek(rideDto.getDriverId(), rideDto.getDepartDate(), weekStartDate, weekEndDate);
    }

    /**
     * Récupère les noms abrégés des jours de la semaine à partir d'une liste de trajets.
     *
     * @param rides La liste de trajets.
     * @return Une liste de noms abrégés des jours de la semaine.
     */
    public List<String> getDaysNames(List<Ride> rides){
        return rides.stream().map(e-> e.getDepartDate().getDayOfWeek().toString().substring(0,3)).toList();
    }

    private void generateWeeklyRides(Ride ride, RideDto rideDto) {
        for (String s : rideDto.getDays()) {
            s = s.toUpperCase();
            DayOfWeek dayOfWeek = DayOfWeekConverter.convertToDayOfWeek(s);
            int daysToAdd = dayOfWeek.getValue() - ride.getDepartDate().getDayOfWeek().getValue();
            LocalDateTime newDepartDate = ride.getDepartDate().plusDays(daysToAdd);
            Ride rideWeekly = new Ride(ride);
            rideWeekly.setDepartDate(newDepartDate);
            rideRepository.save(rideWeekly);
        }
    }

    /**
     * recupère les trajtes par type
     * @return
     */
    public List<Object[]> countRidesByType() {
        return rideRepository.countRidesByType();
    }
}