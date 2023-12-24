package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.ContactUsForm;
import com.afpa.kawaa.domain.enume.StatusUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactUsFormRepository extends JpaRepository<ContactUsForm, Long> {

    Optional<ContactUsForm> findById(Long id);

    Page<ContactUsForm> findContactUsFormByStatus(Pageable page, Boolean status);

    /**
     * récupère le total des formulaires par mois
     * @return
     */
    @Query("SELECT COUNT(c) as totalContactCount, " +
            "CONCAT(TO_CHAR(EXTRACT(MONTH FROM c.createdDate), 'FM00'), '-', EXTRACT(YEAR FROM c.createdDate)) as creationMonthYear " +
            "FROM ContactUsForm c " +
            "GROUP BY creationMonthYear")
    List<Object[]> countContactByCreationDate();

    /**
     * récupère les formulaires par mois qui ont été traités
     * @return
     */
    @Query("SELECT COUNT(c) as totalContactCount, " +
            "CONCAT(TO_CHAR(EXTRACT(MONTH FROM c.createdDate), 'FM00'), '-', EXTRACT(YEAR FROM c.createdDate)) as creationMonthYear " +
            "FROM ContactUsForm c " +
            "LEFT JOIN c.responses r " +
            "WHERE r IS NOT NULL " +
            "GROUP BY creationMonthYear")
    List<Object[]> countTreatedContactByCreationDate();

    @Query("SELECT c as totalContact, c.createdDate as creationDate, " +
            "MIN(r.date) as responseDate " +
            "FROM ContactUsForm c " +
            "LEFT JOIN c.responses r " +
            "GROUP BY c, c.createdDate")
    List<Object[]> treatmentTime();
}
