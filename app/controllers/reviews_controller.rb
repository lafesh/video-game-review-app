class ReviewsController < ApplicationController
    require 'pry'
    def index
        @user = current_user
    end

    def new
        if user_signed_in?
            @review = Review.new(game_id: params[:game_id], user_id: current_user.id)
            if current_user.birthday != nil
                if flash[:alert] = @review.age_restriction
                    redirect_to root_path
                end
            end
        else
            flash[:alert] = "You must be logged in to write a Review!"
            redirect_to games_game_overview_path
        end
    end

    def create
        review = Review.new(review_params)
        if review.save
            redirect_to game_review_path(review.game, review)
        else
            flash[:alert] = "Please fill out all the fields."
            redirect_to new_game_review_path(review.game)
        end 
    end

    def show
        @review = Review.find(params[:id])
    end

    def edit
        if user_signed_in?
            @review = Review.find(params[:id])
            unless current_user == @review.user
                flash[:alert] = "Only the creator of this Review can edit it!"
            redirect_to game_review_path(@review.game, @review)
            end
        else 
            flash[:alert] = "You must be logged in to edit a Review!"
            redirect_to root_path
        end   
    end

    def update
        review = Review.find(params[:id])
        if review.user == current_user
            review.update(review_params)
            if review.save
                redirect_to game_review_path(review.game, review)
            else
                flash[:alert] = "Please make sure that all the fields have content"
                redirect_to edit_game_review_path(review.game, review)
            end
        else
            flash[:alert] = "You can only update your own reviews"
            redirect_to reviews_path
        end
    end

    def destroy
        if user_signed_in?
            review = Review.find(params[:id])
            if review.user == current_user
                review.delete
                flash[:alert] = "Review has been deleted successfully!"
            else
                flash[:alert] = "You cannot delete someone else's review!"
            end
            redirect_to reviews_path
        else
            flash[:alert] = "You must be logged in to delete this Review!"
            redirect_to game_path(review.game)
        end
    end

    private
        def review_params
            params.require(:review).permit(:title, :content, :rating, :recommend, :user_id, :game_id)
        end
end
