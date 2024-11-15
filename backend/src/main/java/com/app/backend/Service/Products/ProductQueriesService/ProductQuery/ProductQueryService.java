package com.app.backend.Service.Products.ProductQueriesService.ProductQuery;

import java.util.List;

import com.app.backend.Entities.ProductQueries.ProductQueryEntity;
import com.app.backend.Entities.ProductQueries.QueryReplyEntity;

public interface ProductQueryService {
    List<ProductQueryEntity> getQueriesBySellerId(String sellerId);

    List<ProductQueryEntity> getProductQueriesById(String productId);

    String InsertProductQuery(ProductQueryEntity productQueryEntity);

    String InsertQueryReply(QueryReplyEntity queryReplyEntity);
}
