class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token

  # API endpoint that returns all the games as a JSON object. It is an array of
  # objects of type Game.
  def index
    games = Game.all
    @games = Hash.new
    games.each do |game|
      game_hash = game.as_json(:methods => [:players_to_mages, :market_cards])
      @games[game.id] = game_hash
    end
    render :json => @games
  end

  # API endpoint to save a new game to the database including mage and market
  # card associations.
  def save
    game_params = params[:game]

    game = Game.new
    game.time = game_params[:time]
    game.won = game_params[:won]
    game.difficulty = game_params[:difficulty]
    game.notes = game_params[:notes]

    nemesis_id = game_params[:nemesis_id].to_i
    game.nemesis = Nemesis.find_by(id: nemesis_id)

    if !game.save!
      return
    end

    mage_ids = game_params[:mage_ids]
    player_ids = game_params[:player_ids]

    mage_ids.each_with_index do |id, index|
      game_mage = GamesMage.new
      game_mage.game_id = game.id
      game_mage.mage_id = id
      game_mage.player_id = player_ids[index]

      game_mage.save!
    end

    market_cards = game_params[:market_card_ids]

    market_cards.each do |id|
      game_card = GamesMarketCard.new
      game_card.game_id = game.id
      game_card.card_id = id

      game_card.save!
    end
  end

  def delete
    Game.find(params[:id]).destroy
  end
end
