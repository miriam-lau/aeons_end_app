class FixSchema < ActiveRecord::Migration[5.1]
  def change
    change_column :cards, :type, 'integer USING CAST(type as integer)'
    remove_column :cards, :created_at
    remove_column :cards, :updated_at
    change_column :cards, :category, 'integer USING CAST(category as integer)'
    remove_column :mages, :created_at
    remove_column :mages, :updated_at
    remove_column :nemeses, :created_at
    remove_column :nemeses, :updated_at
    remove_column :starting_cards, :mage
    remove_column :starting_cards, :card
    remove_column :starting_cards, :created_at
    remove_column :starting_cards, :updated_at
    add_reference :starting_cards, :mages, index: true
    add_reference :starting_cards, :cards, index: true
  end
end
