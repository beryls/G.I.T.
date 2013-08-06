class Repo < ActiveRecord::Base
  has_and_belongs_to_many :portfolios
  belongs_to :user
  attr_accessible :name, :description
end