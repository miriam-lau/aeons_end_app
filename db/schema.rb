# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171114170943) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.string "name", null: false
    t.integer "cost", null: false
    t.string "image_name"
    t.integer "category", null: false
    t.integer "card_type", null: false
    t.text "description"
  end

  create_table "games", force: :cascade do |t|
    t.datetime "time", null: false
    t.boolean "won", null: false
    t.integer "difficulty"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "nemesis_id"
    t.index ["nemesis_id"], name: "index_games_on_nemesis_id"
  end

  create_table "games_mages", force: :cascade do |t|
    t.bigint "game_id"
    t.bigint "mage_id"
    t.bigint "player_id"
    t.index ["game_id"], name: "index_games_mages_on_game_id"
    t.index ["mage_id"], name: "index_games_mages_on_mage_id"
    t.index ["player_id"], name: "index_games_mages_on_player_id"
  end

  create_table "games_market_cards", force: :cascade do |t|
    t.bigint "game_id"
    t.bigint "card_id"
    t.index ["card_id"], name: "index_games_market_cards_on_card_id"
    t.index ["game_id"], name: "index_games_market_cards_on_game_id"
  end

  create_table "mages", force: :cascade do |t|
    t.string "name", null: false
    t.string "image_name", null: false
    t.text "ability"
  end

  create_table "nemeses", force: :cascade do |t|
    t.string "name", null: false
    t.integer "difficulty", null: false
    t.string "image_name", null: false
  end

  create_table "players", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "starting_cards", force: :cascade do |t|
    t.bigint "mage_id"
    t.bigint "card_id"
    t.integer "quantity", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_id"], name: "index_starting_cards_on_card_id"
    t.index ["mage_id"], name: "index_starting_cards_on_mage_id"
  end

end
