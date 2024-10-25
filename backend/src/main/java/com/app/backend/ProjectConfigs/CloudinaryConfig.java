package com.app.backend.ProjectConfigs;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary getCloudinary() {
        Map<String, Object> config = new HashMap<>();
        config.put("cloud_name", "ddaobeapp");
        config.put("api_key", "525979491223745");
        config.put("api_secret", "_7-A19X4XBwuukG3kMTqthTiMik");
        return new Cloudinary(config);
    }
}
