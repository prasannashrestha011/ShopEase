package com.app.backend.Service.CloudinaryService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;

@Service
public class CloudinaryImageServiceImpl implements CloudinaryImageService {
    @Autowired
    Cloudinary cloudinary;
    Map<String, Object> options = new HashMap<String, Object>();

    @Override
    public Map<String, Object> uploadImage(MultipartFile image) {
        try {

            options.put("folder", "product_images");
            Map<String, Object> response = cloudinary.uploader().upload(image.getBytes(), options);
            return response;
        } catch (IOException e) {
            throw new RuntimeException(e);

        }
    }

    @Override
    public void deleteCollection() {
        try {

            cloudinary.api().deleteResourcesByPrefix("product_images", null);
        } catch (Exception e) {
            throw new RuntimeException("failed to delete the cloud folder", e);
        }
    }

}
