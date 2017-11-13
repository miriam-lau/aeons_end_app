class DeleteGameNemesis < ActiveRecord::Migration[5.1]
  def change
    drop_table :games_nemeses
  end
end
