class AddColImageToNemesesTable < ActiveRecord::Migration[5.1]
  def change
    add_column :nemeses, :image_name, :string
  end
end
