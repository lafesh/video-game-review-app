class GamesController < ApplicationController
    layout "reviews"

    def new
        @game = Game.new
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

    def select_game 
        @games = Game.all   
    end 

    def select 
        redirect_to new_game_review_path(params[:games])
    end
    
    def game_overview
        binding.pry
        @games = Game.all
        render layout: "root" unless user_signed_in?
    end

    def overview 
        redirect_to game_path(params[:games])
    end

    def show
        @game = Game.find(params[:id])
        render layout: "root" unless user_signed_in?
    end        

    def edit
        @game = Game.find(params[:id])
    end

    def update
        game = Game.find(params[:id])
        game.update(game_params)
        if game.save
            redirect_to game_path(game)
        else
            flash[:alert] = "Please fill out all the fields!"
            redirect_to edit_game_path(game)
        end
    end

    def destroy
        game = Game.find(params[:id])
        flash[:alert] = "Your game #{game.name} has successfully been deleted!"
        game.delete
        redirect_to games_game_overview_path
    end

    private
        def game_params
            params.require(:game).permit(:name, :description, :platform, :rating)
        end
end
