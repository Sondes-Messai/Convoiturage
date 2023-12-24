package com.afpa.kawaa.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "color")
@Data
public class Color implements Serializable {

    @Serial
    private static final long serialVersionUID = -1040613648091650960L;

    @Id
    @Column(name = "label")
    private String label;

}
