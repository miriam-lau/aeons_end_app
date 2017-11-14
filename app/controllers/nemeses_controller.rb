class NemesesController < ApplicationController

  # API endpoint that returns the nemeses as a JSON object. It is an array of
  # objects of type Nemesis.
  def index
    @nemeses = Nemesis.all
    render :json => @nemeses.to_json(:methods => [:total_games, :total_wins])
  end
end
