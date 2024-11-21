package com.app.backend.App_class;

import lombok.Setter;

import com.app.backend.Entities.ProductQueries.ProductRatingEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@Setter
@AllArgsConstructor
public class RatingAnalytics {

    private Long totalReviews;
    private Double averageReviewValue;
    private ProductRatingEntity highestRatedReview;
}