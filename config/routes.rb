Rails.application.routes.draw do
  get 'pages/index'
  get 'pages/get_market_cards_for_game'
  post 'games/delete'
  resources :cards, :mages, :nemeses, :players, only: :index
  resources :games, only: [:index, :create]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
