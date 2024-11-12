package com.app.backend.App_class;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class NotificationBody {
    private String token;
    private String title;
    private String body;
}
