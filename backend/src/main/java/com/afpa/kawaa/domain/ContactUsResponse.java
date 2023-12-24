package com.afpa.kawaa.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Random;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "contact_us_response")
public class ContactUsResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = new Random().nextLong();
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "contact_us_response_generator")
    @SequenceGenerator(name="contact_us_response_generator", sequenceName = "contact_us_response_generator", allocationSize=1, initialValue = 1000)
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_date")
    private LocalDateTime date;

    @Column(name = "subject")
    @NotBlank
    private String subject;

    @Column(name = "content")
    @Size(min = 0, max = 254)
    private String content;

    @ManyToOne
    @JoinColumn(name = "contact_us_id")
    @JsonIgnore
    private ContactUsForm contact_us;
}
