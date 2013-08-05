class CreateReposTable < ActiveRecord::Migration
  def up
    create_table :repos do |t|
      t.string :name
      t.string :html_url
      t.string :collaborators_url
      t.string :languages_url
      t.string :homepage_url
      t.references :user
      t.timestamps
    end
  end

  def down
    drop_table :repos
  end
end
