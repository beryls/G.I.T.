class CreatePortfoliosReposAgain < ActiveRecord::Migration
  def up
		create_table :portfolios_repos do |t|
      t.belongs_to :portfolio
      t.belongs_to :repo
    end
  end

  def down
		drop_table :portfolios_repos  	
  end
end
