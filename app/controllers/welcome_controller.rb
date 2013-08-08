class WelcomeController < ApplicationController

	def index
    if current_user
      @@access_token = current_user.access_token
    end
	end

  # make this get/search
  def search
    @search = params[:q]
    @@access_token = current_user.access_token
    @results = RestClient.get("https://api.github.com/search/users?q=tibbon+in%3Aname+in%3Alogin&type=Users&ref=searchresults", {:params => {:access_token => @@access_token}})
    @results = JSON.parse(results)
    # https://api.github.com/search/users?q=tom
    # ?q=tibbon+in%3Aname+in%3Alogin&type=Users&ref=searchresults
    # :q => @search,
  end
end