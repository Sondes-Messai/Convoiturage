package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Ride;
import com.afpa.kawaa.domain.enume.TypeRide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface RideRepository extends JpaRepository<Ride, Long> {
    @Query("SELECT r FROM Ride r WHERE r.typeRide = :typeRide AND r.departDate >= :startDate AND r.departDate < :endDate")
    List<Ride> findPastWeeklyRides(TypeRide typeRide, LocalDateTime startDate, LocalDateTime endDate);

    @Query(value = "select r.* " +
            "from ride r " +
            "inner join ride_addresses ra on r.id = ra.addresses_id " +
            "inner join address a on ra.addresses_id = a.id " +
            "where (r.depart_date between :startOfDay and :endOfDay) " +
            "and (r.type_ride like 'UNIQUE') " +
            "and ((a.town_name like :depart and a.type_address like 'START') " +
            "or (a.town_name like :arrival and a.type_address like 'ARRIVAL')) ",
            nativeQuery = true)
    List<Ride> getDailyRidesByDateAndTown(
            @Param("startOfDay") LocalDateTime startOfDay,
            @Param("endOfDay") LocalDateTime endOfDay,
            @Param("depart") String depart,
            @Param("arrival") String arrival
    );


    /**
     * récupère les trajets uniques antérieurs à aujourd'hui
     * @param today passe la date du jour
     * @param type trajets uniques
     * @return
     */
    @Query("SELECT r FROM Ride r WHERE r.departDate <= :today AND r.typeRide = :type")
    List<Ride> findPastSingleRide(
            @Param("today") LocalDateTime today,
            @Param("type") TypeRide type
    );

    List<Ride> findByStatusFalse();



    /**
     * récupère les trajets dont le status est archivé
     * @param status passe le status archivé
     * @return
     */
    @Query("SELECT r FROM Ride r WHERE r.status = :status")
    List<Ride> findArchivedRides(
            @Param("status") Boolean status
    );

    @Query(value = "SELECT * FROM ride r " +
            "WHERE r.driver_id = :idDriver" +
            "AND EXTRACT(HOUR FROM r.depart_date) = EXTRACT(HOUR FROM CAST(:departTime AS timestamp)) " +
            "AND r.type_ride = 'WEEKLY' " +
            "AND r.depart_date >= CAST(:weekStartDate AS timestamp) " +
            "AND r.depart_date < CAST(:weekEndDate AS timestamp)",
            nativeQuery = true)
    List<Ride> findRegularRidesByUserAndHourAndWeek(
            @Param("idDriver") Long idDriver,
            @Param("departTime") LocalDateTime departTime,
            @Param("weekStartDate") LocalDateTime weekStartDate,
            @Param("weekEndDate") LocalDateTime weekEndDate
    );

    /**
     * récupère les trajets par type
     * @return
     */
    @Query("SELECT COUNT(r) as rideCount, r.typeRide as typeRide FROM Ride r WHERE (r.typeRide = 'UNIQUE' AND r.departDate > CURRENT_TIMESTAMP) OR (r.typeRide <> 'UNIQUE' AND r.status = false) GROUP BY r.typeRide")
    List<Object[]> countRidesByType();
}