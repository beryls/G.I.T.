class CreateReposAgain < ActiveRecord::Migration
	def up
    create_table :repos do |t|
      t.string :name
      t.string :html_url
      t.hstore :collaborators
      t.string :homepage_url
      t.hstore :languages
      t.references :user
      t.timestamps
    end
	end

  def down
  	drop_table :repos
  end
end
