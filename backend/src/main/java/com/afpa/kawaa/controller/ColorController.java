package com.afpa.kawaa.controller;

import com.afpa.kawaa.dto.ColorDto;
import com.afpa.kawaa.service.impl.ColorServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/color")
public class ColorController {

    private final ColorServiceImpl colorService;

    @GetMapping(value = "/allColors")
    public ResponseEntity<List<ColorDto>> getAllColors() {
       return ResponseEntity.ok(colorService.getAllColors());
           }
}
