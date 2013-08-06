class WelcomeController < ApplicationController 

	def index
		@user = User.first
		@portfolio = Portfolio.first
		respond_to do |format|
			format.json {render json: {portfolio: @portfolio, user: @user}}
		end
	end

end	