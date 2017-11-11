require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first
puts "---------------------- Seeding Cards -------------------------------"
Card.destroy_all
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Card List - Cards.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  c = Card.new
  c.name = row['Name']
  c.cost = row['Cost']
  c.type = row['Type']
  c.category = row['Category']
  c.image_name = row['Image Name']
  c.save
  puts "#{c.name}, #{c.cost}, #{c.type}, #{c.category}, #{c.image_name}"
end

puts "---------------------- Seeding Mages -------------------------------"
Mage.destroy_all
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Card List - Mages.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  m = Mage.new
  m.name = row['Name']
  m.image_name = row['Image Name']
  puts "#{m.name}, #{m.image_name}"
  m.save
end

puts "-------------------- Seeding Starting Cards -----------------------------"
StartingCard.destroy_all
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Card List - StartingCards.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  s = StartingCard.new
  s.mage = row['Mage']
  s.card = row['Card']
  s.quantity = row['Quantity']
  s.save
  puts "#{s.mage}, #{s.card}, #{s.quantity}"
end

puts "---------------------- Seeding Nemeses -------------------------------"
Nemesis.destroy_all
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Aeon\'s End Card List - Nemeses.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  n = Nemesis.new
  n.name = row['Name']
  n.difficulty = row['Difficulty']
  n.image_name = row['Image Name']
  n.save
  puts "#{n.name}, #{n.difficulty}, #{n.image_name}"
end

puts "----------------------- Finished Seeding ------------------------------"
