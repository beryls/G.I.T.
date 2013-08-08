class WelcomeController < ApplicationController

	def index
    if current_user
      @@access_token = current_user.access_token
    end
    @search = params[:q]
    @results = RestClient.get("https://api.github.com/legacy/user/search/#{@search}+in%3Aname+in%3Alogin&type=Users&ref=searchresults", {:params => {:access_token => @@access_token}})
    @results = JSON.parse(@results)
	end

end