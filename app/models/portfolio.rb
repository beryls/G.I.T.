class Portfolio < ActiveRecord::Base
  has_and_belongs_to_many :repos
  belongs_to :user
  attr_accessible :name, :description
  attr_accessor :name, :description

  def linesOfCode
  	totalLines = 0
  	self.repos.each do |repo|
  		repo.languages.each do |language, lines|
  			totalLines += lines
  		end

  	end
  	return totalLines
  end

  # def linesOfCodeByLanguage
  # 	totalLines = {}
  # 	self.repos.each do |repo|	
  # 		result = JSON.parse(RestClient.get(repo.languages_url),{params: {access_token: ENV['ACCESS_TOKEN']}})
  # 		result.each do |language, lines|
  # 			totalLines[language] ||= 0
		# 		totalLines[language] += lines
  # 		end
  # 	end
  # 	return totalLines 
  # end
end

