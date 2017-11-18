class Game < ApplicationRecord
  has_many :games_mages
  has_many :players, through: :games_mages
  has_many :mages, through: :games_mages, dependent: :destroy
  has_many :games_market_cards
  has_many :cards, through: :games_market_cards, dependent: :destroy
  belongs_to :nemesis, optional: true

  def players_to_mages
    ret = Hash.new
    games_mages.each do |games_mage|
      ret[games_mage.player_id] = games_mage.mage_id
    end
    return ret
  end

  def market_cards
    ret = []
    cards.each do |card|
      ret.push(card.id)
    end
    return ret
  end
end
