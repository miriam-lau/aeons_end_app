class GamesMarketCard < ApplicationRecord
  belongs_to :game
  belongs_to :card
end
