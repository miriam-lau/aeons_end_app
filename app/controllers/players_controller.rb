class PlayersController < ApplicationController

  # API endpoint that returns the players as a JSON object. It is an array of
  # objects of type Player.
  def index
    @players = Player.all
    render :json => @players.to_json(:methods => [:total_games, :total_wins])
  end
end
