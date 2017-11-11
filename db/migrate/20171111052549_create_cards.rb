class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.string :name, null: false
      t.string :type, null: false
      t.integer :cost, null: false
      t.string :img_name
      t.timestamps
    end
  end
end
