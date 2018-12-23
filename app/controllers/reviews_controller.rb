class ReviewsController < ApplicationController
    require 'pry'
    def index
        binding.pry
        @user = current_user
    end

    def new
        @review = Review.new(game_id: params[:game_id], user_id: current_user.id)
    end

    def create
        @review = Review.new(review_params)
        if @review.save
            redirect_to game_review_path(@review.game, @review)
        else
            flash[:alert] = "Please fill out all the fields."
            redirect_to new_game_review_path(@review.game)
        end
    end

    def show
        @review = Review.find(params[:id])
    end

    private
        def review_params
            params.require(:review).permit(:title, :content, :rating, :recommend, :user_id, :game_id)
        end
end
