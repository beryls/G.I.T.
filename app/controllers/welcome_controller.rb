class WelcomeController < ApplicationController

  def index
    # expires_in 3.minutes, public: true
    if current_user
      @@access_token = current_user.access_token
      if params[:q]
        @search = URI.encode(params[:q])
        @results = RestClient.get("https://api.github.com/legacy/user/search/#{@search}+in%3Aname+in%3Alogin&type=Users&ref=searchresults", {params: {access_token: current_user.access_token}})
        @results = JSON.parse(@results)
      end
    end
  end

  def select
    expires_in 3.minutes, public: true
    login = params[:login]
    # user = Rails.cache.fetch("search-result-#{params[:login]}", expires_in: 1.hour) do
    user = JSON.parse(RestClient.get("https://api.github.com/users/#{login}", {:params => {:access_token => current_user.access_token}}))  
    # end

    user_info = {name: user['name'],
      login: user['login'],
      email: user['email'],
      avatar_url: user['avatar_url'],
      repos_count: user['public_repos']}
    user = User.updateOrCreate(user_info)
    redirect_to "/users/#{user.id}"
  end

  def about
  end

end