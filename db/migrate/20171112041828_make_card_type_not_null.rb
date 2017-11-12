class MakeCardTypeNotNull < ActiveRecord::Migration[5.1]
  def change
    remove_column :cards, :card_type
    add_column :cards, :card_type, :integer, null: false
  end
end
