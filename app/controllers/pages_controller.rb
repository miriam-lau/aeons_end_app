require "#{Rails.root}/lib/market/market_configuration.rb"

class PagesController < ApplicationController

  # Gets a random set of cards with the configuration passed in.
  # @param [Array<MarketConfiguration>] configuration the configuration of
  #     cards for this market.
  # @return [Hash<string, Array<Cards>>} a map from card type to the array of
  #     cards of that type in the market in order of ascending cost.
  def get_market_with_configuration(configuration)
    market_cards = Set.new

    configuration.each do |entry|
      cards = Card.get_market_card_with_criteria(
          entry.min_cost,
          entry.max_cost,
          entry.card_type,
          entry.num,
          market_cards)
      market_cards.merge(cards)
    end

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

  # Gets a standard market configuration.
  # @return [Array<MarketConfiguration>] an array containing the standard
  #     market configuration.
  def get_standard_market_configuration
    configuration = Array.new
    configuration.push(MarketConfiguration.new(
        Card::MIN_COST, 3, :gem, 1))
    configuration.push(MarketConfiguration.new(4, 4, :gem, 1))
    configuration.push(MarketConfiguration.new(
        Card::MIN_COST, Card::MAX_COST, :gem, 1))
    configuration.push(MarketConfiguration.new(
        Card::MIN_COST, Card::MAX_COST, :relic, 2))
    configuration.push(MarketConfiguration.new(Card::MIN_COST, 4, :spell, 2))
    configuration.push(MarketConfiguration.new(5, Card::MAX_COST, :spell, 2))
    return configuration
  end

  def index
  end

  # API endpoint that returns the market cards as a JSON object. It is a hash
  # that contains a mapping from the card_type (Spell, Gem, or Relic) to
  # a list of cards in the market for that type in increasing order of cost.
  def get_market_cards_for_game
    render json: get_market_with_configuration(
        get_standard_market_configuration)
  end
end
