class ReviewsController < ApplicationController
    require 'pry'
    def index
        if user_signed_in?
            @revs = current_user.reviews
            @games = Game.all
            @user = current_user
            respond_to do |format|
                format.html {render :index}
                format.json {render json: @revs}
            end
        elsif params[:game_id]
            @reviews = Game.find(params[:game_id]).reviews 
            respond_to do |format|
                format.html {render :'games/show'}
                format.json {render json: @reviews}
            end
        end
    end

    def new
        if user_signed_in?
            @review = Review.new(game_id: params[:game_id], user_id: current_user.id)
            if current_user.birthday != nil
                if flash[:alert] = @review.age_restriction
                    redirect_to root_path
                end
            end
            respond_to do |format|
                format.html {render :new}
                format.json {render json: @review}
            end
        else
            logged_in
        end
    end

    def create
        review = Review.new(review_params)
        
        if review.save
            @game = Game.find(params[:review][:game_id])
            respond_to do |format|
                format.html {render :'games/show'}
                format.json {render json: [review, @game]}
            end
        else
            flash[:message] = review.e
            redirect_to new_game_review_path(review.game.id)
        end 
    end

    def show
        @review = Review.find(params[:id])
        @reviews = current_user.reviews
        respond_to do |format|
            format.html {render :show}
            format.json {render json: @reviews}
        end
    end

    def edit
        if user_signed_in?
            @review = Review.find(params[:id])
            unless current_user == @review.user
                flash[:alert] = "Only the creator of this Review can edit it!"
            redirect_to game_review_path(@review.game, @review)
            end
        else 
            logged_in
        end   
    end

    def update
        review = Review.find(params[:id])
        review.update(review_params)
        if review.save
            redirect_to game_review_path(review.game, review)
        else
            flash[:alert] = review.e
            redirect_to edit_game_review_path(review.game, review)
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
            logged_in
        end
    end

    private
        def review_params
            params.require(:review).permit(:title, :content, :rating, :recommend, :user_id, :game_id)
        end
end
