class CardsController < ApplicationController

  # API endpoint that returns the cards as a JSON object. It is an array of
  # objects of type Card.
  def index
    cards = Card.all
    @cards = Hash.new
    cards.each do |card|
      card_hash = card.as_json(:methods => [:total_games, :total_wins])
      @cards[card.id] = card_hash
    end
    render :json => @cards
  end
end
