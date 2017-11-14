class Nemesis < ApplicationRecord
  has_many :games

  def total_wins
    games.where(won: true).count
  end

  def total_games
    games.count
  end
end
