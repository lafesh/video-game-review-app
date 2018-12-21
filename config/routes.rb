Rails.application.routes.draw do
  devise_for :users

  root to: 'application#welcome'

  get '/games/select_game', to: 'games#select_game'
  post '/games/select', to: 'games#select'

  resources :reviews, only: [:index, :create ]

  resources :games do
    resources :reviews, only: [:new, :show]
  end

  

  

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
