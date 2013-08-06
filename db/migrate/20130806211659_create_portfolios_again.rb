class CreatePortfoliosAgain < ActiveRecord::Migration
  def up
  	create_table :portfolios do |t|
      t.string :name
      t.string :description
      t.references :user
      t.timestamps
    end
  end

  def down
  	drop_table :portfolios
  end
end
