class PagesController < ApplicationController

  # Gets a random set of cards with the standard market distribution.
  # @return [Hash<string, Array<Cards>>} a map from card type to the array of
  #     cards of that type in the market in order of ascending cost.
  def get_standard_market_distribution
    market_cards = Set.new

    less_than_four_cost_gem =
        Card.get_market_card_with_criteria(
            Card::MIN_COST, 3, :gem, 1, market_cards)
    market_cards.merge(less_than_four_cost_gem)

    four_cost_gem =
        Card.get_market_card_with_criteria(4, 4, :gem, 1, market_cards)
    market_cards.merge(four_cost_gem)

    any_cost_gem =
        Card.get_market_card_with_criteria(
            Card::MIN_COST, Card::MAX_COST, :gem, 1, market_cards)
    market_cards.merge(any_cost_gem)

    any_cost_relics =
        Card.get_market_card_with_criteria(
            Card::MIN_COST, Card::MAX_COST, :relic, 2, market_cards)
    market_cards.merge(any_cost_relics)

    less_than_five_cost_spells =
        Card.get_market_card_with_criteria(
            Card::MIN_COST, 4, :spell, 2, market_cards)
    market_cards.merge(less_than_five_cost_spells)

    greater_than_equal_five_cost_spells =
        Card.get_market_card_with_criteria(
            5, Card::MAX_COST, :spell, 2, market_cards)
    market_cards.merge(greater_than_equal_five_cost_spells)

    ret = Hash.new
    Card.card_types.each do |card_type|
      ret[card_type[0]] = Array.new
    end

    market_cards.each do |card|
      ret[card.card_type].push(card)
    end

    Card.card_types.each do |card_type|
      ret[card_type[0]].sort_by! { |card| [card.cost, card.name] }
    end

    return ret
  end

  def index
  end

  # API endpoint that returns the market cards as a JSON object. It is a hash
  # that contains a mapping from the card_type (Spell, Gem, or Relic) to
  # a list of cards in the market for that type in increasing order of cost.
  def get_market_cards
    render json: get_standard_market_distribution
  end
end
