package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.User;
import com.afpa.kawaa.domain.enume.StatusUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByMail(String username);

    Optional<User> findByMatriculeOrMail(String matriculeOrEmail, String mail);

    Optional<User> findByMatricule(String matricule);

    Page<User> findByStatus(StatusUser status, Pageable pageable);

    Integer deleteByMailOrMatricule(String mailMatricule, String mailMatricule1);

    Boolean existsByMail(String email);

    @Query("select  u from  User  u where upper(u.firstName) like upper(:name) or upper(u.lastName) like upper(:name) ")
    Page<User> getAllByName(String name, Pageable page);

    @Query("SELECT u FROM User u WHERE (UPPER(u.firstName) LIKE UPPER(:name) OR UPPER(u.lastName) LIKE UPPER(:name)) AND (u.status = :status)")
    Page<User> getAllByNameAndStatus(String name, StatusUser status, Pageable pageable);

    /**
     * récupère les utilisateurs par date de création
     * @return
     */
    @Query("SELECT COUNT(u) as userCount, " +
            "CONCAT(TO_CHAR(EXTRACT(MONTH FROM u.createdDate), 'FM00'), '-', EXTRACT(YEAR FROM u.createdDate)) as creationMonthYear " +
            "FROM User u " +
            "GROUP BY creationMonthYear")

    List<Object[]> countUsersByCreationDate();

    /**
     * récupère le nombre de profils actifs
     * @return
     */
    @Query("SELECT COUNT(u) as userCount FROM User u WHERE u.status='ACTIF'")
    Integer nbActifsUsers();
}