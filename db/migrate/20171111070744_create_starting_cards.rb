class CreateStartingCards < ActiveRecord::Migration[5.1]
  def change
    create_table :starting_cards do |t|
      t.string :mage, null: false
      t.string :card, null: false
      t.integer :quantity, null: false
      t.timestamps
    end
  end
end
