class PlayersController < ApplicationController

  # API endpoint that returns the players as a JSON object. It is an array of
  # objects of type Player.
  def index
    players = Player.all
    @players = Hash.new
    players.each do |player|
      player_hash = player.as_json(:methods => [:total_games, :total_wins])
      @players[player.id] = player_hash
    end
    render :json => @players
  end
end
