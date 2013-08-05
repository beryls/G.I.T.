class SessionsController < ApplicationController 
	def callback
		@code = params[:code]
		respond_to do |format|
			format.json {}
		end
	end
end