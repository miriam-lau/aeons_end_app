class AddColumnNotesToGamesTable < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :notes, :text
  end
end
