class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token

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

  # API endpoint to save a new game to the database. Refer to game_params to
  # see the list of parameters used to save a game.
  def create
    @game = Game.new(game_params)
    if @game.save!
      redirect_to "http://localhost:3000/games"
    else
      render :json => @game.errors
    end
  end

  # API endpoint that returns all the mages played in all the games as a JSON
  # object. It is an array of objects of type GamesMage.
  def get_game_mages
    @game_mages = GamesMage.all
    render :json => @game_mages
  end

  # API endpoint to save a game mage played in the game to the database. Refer
  # to game_mage_params to see the list of parameters used to save a game mage.
  def create_game_mage
    @game_mage = GamesMage.new(game_mage_params)
    if @game_mage.save!
      redirect_to "http://localhost:3000/games/get_game_mages"
    else
      render :json => @game_mage.errors
    end
  end

  # API endpoint that returns all the market cards played in all the games as a
  # JSON object. It is an array of objects of type GamesMarketCard.
  def get_game_market_cards
    @game_market_cards = GamesMarketCard.all
    render :json => @game_market_cards
  end

  # API endpoint to save a market card used in a game to the database. Refer to
  # game_market_card_params to see the list of parameters used to save a
  # market card.
  def create_game_market_card
    @game_market_card = GamesMarketCard.new(game_market_card_params)
    if @game_market_card.save!
      redirect_to "http://localhost:3000/games/get_game_market_cards"
    else
      render :json => @game_market_card.errors
    end
  end

  private

  # The parameters passed into Game to create a new game object. The params are
  # written as symbols in this function.
  # @param [String] game the string "game" is the key that is matched.
  # @param [Object] time a date object.
  # @param [Boolean] won set to true if players won the game.
  # @param [Integer] difficulty the difficulty level of the game ranges from
  # 1 to 10.
  # @param [Integer] nemesis_id the id of the nemesis in the game.
  def game_params
    params.require(:game).permit(:time, :won, :difficulty, :nemesis_id)
  end

  # The parameters passed into GamesMage to create a new game mage object.
  # The params are written as symbols in this function.
  # @param [String] game_mage the string "game_mage" is the key that is matched.
  # @param [Integer] game_id the id of the associated game.
  # @param [Integer] mage_id the id of the mage.
  # @param [Integer] player_id the id of the person who played the mage.
  def game_mage_params
    params.require(:game_mage).permit(:game_id, :mage_id, :player_id)
  end

  # The parameters passed into GamesMarketCard to create a new game market card
  # object. The params are written as symbols in this function.
  # @param [String] game_market_card the string "game_market_card" is the key
  # that is matched.
  # @param [Integer] game_id the id of the associated game.
  # @param [Integer] card_id the id of the card.
  def game_market_card_params
    params.require(:game_market_card).permit(:game_id, :card_id)
  end
end
