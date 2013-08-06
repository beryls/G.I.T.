class Repo < ActiveRecord::Base
	serialize :languages, ActiveRecord::Coders::Hstore
  has_and_belongs_to_many :portfolios
  belongs_to :user
  attr_accessible :name, :html_url, :collaborators_url, :languages_url, :homepage_url
end