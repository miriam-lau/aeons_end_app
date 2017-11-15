Rails.application.routes.draw do
  get 'pages/index'
  get 'pages/get_market_cards_for_game'
  get 'mages/starting_cards'
  resources :cards, :mages, :nemeses, :games, :players, only: :index

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
