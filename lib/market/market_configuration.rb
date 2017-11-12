class MarketConfiguration
  attr_accessor :min_cost, :max_cost, :card_type, :num
  def initialize(min_cost, max_cost, card_type, num)
    @min_cost = min_cost
    @max_cost = max_cost
    @card_type = card_type
    @num = num
  end
end
