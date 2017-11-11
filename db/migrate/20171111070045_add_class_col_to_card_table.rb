class AddClassColToCardTable < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :class, :string, null: false
  end
end
