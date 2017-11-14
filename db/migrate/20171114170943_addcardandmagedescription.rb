class Addcardandmagedescription < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :description, :text
    add_column :mages, :ability, :text
  end
end
