class NemesesController < ApplicationController

  # API endpoint that returns the nemeses as a JSON object. It is an array of
  # objects of type Nemesis.
  def index
    nemeses = Nemesis.all
    @nemeses = Hash.new
    nemeses.each do |nemesis|
      nemesis_hash = nemesis.as_json(:methods => [:total_games, :total_wins])
      @nemeses[nemesis.id] = nemesis_hash
    end
    render :json => @nemeses
  end
end
