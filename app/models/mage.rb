class Mage < ApplicationRecord
  has_many :games_mages
  has_many :games, through: :games_mages
  has_many :players, through: :games_mages

  def total_wins
    games.where(won: true).count
  end

  def total_games
    games.count
  end
end
