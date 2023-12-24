package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Conversation;
import com.afpa.kawaa.dto.ConversationDto;
import com.afpa.kawaa.dto.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    @Query("SELECT c FROM Conversation c " +
            "WHERE :userId IN (SELECT a.id FROM c.participants a)")
    List<Conversation> getAllByUsersId(Long userId);
}
