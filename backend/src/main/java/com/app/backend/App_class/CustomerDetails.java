package com.app.backend.App_class;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CustomerDetails {
    private String customerId;
    private String userImage;
    private String username;
    private String email;
    private Long contactNumber;
    private String address;
    private Long postalCode;
    private String province;
}
