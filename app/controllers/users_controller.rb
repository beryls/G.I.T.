class UsersController < ApplicationController

	def callback
    # expires_in 3.minutes, public: true
  	result = RestClient.post("https://github.com/login/oauth/access_token",
	    {client_id: ENV['CLIENT_ID'],
	     client_secret: ENV['CLIENT_SECRET'],
	     code: params[:code]
	    },{
	     :accept => :json
	    });
  	@@access_token = JSON.parse(result)['access_token']
  	redirect_to '/users/create'
	end


	def create
		user = JSON.parse(RestClient.get("https://api.github.com/user", {params: {:access_token => @@access_token}}))
  	user_info = {name: user['name'],
  		login: user['login'],
  		email: user['email'],
  		access_token: @@access_token,
  		avatar_url: user['avatar_url'],
  		repos_count: user['public_repos']}
  	user = User.updateOrCreate(user_info)
  	redirect_to "/sessions/#{user.id}/create"
  	# decide whether or not to add repos at this time
	end

  def show
    @user = User.find(params[:id])
    @repos = @user.repos
    @repos.sort! {|a,b| a.main_language <=> b.main_language}
    @repos = @user.repos.to_json.html_safe
    @user = @user.to_json.html_safe

  end
end