package com.app.backend.App_class;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProductDetails {
    private String productId;
    private String productName;
    private Long productPrice;
    private String productDes;
}
