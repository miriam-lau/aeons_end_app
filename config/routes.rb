Rails.application.routes.draw do
  get 'pages/index'
  get 'pages/get_market_cards_for_game'
  resources :cards, :mages, :nemeses, :players, :games, only: :index
  post 'games/save'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
