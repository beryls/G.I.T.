class Portfolio < ActiveRecord::Base
  has_and_belongs_to_many :repos
  belongs_to :user
  attr_accessible :name, :description

  def initialize(name)
  	@name = name
  end

end