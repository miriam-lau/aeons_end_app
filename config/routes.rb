Rails.application.routes.draw do
  get 'pages/index'
  get 'pages/get_market_cards_for_game'
  get 'mages/starting_cards'

  get 'games/get_game_mages'
  post 'games/create_game_mage'

  get 'games/get_game_market_cards'
  post 'games/create_game_market_card'

  resources :cards, :mages, :nemeses, :players, only: :index
  resources :games, only: [:index, :create]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
