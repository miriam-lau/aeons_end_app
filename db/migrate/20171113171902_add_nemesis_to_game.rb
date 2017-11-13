class AddNemesisToGame < ActiveRecord::Migration[5.1]
  def change
    add_reference :games, :nemesis, index: true
  end
end
