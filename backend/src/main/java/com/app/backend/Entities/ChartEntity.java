package com.app.backend.Entities;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users_product_charts")
public class ChartEntity {

    @Id
    @Column(unique=true)
    private String  chartId;


    private String productId;

    private String productName;

    private String userId;

    private Date createdAt;

    @PrePersist
    private void OnCreate(){
        chartId=UUID.randomUUID().toString().substring(0,16);
        createdAt=new Date();
    }
    
}