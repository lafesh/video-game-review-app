class ReviewsController < ApplicationController
    def index
        @reviews = Review.all
    end

    def game
        
    end

    def new
        @review = Review.new
    end
end
