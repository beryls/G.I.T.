class CreateUsersTable < ActiveRecord::Migration
  def up
  	create_table :users do |t|
  		t.string :name
  		t.string :login
  		t.string :email
  		t.string :avatar_url
  		t.string :access_token
  		t.integer :repos_count
  		t.timestamps
  	end
  end

  def down
  	drop_table :users
  end
end
