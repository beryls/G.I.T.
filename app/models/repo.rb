class Repo < ActiveRecord::Base
  serialize :collaborators, ActiveRecord::Coders::Hstore
  serialize :languages, ActiveRecord::Coders::Hstore

  has_and_belongs_to_many :portfolios
  belongs_to :user

  attr_accessible :name, :html_url, :collaborators, :languages, :homepage_url

  def self.updateOrCreate(info)
    if(Repo.find_by_html_url(info[:html_url]))
      repo = Repo.find_by_html_url(info[:html_url])
      repo.update_attributes(info)
      return repo
    else
      repo = Repo.create(info)
      return repo
    end
  end

  def linesOfCode
    total_lines = 0
    self.languages.each do |language, lines|
      total_lines += lines
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

  def getCollaborators(url)
    result = RestClient.get(url, params: {access_token: ENV['ACCESS_TOKEN']})
  end

  def getLinesOfCodeByLanguage(url)

  end
end