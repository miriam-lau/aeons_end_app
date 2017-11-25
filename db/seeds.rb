require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first

# Returns the enum corresponding to the card type string.
# @param [String] str the string representing the card type.
# @return [Integer] the integer corresponding to the enum for the card type.
def getCardTypeEnum(str)
  Card.card_types.each do |card_type|
    if card_type[0] == str.downcase
      return card_type[1]
    end
  end
  raise ArgumentError.new('Invalid card type')
end

# Returns the enum corresponding to the card category string.
# @param [String] str the string representing the category.
# @return [Integer] the integer corresponding to the enum for the card type.
def getCardCategoryEnum(str)
  Card.categories.each do |category|
    if category[0] == str.downcase
      return category[1]
    end
  end
  raise ArgumentError.new('Invalid card type')
end

puts "---------------------- Seeding Cards -------------------------------"
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Database - Cards.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  c = Card.new
  c.name = row['Name']
  c.cost = row['Cost']
  c.card_type = getCardTypeEnum(row['Type'])
  c.category = getCardCategoryEnum(row['Category'])
  c.image_name = row['Image Name']
  c.description = row['Description']
  c.save!
  puts "#{c.id}, #{c.name}, #{c.cost}, #{c.card_type}, #{c.category}, #{c.image_name}"
end

puts "---------------------- Seeding Mages -------------------------------"
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Database - Mages.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  m = Mage.new
  m.name = row['Name']
  m.image_name = row['Image Name']
  m.ability = row['Ability']
  m.save!
  puts "#{m.id}, #{m.name}, #{m.image_name}"
end

puts "---------------------- Seeding Nemeses -------------------------------"
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Database - Nemeses.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  n = Nemesis.new
  n.name = row['Name']
  n.difficulty = row['Difficulty']
  n.image_name = row['Image Name']
  n.save!
  puts "#{n.id}, #{n.name}, #{n.difficulty}, #{n.image_name}"
end

puts "---------------------- Seeding Players -------------------------------"
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Database - Players.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  p = Player.new
  p.name = row['Name']
  p.image_name = row['Image Name']
  p.save!
  puts "#{p.id}, #{p.name}, #{p.image_name}"
end

puts "-------------------- Seeding Starting Cards -----------------------------"
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Database - StartingCards.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  s = StartingCard.new
  s.mage_id = Mage.find_by_name(row['Mage']).id
  s.card_id = Card.find_by_name(row['Card']).id
  s.quantity = row['Quantity']
  s.save!
  puts "#{s.mage_id}, #{s.card_id}, #{s.quantity}"
end

def create_game_mage(game, mage_name, player_name)
  gm = GamesMage.new
  gm.game_id = game.id
  gm.mage_id = Mage.find_by_name(mage_name).id
  gm.player_id = Player.find_by_name(player_name).id
  gm.save!
end

def create_game_market_card(game, card_name)
  gm = GamesMarketCard.new
  gm.game_id = game.id
  gm.card_id = Card.find_by_name(card_name).id
  gm.save!
end

puts "-------------------- Seeding Games -----------------------------"
if Rails.env.development?
  csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Database - Games.csv'))
  csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
  csv.each do |row|
    g = Game.new
    puts row['Date']
    g.time = DateTime.strptime(row['Date'], '%Y/%m/%d %H:%M%p %Z')
    g.won = row['Won']
    g.difficulty = row['Difficulty']
    g.nemesis_id = Nemesis.find_by_name(row['Nemesis']).id
    g.notes = row['Notes']
    g.save!

    create_game_mage(g, row['Mage 1'], row['Player 1'])
    create_game_mage(g, row['Mage 2'], row['Player 2'])
    create_game_market_card(g, row['Market Card Gem 1'])
    create_game_market_card(g, row['Market Card Gem 2'])
    create_game_market_card(g, row['Market Card Gem 3'])
    create_game_market_card(g, row['Market Card Relic 1'])
    create_game_market_card(g, row['Market Card Relic 2'])
    create_game_market_card(g, row['Market Card Spell 1'])
    create_game_market_card(g, row['Market Card Spell 2'])
    create_game_market_card(g, row['Market Card Spell 3'])
    create_game_market_card(g, row['Market Card Spell 4'])

    puts "#{g.id}, #{g.time}, #{g.won}, #{g.difficulty}, #{g.nemesis_id}"
  end
end

puts "-------------------- Seeding Games -----------------------------"
if Rails.env.production?
  csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Database - Real_Games.csv'))
  csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
  csv.each do |row|
    g = Game.new
    puts row['Date']
    g.time = DateTime.strptime(row['Date'] + " -08:00", '%a, %m/%d/%Y, %H: %M %p %:z')
    g.won = row['Won']
    g.difficulty = row['Difficulty']
    g.nemesis_id = Nemesis.find_by_name(row['Nemesis']).id
    g.notes = row['Notes']
    g.save!

    create_game_mage(g, row['Mage 1'], row['Player 1'])
    create_game_mage(g, row['Mage 2'], row['Player 2'])
    create_game_market_card(g, row['Market Card Gem 1'])
    create_game_market_card(g, row['Market Card Gem 2'])
    create_game_market_card(g, row['Market Card Gem 3'])
    create_game_market_card(g, row['Market Card Relic 1'])
    create_game_market_card(g, row['Market Card Relic 2'])
    create_game_market_card(g, row['Market Card Spell 1'])
    create_game_market_card(g, row['Market Card Spell 2'])
    create_game_market_card(g, row['Market Card Spell 3'])
    create_game_market_card(g, row['Market Card Spell 4'])

    puts "#{g.id}, #{g.time}, #{g.won}, #{g.difficulty}, #{g.nemesis_id}"
  end
end

puts "----------------------- Finished Seeding ------------------------------"
