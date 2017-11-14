class Game < ApplicationRecord
  has_many :games_mages, :class_name => 'GamesMage'
  has_many :players, through: :games_mages
  has_many :mages, through: :games_mages
  has_many :games_market_cards, :class_name => 'GamesMarketCard'
  has_many :cards, through: :games_market_cards
  belongs_to :nemesis
end
