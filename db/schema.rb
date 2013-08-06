# encoding: UTF-8
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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130806212138) do

  create_table "portfolios", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "user_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "portfolios_repos", :force => true do |t|
    t.integer "portfolio_id"
    t.integer "repo_id"
  end

  create_table "repos", :force => true do |t|
    t.string   "name"
    t.string   "html_url"
    t.string   "homepage_url"
    t.hstore   "languages"
    t.hstore   "collaborators"
    t.integer  "user_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "login"
    t.string   "email"
    t.string   "avatar_url"
    t.string   "access_token"
    t.integer  "repos_count"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

end
