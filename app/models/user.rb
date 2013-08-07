class User < ActiveRecord::Base
	has_many :repos
	has_many :portfolios
	attr_accessible :name, :login, :email, :avatar_url, :access_token, :repos_count

	def self.create_user(info)
		if(User.find_by_email(info[:email]))
			user = User.find_by_email(info[:email])
			user.update_attributes(info)
			return user
		else
			user = User.create(info)
			return user
		end
	end

	def self.loadRepoLanguages(url)
		languages = {}
		result = JSON.parse(RestClient.get(url, params: {access_token: ENV['ACCESS_TOKEN']}))
		result.each do |language,lines|
			languages[language] = lines
		end
		return languages
	end

	def self.loadCollaborators(url)
		collaborators = {}
		result = JSON.parse(RestClient.get(url, params: {access_token: ENV['ACCESS_TOKEN']}))
		result.each do |user|
			collaborators[user] = user['html_url']
		end
		return collaborators
	end

	def loadRepos
		repos = []
		result = JSON.parse(RestClient.get('https://api.github.com/users/' + self.login + "/repos", params: {access_token: ENV['ACCESS_TOKEN']}))
		result.each do |repo|
			languages = User.loadRepoLanguages(repo['languages_url'])
			collaborators = User.loadCollaborators(repo['collaborators_url'].split('{')[0])
			repos << Repo.new(name: repo['name'],
												html_url: repo['html_url'],
												homepage_url: repo['homepage_url'],
												languages: languages,
												collaborators: collaborators)
		end
	end


end