package com.afpa.kawaa.service.impl;


import com.afpa.kawaa.security.auth.AuthenticationRequest;
import com.afpa.kawaa.security.auth.AuthenticationResponse;
import com.afpa.kawaa.security.auth.JwtService;
import com.afpa.kawaa.domain.User;
import com.afpa.kawaa.dto.UserDto;
import com.afpa.kawaa.repository.UserRepository;
import com.afpa.kawaa.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final UserServiceImpl userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;




    public AuthenticationResponse register(UserDto userDto) {
        User user = userService.save(userDto);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );
        var user = repository.findByMail(request.email())
                .orElseThrow();
        user.setRememberMe(request.rememberMe());
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}

