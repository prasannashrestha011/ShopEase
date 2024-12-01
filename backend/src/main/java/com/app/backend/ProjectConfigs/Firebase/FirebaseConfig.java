package com.app.backend.ProjectConfigs.Firebase;


import java.io.IOException;
import java.io.InputStream;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {
    @Bean
    public FirebaseApp initializeFirebaseApp() throws IOException {
      
      
        InputStream serviceAccount=getClass().getClassLoader().getResourceAsStream("FireBase/serviceAccount.json");
        
        if(serviceAccount==null){
            throw  new IOException("service account not found");
        }
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
        return FirebaseApp.getInstance();
    }

}
