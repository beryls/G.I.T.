class SessionsController < ApplicationController 

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