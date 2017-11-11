class RenameImgNameColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :mages, :img_name, :image_name
  end
end
