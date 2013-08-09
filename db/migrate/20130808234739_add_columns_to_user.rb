class AddColumnsToUser < ActiveRecord::Migration
  def change
  	add_column :users, :lines_written, :integer
  	add_column :users, :lines_by_language, :hstore
  	add_column :users, :percent_by_language, :hstore
  end
end
