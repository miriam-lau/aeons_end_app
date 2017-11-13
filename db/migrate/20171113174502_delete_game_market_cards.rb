class DeleteGameMarketCards < ActiveRecord::Migration[5.1]
  def change
    drop_table :games_market_cards
  end
end
