package com.app.backend.Controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.util.MultiValueMap;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.backend.Entities.FileEntity;
import com.app.backend.Entities.ProductEntity;
import com.app.backend.Repositories.FileRepository;
import com.app.backend.Service.CloudinaryService.CloudinaryImageServiceImpl;

import java.util.ArrayList;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/files")
public class TestController {

    @Autowired
    FileRepository fileRepo;
    @Autowired
    CloudinaryImageServiceImpl cloudinaryImageServiceImpl;
    private static final Logger logger = LoggerFactory.getLogger(TestController.class);

    @PostMapping("/test")
    public String postMethodName(@RequestPart("productEntity") ProductEntity productEntity,
            @RequestParam MultiValueMap<String, MultipartFile> files) {
        logger.info("product name->{}", productEntity.getProductName());
        if (files != null) {
            FileEntity fileEntity = new FileEntity();
            List<String> fileNameList = new ArrayList<String>();
            for (Map.Entry<String, List<MultipartFile>> file : files.entrySet()) {
                var fileList = file.getValue();
                logger.info("id->{}", file.getKey());
                fileEntity.setId(file.getKey().toString());
                for (var image : fileList) {
                    logger.info("name{}", image.getOriginalFilename());
                    logger.info("file type {}", image.getContentType());
                    var fileInfo = cloudinaryImageServiceImpl.uploadImage(image);
                    fileNameList.add(fileInfo.get("secure_url").toString());

                }

                fileEntity.setFileName(fileNameList);
                fileRepo.save(fileEntity);

            }

            return "saved";
        }
        return null;
    }

}
