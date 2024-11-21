package com.app.backend.App_class;

import lombok.Setter;

import com.app.backend.Entities.ProductQueries.ProductRatingEntity;

import lombok.Getter;

@Getter
@Setter
public class RatingAnalytics {

    private Long totalReviews;
    private Long averageReviewValue;
    private ProductRatingEntity highestRatedReview;
}