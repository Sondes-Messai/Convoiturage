package com.afpa.kawaa.controller;


import com.afpa.kawaa.domain.Site;
import com.afpa.kawaa.dto.ChangePassDto;
import com.afpa.kawaa.dto.PreferenceDto;
import com.afpa.kawaa.dto.SiteDto;
import com.afpa.kawaa.dto.UserDto;
import com.afpa.kawaa.exception.PasswordNotMatchException;
import com.afpa.kawaa.exception.SiteNotFoundException;
import com.afpa.kawaa.exception.UserNotFoundException;
import com.afpa.kawaa.service.SiteService;
import com.afpa.kawaa.service.impl.SiteServiceImpl;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/site")
public class SiteController {

    private final SiteService siteService;

    @GetMapping("/all")
    public ResponseEntity<Set<SiteDto>> getAll() {
        return ResponseEntity.ok(siteService.getAll());
    }

    @PostMapping
    @RolesAllowed({"SUPER","ADMIN"})
    public ResponseEntity<Site> siteRegister(@RequestBody SiteDto siteDto){
        System.out.println("controller active");
        return ResponseEntity.ok(siteService.save(siteDto));
    }

    @PutMapping("/{id}")
    @RolesAllowed({"SUPER","ADMIN"})
    public ResponseEntity<String> updateVisibility(@PathVariable Long id, @RequestBody SiteDto siteDto) throws SiteNotFoundException {
        return ResponseEntity.ok(siteService.updateVisibility(id, siteDto));
    }

    @DeleteMapping("/delete/{id}")
    @RolesAllowed({"SUPER","ADMIN"})
    public ResponseEntity<SiteDto> deleteOneSite(@PathVariable Long id) throws SiteNotFoundException {
        return ResponseEntity.ok(siteService.deleteById(id));
    }


}
