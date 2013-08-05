class SessionsController < ApplicationController 
	
	def callback
  	result = RestClient.post("https://github.com/login/oauth/access_token",
												    {client_id: ENV['CLIENT_ID'],
												     client_secret: ENV['CLIENT_SECRET'],
												     code: params[:code]
												    },{
												     :accept => :json
												    });
  	access_token = JSON.parse(result)
  	auth_result = RestClient.get("https://api.github.com/user", {:params => {:access_token => access_token}})
  	puts auth_result
  	redirect_to :root
	end

	def create
		user = User.find(params[:id])
		session[:user_id] = user.id
		redirect_to root_url, notice: 'Logged In'
	end

	def destroy
		session[:user_id] = nil
		redirect_to root_url, notice: 'Logged Out'
	end

end