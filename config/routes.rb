Rails.application.routes.draw do
  get 'pages/index'
  get 'pages/get_market_cards'
  resources :cards, :mages, :nemeses, :games, only: :index

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
