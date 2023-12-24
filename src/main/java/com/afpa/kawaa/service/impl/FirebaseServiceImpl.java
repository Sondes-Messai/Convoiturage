package com.afpa.kawaa.service.impl;

import com.afpa.kawaa.exception.FirebaseInitializationException;
import com.afpa.kawaa.exception.SavedFileException;
import com.afpa.kawaa.service.FirebaseService;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class FirebaseServiceImpl implements FirebaseService {
    /**
     * Firebase storage
     */
    private Storage storage;

    @Value("${application.firebase.bucket-name}")
    private String bucketName;
    @Value("${application.firebase.project-id}")
    private String projectId;
    @Value("${application.firebase.json-file}")
    private String jsonFile;

    /**
     * ititialization of Firebase
     * @param event The ApplicationReadyEvent
     */
    @Override
    @EventListener
    public void init(ApplicationReadyEvent event) {
        try {
            ClassPathResource serviceAccount = new ClassPathResource(jsonFile);
            storage = StorageOptions.newBuilder().
                    setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream())).
                    setProjectId(projectId).build().getService();
        } catch (Exception ex) {
            throw new FirebaseInitializationException("Failed to initialize Firebase Storage");
        }
    }

    /**
     * save a file in Firebase
     * @param file The file to save
     * @param directoryName directory to save the file
     * @return
     */
    @Override
    public String saveFile(MultipartFile file, String directoryName)  {
        directoryName = directoryName + "/";
        String imageName = generateFileName(file.getOriginalFilename());
        Map<String, String> map = new HashMap<>();
        map.put("firebaseStorageDownloadTokens", imageName);
        BlobId blobId = BlobId.of(bucketName, directoryName + imageName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setMetadata(map)
                .setContentType(file.getContentType())
                .build();
        try {
            storage.create(blobInfo, file.getBytes());
        } catch (IOException e) {
            throw new SavedFileException("Failed to save file to Firebase Storage");
        }
        URL url = storage.signUrl(blobInfo, 15, TimeUnit.DAYS);
        return url.toString();
    }

    /**
     * generation of a unique file name
     * @param originalFileName The original file name
     * @return
     */
    @Override
    public String generateFileName(String originalFileName) {
        return UUID.randomUUID() + "." + getExtension(originalFileName);
    }

    /**
     * generation of the extension of the file
     * @param originalFileName The original file name
     * @return
     */
    @Override
    public String getExtension(String originalFileName) {
        return StringUtils.getFilenameExtension(originalFileName);
    }
}
