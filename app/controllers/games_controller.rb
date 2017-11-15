class GamesController < ApplicationController

  # API endpoint that returns all the games as a JSON object. It is an array of
  # objects of type Game.
  def index
    @games = Game.all
    render :json => @games
  end
end
