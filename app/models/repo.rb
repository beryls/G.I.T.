class Repo < ActiveRecord::Base
  serialize :collaborators, ActiveRecord::Coders::Hstore
  serialize :languages, ActiveRecord::Coders::Hstore

  has_and_belongs_to_many :portfolios
  belongs_to :user

  attr_accessible :name, :html_url, :collaborators, :languages, :collaborators_url, :languages_url, :homepage_url

  def self.updateOrCreate(info)
    if(Repo.find_by_html_url(info[:html_url]))
      repo = Repo.find_by_html_url(info[:html_url])
      repo.update_attributes(info)
    else
      repo = Repo.create(info)
    end
      repo.getLinesOfCodeByLanguage
      repo.getCollaborators
      return repo
  end

  def linesOfCode
    total_lines = 0
    self.languages.each do |language, lines|
      total_lines += lines.to_i
    end
    return total_lines
  end

  def percentOfCodeByLanguage
    percentByLanguage = {}
    totalLines = linesOfCode.to_f
    self.languages.each do |language, lines|
      percentByLanguage[language] = (100*lines.to_f/totalLines).round(2)
    end
    return percentByLanguage
  end

  def getCollaborators(options = {})
    collaborators = {}
    result = JSON.parse(RestClient.get(options[:url] || self.collaborators_url, params: {access_token: ENV['ACCESS_TOKEN']}))
    result.each do |collaborator|
      collaborators[collaborator['login']] = collaborator['html_url']
    end
    self.collaborators = collaborators
  end

  def getLinesOfCodeByLanguage(options = {})
    linesByLanguage = {}
    result = JSON.parse(RestClient.get(options[:url] || self.languages_url, params: {access_token: ENV['ACCESS_TOKEN']}))
    result.each do |language, lines|
      linesByLanguage[language] = lines
    end
    self.languages = linesByLanguage
  end
end