package com.app.backend.Entities;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class FileEntity {
    @Id

    public String id;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "file_names", joinColumns = @JoinColumn(name = "file_id"))
    @Column(name = "fileName")
    public List<String> fileName;
}
