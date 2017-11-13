class CardsController < ApplicationController

  # API endpoint that returns the cards as a JSON object. It is an array of
  # objects of type Card.
  def index
    @cards = Card.all
    puts @cards
    render :json => @cards
  end
end
