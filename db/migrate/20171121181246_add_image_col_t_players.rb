class AddImageColTPlayers < ActiveRecord::Migration[5.1]
  def change
    add_column :players, :image_name, :string
  end
end
