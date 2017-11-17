class GamesMage < ApplicationRecord
  belongs_to :game
  belongs_to :mage, optional: true
end
