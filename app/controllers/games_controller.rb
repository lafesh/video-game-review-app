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
        game = Game.create(game_params)
        redirect_to new_game_review_path(game.id)
    end

    private
        def game_params
            params.require(:game).permit(:name, :description, :platform, :rating)
        end
end
