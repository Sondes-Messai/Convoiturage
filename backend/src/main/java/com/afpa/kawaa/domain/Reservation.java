package com.afpa.kawaa.domain;

import com.afpa.kawaa.domain.enume.StatusReserv;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "reservation")
public class Reservation implements Serializable {

    @Serial
    private static final long serialVersionUID = 108769934172692601L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reservation_generator")
    @SequenceGenerator(name="reservation_generator", sequenceName = "reservation_generator", allocationSize=1, initialValue = 1000)
    @Column(name = "id")
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "ride_id")
    private Ride ride;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_reserv")
    private StatusReserv statusReserv;

    @Column(name = "created_date")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @CreationTimestamp
    private LocalDateTime createdDate;

    @Column(name = "last_modified_date")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @UpdateTimestamp
    private LocalDateTime lastModifiedDate;

    @ToString.Exclude
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "applicant_id")
    private User applicant;

    @ToString.Exclude
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User user;

}
