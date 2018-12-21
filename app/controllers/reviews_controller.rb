class ReviewsController < ApplicationController
    require 'pry'
    def index
        @reviews = Review.all
    end

    def game   
    end

    def new
        @review = Review.new(game_id: params[:game_id])
        #@review.reviews.new #i think this is empty
        #binding.pry
    end
end
