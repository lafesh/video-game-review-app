Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  root to: 'games#game_overview'

  get '/games/select_game', to: 'games#select_game'
  post '/games/select', to: 'games#select'

  post '/games/overview', to: 'games#overview'

  resources :reviews, only: [:index, :create, :update]

  resources :games do
    resources :reviews, except: [:index, :create, :update]
  end

  

  

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
