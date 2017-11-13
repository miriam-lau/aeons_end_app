class AddGameMarketCards < ActiveRecord::Migration[5.1]
  def change
    create_join_table :games, :cards
  end
end
