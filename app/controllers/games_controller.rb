class GamesController < ApplicationController
    layout "reviews"
    
    def new
        if user_signed_in?
            if current_user.birthday != nil
                if flash[:alert] = current_user.adult
                    redirect_to games_select_game_path
                end
            end
            @game = Game.new
        else
            logged_in
        end
    end

    def create
        game = Game.new(game_params)
        if game.save
            redirect_to new_game_review_path(game.id)
        else 
            flash[:message] = game.e
            redirect_to new_game_path 
        end
    end

    def select_game 
        @games = Game.all   
    end 

    def select 
        redirect_to new_game_review_path(params[:games])
    end
    
    def game_overview
        @games = Game.all
        render layout: "root" unless user_signed_in?
    end

    def overview 
        redirect_to game_path(params[:games])
    end

    def show
        @users = User.all
        @game = Game.find(params[:id])
        render layout: "root" unless user_signed_in?
        respond_to do |format|
            format.html {render :show}
            format.json {render json: [@users, @game]}
        end
    end    

    def edit
        if user_signed_in? 
            @game = Game.find(params[:id])
            unless current_user == @game.reviews.first.user
                flash[:alert] = "Only the creator of this Game can edit it!"
                redirect_to game_path(@game)
            end
        else 
            logged_in
        end   
    end

    def update
        game = Game.find(params[:id])
        game.update(game_params)
        if game.save
            redirect_to game_path(game)
        else
            flash[:message] = game.e
            redirect_to edit_game_path(game)
        end
    end

    def destroy
        if user_signed_in?
            game = Game.find(params[:id])
            if current_user == game.reviews.first.user
                flash[:alert] = "Your game #{game.name} has successfully been deleted!"
                game.delete
                redirect_to games_game_overview_path
            else 
                flash[:alert] = "Only the Game creator can delete it!"
                redirect_to game_path(game)
            end
        else 
            logged_in
        end
    end

    private
        def game_params
            params.require(:game).permit(:name, :description, :platform, :rating)
        end
end
