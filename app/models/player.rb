class Player < ApplicationRecord
  has_many :games_mages
  has_many :games, through: :games_mages
  has_many :mages, through: :games_mages
end
