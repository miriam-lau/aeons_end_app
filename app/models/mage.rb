class Mage < ApplicationRecord
  has_many :games_mages
  has_many :games, through: :games_mages
  has_many :players, through: :games_mages
  has_many :starting_cards
  has_many :cards, through: :starting_cards

  def total_wins
    games.where(won: true).count
  end

  def total_games
    games.count
  end

  def starting_cards_to_quantity
    ret = Hash.new
    starting_cards.each do |starting_card|
      ret[starting_card.card_id] = starting_card.quantity
    end
    return ret
  end
end
