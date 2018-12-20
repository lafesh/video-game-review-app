Rails.application.routes.draw do
  devise_for :users

  root to: 'application#welcome'

  resources :games
  resources :reviews

  get '/reviews/game', to: 'reviews#game'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
