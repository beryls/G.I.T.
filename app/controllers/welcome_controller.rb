class WelcomeController < ApplicationController

	def index
	end

  # make this get/search
  def search
    @search = params[:query]
    @@access_token = current_user.access_token
    results = RestClient.get("https://api.github.com/search/users/q=tibbon+in%3Aname+in%3Ausername&type=Users&ref=searchresults", {:params => {:access_token => @@access_token}})
    results = JSON.parse(results)
  end
end