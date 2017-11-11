class UpdateNemesesColImageName < ActiveRecord::Migration[5.1]
  def change
    change_column_null :nemeses, :image_name, false
  end
end
