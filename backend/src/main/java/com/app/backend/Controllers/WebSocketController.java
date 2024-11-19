package com.app.backend.Controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.app.backend.Entities.TransactionEntity;

@Controller
public class WebSocketController {
    @MessageMapping("/message")
    @SendTo("/topic/broadcast")
    public String sendLiveUpdate(String message) {
        return "Received Message " + message;
    }

    @MessageMapping("/insert/productRequest")
    @SendTo("/topic/broadcast")
    public TransactionEntity addProductRequest(TransactionEntity productDetails) {
        return productDetails;
    }
}
