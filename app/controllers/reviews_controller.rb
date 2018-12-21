class ReviewsController < ApplicationController
    def index
        @reviews = Review.all
    end

    def game   
    end

    def new
        @review = Game.find(params[:game_id]).reviews.new #i think this is empty. pry!!
    end
end
