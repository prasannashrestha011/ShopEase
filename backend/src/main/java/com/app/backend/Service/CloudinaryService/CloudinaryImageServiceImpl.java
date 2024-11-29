package com.app.backend.Service.CloudinaryService;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryImageServiceImpl implements CloudinaryImageService {
    @Autowired
    Cloudinary cloudinary;
    Map<String, Object> options = new HashMap<String, Object>();

    private static final Logger logger=LoggerFactory.getLogger(CloudinaryImageServiceImpl.class);
    @Override
    public Map<String, Object> uploadImage(byte[] image) {
        try {

            options.put("folder", "product_images");
            Map<String, Object> response = cloudinary.uploader().upload(image, options);
            return response;
        } catch (IOException e) {
            throw new RuntimeException(e);

        }
    }

    @Override
    @Async
    public CompletableFuture<Void>  deleteCollection() {
        try {

            cloudinary.api().deleteResourcesByPrefix("product_images", null);
            return CompletableFuture.completedFuture(null);
        } catch (Exception e) {
            throw new RuntimeException("failed to delete the cloud folder", e);
           
        }
    }

    @Override
    @Async
    public CompletableFuture<Void> deleteByPublicId(List<String> publicId) {
      try{
        for (String id : publicId) {
            System.out.println(id);
        }
       Map<String,Object> response= cloudinary.api().deleteResources(publicId,  ObjectUtils.emptyMap());
        
        logger.info("msg {}",response);
        return CompletableFuture.completedFuture(null);
      }catch(Exception e){
        logger.error("error:", e.getMessage());
        throw new RuntimeException("failed to delete the cloud folder", e);
      }
    }
    
}
