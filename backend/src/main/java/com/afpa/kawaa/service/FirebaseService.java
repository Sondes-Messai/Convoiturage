package com.afpa.kawaa.service;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FirebaseService {
    /**
     * Initializes the Firebase app.
     *
     * @param event The ApplicationReadyEvent
     */
    void init(ApplicationReadyEvent event);

    /**
     * Saves the provided file to Firebase Storage.
     *
     * @param file The file to save
     * @return The URL of the saved file
     */
    String saveFile(MultipartFile file, String directoryName);

    /**
     * generates a random file name for the provided file.
     *
     * @param originalFileName The original file name
     * @return The generated file name
     */
    String generateFileName(String originalFileName);

    /**
     * Returns the extension of the provided file name.
     *
     * @param originalFileName The original file name
     * @return The extension of the file name
     */
    String getExtension(String originalFileName);

}
