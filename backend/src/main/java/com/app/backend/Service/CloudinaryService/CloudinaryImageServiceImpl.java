package com.app.backend.Service.CloudinaryService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;

@Service
public class CloudinaryImageServiceImpl implements CloudinaryImageService {
    @Autowired
    Cloudinary cloudinary;

    @Override
    public Map<String, Object> uploadImage(MultipartFile image) {
        try {
            Map<String, Object> options = new HashMap();
            options.put("folder", "product_images");
            Map<String, Object> response = cloudinary.uploader().upload(image.getBytes(), options);
            return response;
        } catch (IOException e) {
            throw new RuntimeException(e);

        }
    }
}
