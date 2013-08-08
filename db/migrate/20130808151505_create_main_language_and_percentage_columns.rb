class CreateMainLanguageAndPercentageColumns < ActiveRecord::Migration
  def up
  	add_column :repos, :percentLanguages, :hstore
  	add_column :repos, :mainLanguage, :string
  end

  def down
  	drop_column :repos, :percentLanguages, :hstore
  	drop_column :repos, :mainLanguage, :string
  end
end
