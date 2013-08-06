class Repo < ActiveRecord::Base
	serialize :languages, ActiveRecord::Coders::Hstore
  serialize :collaborators, ActiveRecord::Coders::Hstore

  has_and_belongs_to_many :portfolios
  belongs_to :user
  attr_accessible :name, :html_url, :collaborators_url, :languages_url, :homepage_url

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

  def linesOfCode()
    return self.languages
  end

  def linesOfCodeByLanguage
    return self.languages
  end

  def percentOfCodeByLanguage
    return self.languages
  end

  def collaborators
  end

  def loadRepos
  end
end