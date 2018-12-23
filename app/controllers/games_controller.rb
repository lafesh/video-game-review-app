class GamesController < ApplicationController
    layout "reviews"

    def new
        @game = Game.new
    end

    def select_game 
        @games = Game.all   
    end 

    def select 
        redirect_to new_game_review_path(params[:games])
    end

    def create
        game = Game.new(game_params)
        if game.save
            redirect_to new_game_review_path(game.id)
        else 
            flash[:alert] = "Please fill out all the fields"
            redirect_to new_game_path 
        end
    end

    private
        def game_params
            params.require(:game).permit(:name, :description, :platform, :rating)
        end
end
