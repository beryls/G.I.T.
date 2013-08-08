class CreateMainLanguageAndPercentageColumns < ActiveRecord::Migration
  def up
  	add_column :repos, :percent_languages, :hstore
  	add_column :repos, :main_language, :string
  end

  def down
  	remove_column :repos, :percentLanguages, :hstore
		remove_column :repos, :mainLanguage, :string
  end
end
