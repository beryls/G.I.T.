class Portfolio < ActiveRecord::Base
  has_and_belongs_to_many :repos
  belongs_to :user
  attr_accessible :name, :description
  attr_accessor :name, :description

  def linesOfCode
  	totalLines = 0
  	self.repos.each do |repo|
  		result = JSON.parse(RestClient.get(repo.languages_url),{params: {access_token: 'b03c334e67dc1baac5008d44a27e4f50c9d0f737'}})
  		result.values.each do |lines|
  			totalLines += lines
  		end

  	end
  	return totalLines
  end

  def linesOfCodeByLanguage
  	totalLines = {}
  	self.repos.each do |repo|	
  		result = JSON.parse(RestClient.get(repo.languages_url),{params: {access_token: 'b03c334e67dc1baac5008d44a27e4f50c9d0f737'}})
  		result.each do |language, lines|
  			totalLines[language] ||= 0
				totalLines[language] += lines
  		end
  	end
  	return totalLines 
  end
end

