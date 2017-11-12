class CreatePlayLog < ActiveRecord::Migration[5.1]
  def change
    create_table :players do |t|
      t.string :name, null: false
    end
    
    create_table :games do |t|
      t.datetime :time, null: false
      t.boolean :won, null: false
      t.integer :difficulty
      t.timestamps
    end

    create_table :games_mages do |t|
      t.references :games
      t.references :mages
      t.references :players
    end

    create_table :games_nemeses do |t|
      t.references :games
      t.references :nemeses
    end

    create_table :games_market_cards do |t|
      t.references :games
      t.references :cards
    end
  end
end
