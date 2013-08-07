class AddRepoUrlColumns < ActiveRecord::Migration
  def up
  	add_column :repos, :languages_url, :string
  	add_column :repos, :collaborators_url, :string
  end

  def down
  	remove_column :repos, :languages_url, :string
  	remove_column :repos, :collaborators_url, :string
  end
end
