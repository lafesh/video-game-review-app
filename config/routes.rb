Rails.application.routes.draw do
  devise_for :users

  root to: 'application#welcome'

  get '/reviews/game', to: 'reviews#game'

  resources :reviews, only: [:index, :create ]

  resources :games do
    resources :reviews, only: [:new, :show]
  end

  

  

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
