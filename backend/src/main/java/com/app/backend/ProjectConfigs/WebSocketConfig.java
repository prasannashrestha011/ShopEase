package com.app.backend.ProjectConfigs;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // Subscribe to this topic
        registry.setApplicationDestinationPrefixes("/app"); // Send to this destination
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws") // The WebSocket endpoint
                .setAllowedOriginPatterns("http://localhost:3000") // Adjust according to your client URL// Allow //
                                                                   // connections from any origin (for testing purposes)
                .withSockJS(); // Optional, for fallback options if WebSocket is not supported
    }
}
