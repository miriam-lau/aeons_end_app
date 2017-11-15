class MagesController < ApplicationController

  # API endpoint that returns the mages as a JSON object. It is an array of
  # objects of type Mage.
  def index
    @mages = Mage.all
    render :json => @mages.to_json(:methods => [:total_games, :total_wins])
  end

  # API endpoint that returns the starting cards for each mage as a JSON object.
  # It is an array of objects of type StartingCard.
  def starting_cards
    @starting_cards = StartingCard.all
    render :json => @starting_cards
  end
end
