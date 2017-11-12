require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first

def getCardTypeEnum(str)
  case str
  when 'Gem'
    return 1
  when 'Relic'
    return 2
  when 'Spell'
    return 3
  else
    raise ArgumentError.new('Invalid card type')
  end
end

def getCardCategoryEnum(str)
  case str
  when 'Common'
    return 1
  when 'Unique'
    return 2
  when 'Market'
    return 3
  else
    raise ArgumentError.new('Invalid card category')
  end
end

puts "---------------------- Seeding Cards -------------------------------"
Card.destroy_all
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Database - Cards.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  c = Card.new
  c.name = row['Name']
  c.cost = row['Cost']
  c.card_type = getCardTypeEnum(row['Type'])
  c.category = getCardCategoryEnum(row['Category'])
  c.image_name = row['Image Name']
  c.save
  puts "#{c.id}, #{c.name}, #{c.cost}, #{c.card_type}, #{c.category}, #{c.image_name}"
end

puts "---------------------- Seeding Mages -------------------------------"
Mage.destroy_all
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Database - Mages.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  m = Mage.new
  m.name = row['Name']
  m.image_name = row['Image Name']
  m.save
  puts "#{m.id}, #{m.name}, #{m.image_name}"
end

puts "---------------------- Seeding Nemeses -------------------------------"
Nemesis.destroy_all
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Database - Nemeses.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  n = Nemesis.new
  n.name = row['Name']
  n.difficulty = row['Difficulty']
  n.image_name = row['Image Name']
  n.save
  puts "#{n.id}, #{n.name}, #{n.difficulty}, #{n.image_name}"
end

puts "-------------------- Seeding Starting Cards -----------------------------"
StartingCard.destroy_all
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Database - StartingCards.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  s = StartingCard.new
  s.mages_id = Mage.find_by_name(row['Mage']).id
  s.cards_id = Card.find_by_name(row['Card']).id
  s.quantity = row['Quantity']
  s.save
  puts "#{s.mages_id}, #{s.cards_id}, #{s.quantity}"
end

puts "----------------------- Finished Seeding ------------------------------"
