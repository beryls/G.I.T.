class WelcomeController < ApplicationController

	def index
	end

  # make this get/search
  def search
    @search = params[:q]
  end
end