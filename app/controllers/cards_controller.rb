class CardsController < ApplicationController

  # API endpoint that returns the cards as a JSON object. It is an array of
  # objects.
  def index
    @cards = Card.all
    render :json => @cards
  end
end
