package com.app.backend.Service.CloudinaryService;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

public interface CloudinaryImageService {
    public Map<String, Object> uploadImage(byte[] image);

    public CompletableFuture<Void> deleteCollection();

    public CompletableFuture<Void> deleteByPublicId(List<String> publicId);
}
