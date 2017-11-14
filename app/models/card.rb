class Card < ApplicationRecord
  has_many :games_market_cards
  has_many :games, through: :games_market_cards
  has_many :starting_cards
  has_many :mages, through: :starting_cards

  enum card_type: { gem: 1, relic: 2, spell: 3 }
  enum category: { common: 1, unique: 2, market: 3 }

  # The lower bound of the cost of a card. Much larger than anything realistic.
  MIN_COST = 0
  # The upper bound of the cost of a card. Much larger than anything realistic.
  MAX_COST = 100
  # The number of cards in the market.
  NUM_MARKET_CARDS = 9

  # Gets the given number of market cards with the given criteria. Can only
  # be used to generate the market.
  # @param [Integer] min_cost the minimum cost of the cards (inclusive).
  # @param [Integer] max_cost the maximum cost of the cards (inclusive).
  # @param [Symbol] card_type the type of the cards.
  # @param [Integer] num the number of cards to fetch.
  # @param [Set<Card>] the cards to exclude from this search.
  # @return [Set<Card>] the cards matching the criteria. Returns nil on
  #     error.
  def self.get_market_card_with_criteria(
    min_cost, max_cost, card_type, num, excluded_cards)
    ret = Set.new
    cards = Card.where(
        {cost: (min_cost..max_cost),
         card_type: card_type,
         category: :market}).sample(NUM_MARKET_CARDS).each do |card|
      if !excluded_cards.include?(card)
        ret.add(card)
        if ret.length == num
          return ret
        end
      end
    end
    return nil
  end

  def total_wins
    games.where(won: true).count
  end

  def total_games
    games.count
  end
end
