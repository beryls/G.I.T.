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

  def linesOfCodeByLanguage
  	linesByLanguage = {}
  	self.repos.each do |repo|	
  		repo.languages.each do |language, lines|
  			linesByLanguage[language] ||= 0
				linesByLanguage[language] += lines
  		end
  	end
  	return linesByLanguage 
  end

  def percentageOfCodeByLanguage
    linesByPercentage = {}
    linesByLanguage = linesOfCodeByLanguage
    totalLines = linesOfCode.to_f
    linesByLanguage.each do |language, lines|
      linesByPercentage[language] = (lines.to_f/totalLines*100).round(2)
    end
    return linesByPercentage
  end
end

