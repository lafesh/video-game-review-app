class ReviewsController < ApplicationController
    require 'pry'
    def index
        @reviews = Review.all
    end

    def new
        @review = Review.new(game_id: params[:game_id], user_id: current_user.id)
    end

    def create
        @review = Review.create(review_params)
        
        redirect_to game_review_path(@review.game, @review)
    end

    def show
        @review = Review.find(params[:id])
    end

    private
        def review_params
            params.require(:review).permit(:title, :content, :rating, :recommend, :user_id, :game_id)
        end
end
