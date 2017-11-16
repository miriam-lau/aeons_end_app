class MagesController < ApplicationController

  # API endpoint that returns the mages as a JSON object. It is an array of
  # objects of type Mage.
  def index
    mages = Mage.all
    @mages = Hash.new
    mages.each do |mage|
      mage_hash = mage.as_json(
          :methods => [:total_games, :total_wins, :starting_cards_to_quantity])
      @mages[mage.id] = mage_hash
    end
    render :json => @mages
  end
end
