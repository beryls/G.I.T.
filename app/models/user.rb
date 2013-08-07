class User < ActiveRecord::Base
	has_many :repos
	has_many :portfolios
	attr_accessible :name, :login, :email, :avatar_url, :access_token, :repos_count

	def self.updateOrCreate(info)
		if(User.find_by_email(info[:email]))
			user = User.find_by_email(info[:email])
			user.update_attributes(info)
			return user
		else
			user = User.create(info)
			return user
		end
	end


	def loadRepos
		result = JSON.parse(RestClient.get('https://api.github.com/users/' + self.login + "/repos", params: {access_token: ENV['ACCESS_TOKEN']}))
		result.each do |repo|
			self.repos << Repo.new(name: repo['name'],
												html_url: repo['html_url'],
												homepage_url: repo['homepage_url'],
												collaborators_url: repo['collaborators_url'].split('{')[0],
												languages_url: repo['languages_url'])
			repos.last.getLinesOfCodeByLanguage
			repos.last.getCollaborators
		end
		return self.repos
	end

	def linesOfCode
		result = JSON.parse(RestClient.get('https://api.github.com/users/' + self.login + "/repos", params: {access_token: ENV['ACCESS_TOKEN']}))
		total_lines = 0
		result.each do |repo|
			languages = JSON.parse(RestClient.get(repo['languages_url']))
			languages.each do |language, lines|
				total_lines += lines
			end
		end
		return total_lines
	end	
end