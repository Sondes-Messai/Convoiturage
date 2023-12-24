package com.afpa.kawaa.controller;

import com.afpa.kawaa.domain.enume.StatusUser;
import com.afpa.kawaa.dto.ConversationDto;
import com.afpa.kawaa.dto.UserDto;
import com.afpa.kawaa.exception.ConversationNotFoundException;
import com.afpa.kawaa.service.ConversationService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/conversation")
@Slf4j
public class ConversationController {

    private final ConversationService conversationService;

    @GetMapping("/{id_user}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<List<ConversationDto>> getByUserId(@PathVariable Long id_user){
        return ResponseEntity.ok(conversationService.getByUserId(id_user));
    }
    @GetMapping("/chat/{id}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<ConversationDto> findById(@PathVariable Long id) throws ConversationNotFoundException {
        return ResponseEntity.ok(conversationService.findById(id));
    }

    @GetMapping("/search")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<List<ConversationDto>> findAll(String search, Integer number, Integer size, String direction, String property){
        Sort.Direction sort = direction.equals("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable page = PageRequest.of(number, size, Sort.by(sort, property));
        return ResponseEntity.ok(conversationService.findAll());
    }
}
