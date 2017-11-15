class GamesController < ApplicationController

  # API endpoint that returns all the games as a JSON object. It is an array of
  # objects of type Game.
  def index
    games = Game.all
    @games = Hash.new
    games.each do |game|
      game_hash = game.as_json(:methods => [:total_games, :total_wins])
      @games[game.id] = game_hash
    end
    render :json => @games
  end
end
