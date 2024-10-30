package com.app.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.backend.Entities.FileEntity;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, String> {

}
