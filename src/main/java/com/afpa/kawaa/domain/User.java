package com.afpa.kawaa.domain;

import com.afpa.kawaa.domain.enume.StatusUser;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "account")
public class User implements UserDetails, Serializable {

    @Serial
    private static final long serialVersionUID = -5960633078962356939L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_generator")
    @SequenceGenerator(name="user_generator", sequenceName = "user_generator", allocationSize=1, initialValue = 1000)
    @Column(name = "id")
    private Long id;

    @ToString.Exclude
    @ManyToMany
    @JsonIgnoreProperties("user")
    @JoinTable(name = "account_preferences",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "preferences_id"))
    private Set<Preference> preferences = new LinkedHashSet<>();

    @ToString.Exclude
    @OneToOne
    @JoinColumn(name = "site_id")
    private Site site;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "role_label")
    private Role role;

    @ToString.Exclude
    @JsonIgnoreProperties("user")
    @OneToMany(orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private Set<Car> cars = new LinkedHashSet<>();

    @ToString.Exclude
    @ManyToMany
    @JsonIgnoreProperties("user")
    @JoinTable(name = "account_conversations",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "conversations_id"))
    private Set<Conversation> conversations = new LinkedHashSet<>();

    @ToString.Exclude
    @JsonIgnoreProperties("user")
    @OneToMany(orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private Set<Message> messages = new LinkedHashSet<>();

    @ToString.Exclude
    @ManyToMany
    @JsonIgnoreProperties("user")
    @JoinTable(name = "account_rides",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "rides_id"))
    private Set<Ride> rides = new LinkedHashSet<>();

    @ToString.Exclude
    @OneToMany(orphanRemoval = true)
    @JsonIgnoreProperties("user")
    @JoinColumn(name = "user_id")
    private Set<Reservation> reservations = new LinkedHashSet<>();;


    @Column(name="first_name")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\u00C0-\\u017F\\s-]+$", message ="Le nom ne doit contenir au moins 2 character et valide" )
    @Size(min = 2, max=50)
    private String firstName;

    @Column(name="last_name")
    @Size(min = 2, max=50)
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\u00C0-\\u017F\\s-]+$", message ="Le prenom ne doit contenir au moins 2 character et valide" )
    private String lastName;

    @Column(name = "phone")
    @Size(min = 10)
    @Pattern(regexp = "^(?:(?:\\+33|0)[1-9](?:[\\s.-]?[0-9]{2}){4})$", message = "doit etre au format +33 1 05 32 78 96 ou 06 50 42 33 21 ou 0650423698 ou 06.50.42.69.87")
    private String phone;

    @NotBlank
    @Column(name="matricule")
    private String matricule;

    @Email
    @NotBlank
    @Column(name="mail")
    private String mail;

    @Column(name="token")
    private String token;

    @Column(name="password")
    @NotBlank
    @Size(min = 2, max=255)
    @Pattern(regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[a-zA-Z\\d\\W]+$" , message = "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial avec un minimum de 8 caractéres et 254 au maximum")
    private String password;

    @Column(name = "created_date")
    @NotNull
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime createdDate;

    @Nullable
    @Transient
    Boolean rememberMe=false;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusUser status;

    @ToString.Exclude
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "picture_id")
    private Picture picture;


    @PrePersist
    void preInsert(){
        if(this.picture == null){
            this.picture = new Picture("https://zupimages.net/up/23/35/nnaa.png");
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.getLabel()));
    }

    @Override
    public String getUsername() {
        return mail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return status !=StatusUser.BLOCKED;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status !=StatusUser.INACTIF&& status !=StatusUser.ARCHIVED&& status !=StatusUser.BLOCKED;
    }
}
