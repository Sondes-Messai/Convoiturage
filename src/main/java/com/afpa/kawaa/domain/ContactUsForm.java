package com.afpa.kawaa.domain;

import com.afpa.kawaa.domain.enume.StatusUser;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "contact_us")
public class ContactUsForm implements Serializable {
    @Serial
    private static final long serialVersionUID = new Random().nextLong();
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "contact_us_generator")
    @SequenceGenerator(name="contact_us_generator", sequenceName = "contact_us_generator", allocationSize=1, initialValue = 1000)
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "email")
    @NotBlank
    private String email;

    @Column(name = "name")
    @NotBlank
    private String name;

    @Column(name = "first_name")
    @NotBlank
    private String firstName;

    @Column(name = "help")
    @NotBlank
    private String help;

    @Column(name = "about")
    @NotBlank
    private String about;

    @Column(name = "file", length = 2550)
    private String fileUrl;

    @Column(name = "status", columnDefinition = "boolean default false")
    private Boolean status;

    @ToString.Exclude
    @OneToMany(mappedBy = "contact_us", orphanRemoval = true)
    private Set<ContactUsResponse> responses = new LinkedHashSet<>();
}
