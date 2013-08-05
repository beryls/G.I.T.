class CreatePortfoliosTable < ActiveRecord::Migration
  def up
    create_table :portfolios do |t|
      t.string :name
      t.references :user
      t.timestamps
    end
  end

  def down
    drop_table :portfolios
  end
end
