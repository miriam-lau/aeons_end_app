class RenameImgNameColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :cards, :img_name, :image_name
  end
end
