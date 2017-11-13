class FixAssociationTables < ActiveRecord::Migration[5.1]
  def change
    drop_table :games_mages
    drop_table :games_market_cards
    drop_table :starting_cards
    create_table :games_mages do |t|
      t.references :game
      t.references :mage
      t.references :player
    end

    create_table :games_market_cards do |t|
      t.references :game
      t.references :card
    end

    create_table :starting_cards do |t|
      t.references :mage
      t.references :card
      t.integer :quantity, null: false
      t.timestamps
    end
  end
end
