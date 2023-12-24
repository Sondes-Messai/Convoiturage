package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT c FROM Message c WHERE :conversationId = c.conversation.id")
    List<Message> getMessagesByConversationId(Long conversationId);
}
