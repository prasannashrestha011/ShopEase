package com.app.backend.Entities;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users_credentials")
public class UserEntity {
    @Id
    @Column(name = "id", unique = false, nullable = false)
    public String id;

    @Column(name = "username", unique = true, nullable = false)
    public String username;

    @Column(name = "password", nullable = false)
    public String password;

    @Column(name = "user_image", nullable = false)
    public String userImage;

    @Column(name = "created_at", nullable = false)
    public Date createdAt;

    @Column(name = "email", nullable = false, unique = true)
    public String email;

    @Column(name = "address", nullable = false)
    public String address;

    @Column(name = "contact_number", nullable = false)
    public Long contactNumber;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private List<String> roles;

    @PrePersist
    private void OnUserCreate() {
        id = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
        userImage = "https://res.cloudinary.com/ddaobeapp/image/upload/v1730002910/Untitled_design_2_ite60e.png";
        createdAt = new Date(System.currentTimeMillis());
    }
}
