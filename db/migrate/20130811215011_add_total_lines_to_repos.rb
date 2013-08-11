class AddTotalLinesToRepos < ActiveRecord::Migration
  def change
  	add_column :repos, :total_bytes, :integer
  end
end
