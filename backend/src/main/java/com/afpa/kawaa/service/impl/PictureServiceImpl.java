package com.afpa.kawaa.service.impl;

import com.afpa.kawaa.domain.Picture;
import com.afpa.kawaa.exception.PictureNotFoundException;
import com.afpa.kawaa.repository.PictureRepository;
import com.afpa.kawaa.service.PictureService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class PictureServiceImpl implements PictureService {
    @Autowired
    private final PictureRepository pictureRepository;

    /**
     * @param id Identifiant de l'image à supprimer.
     * @throws PictureNotFoundException Si aucune image n'est trouvée avec l'identifiant donné.
     */
    @Override
    public void deleteById(Long id) throws PictureNotFoundException {
        Picture pictureToDelete = pictureRepository.findById(id)
                .orElseThrow(PictureNotFoundException::new);
        pictureRepository.delete(pictureToDelete);
    }
}
