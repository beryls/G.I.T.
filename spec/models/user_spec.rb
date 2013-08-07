require 'spec_helper'

describe User do
	let(:user) {User.new(name: 'Teddy Cleveland', login: 'tcclevela', email: 'tcclevela@gmail.com', avatar_url: 'https://dummyurl.com', access_token: ENV['ACCESS_TOKEN'], repos_count: 55)}
	info = {name: 'Teddy Cleveland', login: 'tcclevela', email: 'tcclevela@gmail.com', avatar_url: 'https://dummyurl.com', access_token: ENV['ACCESS_TOKEN'], repos_count: 55 }
	describe 'create_user' do 
		it 'should insert user into database or update info based on email and return user' do
			user = User.create_user(info)
			expect(user).to_not eq(nil)
			expect(User.find_by_email('tcclevela@gmail.com').login).to eq('tcclevela')
		end
	end

	describe 'loadRepos' do
		it 'should load a users repos into database' do
			puts user.login
			repos = user.loadRepos
			expect(repos.count).to eq(30)
		end
	end
end