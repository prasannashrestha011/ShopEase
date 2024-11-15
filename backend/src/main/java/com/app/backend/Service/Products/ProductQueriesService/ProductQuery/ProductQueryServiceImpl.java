package com.app.backend.Service.Products.ProductQueriesService.ProductQuery;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.Entities.ProductQueries.ProductQueryEntity;
import com.app.backend.Entities.ProductQueries.QueryReplyEntity;
import com.app.backend.Repositories.QueryRepositories.ProductQueryRepository;
import com.app.backend.Repositories.QueryRepositories.QueryReplyRepository;

@Service
public class ProductQueryServiceImpl implements ProductQueryService {

    @Autowired
    ProductQueryRepository productQueryRepo;

    @Autowired
    QueryReplyRepository queryReplyRepo;

    @Override
    public List<ProductQueryEntity> getProductQueriesById(String productId) {
        return productQueryRepo.findByProductId(productId);
    }

    @Override
    public List<ProductQueryEntity> getQueriesBySellerId(String sellerId) {
        return productQueryRepo.findBySellerId(sellerId);
    }

    @Override
    public String InsertProductQuery(ProductQueryEntity productQueryEntity) {
        productQueryRepo.save(productQueryEntity);
        return "query inserted";
    }

    @Override
    public String InsertQueryReply(QueryReplyEntity queryReplyEntity) {

        queryReplyRepo.save(queryReplyEntity);
        return "query reply inserted";
    }

}
