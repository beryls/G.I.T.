class Repo < ActiveRecord::Base
  # these take the data in collaborators and languages, and reduce them to a format the computer can read more easily
  # serialization permits this data to be stored as a hash in the database
  serialize :collaborators, ActiveRecord::Coders::Hstore
  serialize :languages, ActiveRecord::Coders::Hstore
  serialize :percent_languages, ActiveRecord::Coders::Hstore

  # these establish relationships between repo and other models
  has_and_belongs_to_many :portfolios
  belongs_to :user

  # allows for mass assignment of these attributes
  attr_accessible :name, :html_url, :collaborators, :languages, :collaborators_url, :languages_url, :homepage_url, :percent_languages, :main_language


  # Either creates or updates a repo based on info
  def self.updateOrCreate(info)
    if(Repo.find_by_html_url(info[:html_url]))
      repo = Repo.find_by_html_url(info[:html_url])
      repo.update_attributes(info)
    else
      repo = Repo.create(info)
    end
      repo.getBytesOfCode
      repo.getCollaborators
      repo.bytesOfCode
      return repo
  end

  # sets totaly bytes of code in the repo
  def bytesOfCode
    total_lines = 0
    self.languages.each do |language, lines|
      total_lines += lines.to_i
    end
    self.total_bytes = total_lines
  end

  def percentOfCodeByLanguage
    percent = {}
    totalLines = bytesOfCode.to_f
    self.languages.each do |language, lines|
      percent[languages] = (100*lines.to_f/totalLines).round(2)
    end
    self.percent_languages = percent
  end

  def getCollaborators(options = {}) 
    collaborators = {}
    result = JSON.parse(RestClient.get(options[:url] || self.collaborators_url, params: {access_token: ENV['ACCESS_TOKEN']}))
    result.each do |collaborator|
      collaborators[collaborator['login']] = collaborator['html_url']
    end
    self.collaborators = collaborators
  end

  def getBytesOfCode(options = {}) 
    linesByLanguage = {}
    percentByLanguage = {}
    result = JSON.parse(RestClient.get(options[:url] || self.languages_url, params: {access_token: ENV['ACCESS_TOKEN']}))
    result.each do |language, lines|
      linesByLanguage[language] = lines
      percentByLanguage[language] = lines
    end
    self.languages = linesByLanguage
    self.percent_languages = percentByLanguage
  end
end