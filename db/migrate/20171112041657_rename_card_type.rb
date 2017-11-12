class RenameCardType < ActiveRecord::Migration[5.1]
  def change
    remove_column :cards, :type
    add_column :cards, :card_type, :integer
  end
end
