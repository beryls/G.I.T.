class User < ActiveRecord::Base
	has_many :repos
	has_many :portfolios
	serialize :lines_by_language, ActiveRecord::Coders::Hstore
	serialize :percent_by_language, ActiveRecord::Coders::Hstore
	attr_accessible :name, :login, :email, :avatar_url, :access_token, :repos_count, :lines_written, :percent_by_language, :lines_by_language

	def self.updateOrCreate(info)
		if(User.find_by_login(info[:login]))
			user = User.find_by_login(info[:login])
			user.update_attributes(info)
		else
			user = User.create(info)
		end
		user.loadRepos
		user.linesOfCode
		user.userLinesByLanguage
		user.userPercentByLanguage
		return user
	end


	def loadRepos
		# result = Rails.cache.fetch("loadRepos-user-#{self.id}", expires_in: 1.hour) do
			result = JSON.parse(RestClient.get('https://api.github.com/users/' + self.login + "/repos",
				params: {access_token: self.access_token, page: 1, per_page: 100}))
		# end
		# Rails.cache.fetch("update-user-repos-#{self.id}", expires_in: 1.hour) do
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
			# end
		end
		return self.repos
	end

	def linesOfCode
		# lines = Rails.cache.fetch("languages-lookups-#{self.login}") do
			total_lines = 0
			self.repos.each do |repo|
				repo.languages.each do |language, repo_lines|
					total_lines += repo_lines.to_i
				end
			# end
			total_lines
		end
		self.update_attributes(lines_written: total_lines)
	end

	def userLinesByLanguage
			total_lines_by_language = {}
			self.repos.each do |repo|
				repo.languages.each do |language, lines|
					total_lines_by_language[language] ||= 0
					total_lines_by_language[language] += lines.to_i
				end
			end

			user = self
			total_lines_by_language.each do |language, lines|
				user.lines_by_language[language] = lines
			end
			self.save			
	end	

	def userPercentByLanguage
		user = self
		total_lines = self.lines_written.to_f
		languages = self.lines_by_language
		languages.each do |language, lines|
			user.percent_by_language[language] = lines.to_f/total_lines * 100
		end
		self.save
	end
end