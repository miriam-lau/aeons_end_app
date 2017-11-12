class RenameCardClass < ActiveRecord::Migration[5.1]
  def change
    rename_column :cards, :class, :category
  end
end
