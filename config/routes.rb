Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }

  root to: 'games#game_overview'

  get '/games/select_game', to: 'games#select_game'
  post '/games/select', to: 'games#select'

  get '/games/game_overview', to: 'games#game_overview'
  post '/games/overview', to: 'games#overview'

  post '/games/select_user', to: 'games#select_user'

  resources :reviews, only: [:index, :create, :update]

  resources :games do
    resources :reviews, except: [:index, :create, :update]
  end

  

  

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
