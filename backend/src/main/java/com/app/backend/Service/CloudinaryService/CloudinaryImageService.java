package com.app.backend.Service.CloudinaryService;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryImageService {
    public Map<String, Object> uploadImage(MultipartFile image);
}
