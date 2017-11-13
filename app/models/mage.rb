class Mage < ApplicationRecord
  has_many :games_mages
  has_many :games, through: :games_mages
  has_many :players, through: :games_mages
end
