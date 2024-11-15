package com.app.backend.Repositories.QueryRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.backend.Entities.ProductQueries.QueryReplyEntity;

@Repository
public interface QueryReplyRepository extends JpaRepository<QueryReplyEntity, String> {

}