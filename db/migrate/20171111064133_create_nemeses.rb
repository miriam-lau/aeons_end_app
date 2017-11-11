class CreateNemeses < ActiveRecord::Migration[5.1]
  def change
    create_table :nemeses do |t|
      t.string :name, null: false
      t.integer :difficulty, null: false
      t.timestamps
    end
  end
end
