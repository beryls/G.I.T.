class User < ActiveRecord::Base
	has_many :repos
	has_many :portfolios
	attr_accessible :name, :login, :email, :avatar_url, :access_token, :repos_count

	def self.updateOrCreate(info)
		if(User.find_by_login(info[:login]))
			user = User.find_by_login(info[:login])
			user.update_attributes(info)
		else
			user = User.create(info)
		end
		user.loadRepos
		user.linesOfCode
		return user
	end


	def loadRepos
		result = Rails.cache.fetch("loadRepos-user-#{self.id}", expires_in: 1.hour) do
			JSON.parse(RestClient.get('https://api.github.com/users/' + self.login + "/repos",
				params: {access_token: ENV['ACCESS_TOKEN'], page: 1, per_page: 100}))
		end
		Rails.cache.fetch("update-user-repos-#{self.id}", expires_in: 1.hour) do
			result.each do |repo|
				info = {name: repo['name'],
									html_url: repo['html_url'],
									homepage_url: repo['homepage_url'],
									collaborators_url: repo['collaborators_url'].split('{')[0],
									languages_url: repo['languages_url'],
									main_language: repo['language']}
				if info[:main_language]
					self.repos << Repo.updateOrCreate(info)
				end
			end
		end
		return self.repos
	end

	def linesOfCode
		lines = Rails.cache.fetch("languages-lookups-#{self.login}") do
			total_lines = 0
			self.repos.each do |repo|
				result = JSON.parse(RestClient.get(repo['languages_url'], params: {access_token: ENV['ACCESS_TOKEN']}))
				result.each do |language, lines|
					total_lines += lines
				end
			end
			return total_lines
		end
		puts lines
		self.lines_written = lines
	end
end