package com.app.backend.Service.CloudinaryService;

import java.util.Map;

public interface CloudinaryImageService {
    public Map<String, Object> uploadImage(byte[] image);

    public void deleteCollection();
}
