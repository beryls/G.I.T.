class User < ActiveRecord::Base
	attr_accessible :name, :login, :email, :avatar_url, :access_token, :repos_count

	def self.create_user(info)
		if(User.find_by_email(info['email']))
			# update user information here
			return User.find_by_email(info['email'])

		else
			
			user = User.create(info)
			return user
			
		end
	end	
end