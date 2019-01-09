module ReviewsHelper
    def rec(review)
        review.recommend ? "Would Recommend" : "Would Not Recommend"
    end
end
