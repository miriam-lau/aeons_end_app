class CreateMages < ActiveRecord::Migration[5.1]
  def change
    create_table :mages do |t|
      t.string :name, null: false
      t.string :img_name, null: false
      t.timestamps
    end
  end
end
