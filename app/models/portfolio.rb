class Portfolio < ActiveRecord::Base
  has_and_belongs_to_many :repos
  belongs_to :user
  attr_accessible :name, :html_url, :collaborators_url, :languages_url, :homepage_url
end