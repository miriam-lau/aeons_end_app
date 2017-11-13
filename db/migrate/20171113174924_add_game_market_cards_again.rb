class AddGameMarketCardsAgain < ActiveRecord::Migration[5.1]
  def change
    drop_table :cards_games

    create_table :games_market_cards do |t|
      t.references :games
      t.references :cards
    end
  end
end
