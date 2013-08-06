require 'spec_helper'

describe Portfolio do 
	let(:portfolio) {Portfolio.new(name: 'port', description: 'its a portfolio')}
	let(:repo1) {Repo.new(name: 'clutch', html_url: 'http://clutch-app.herokuapp.com', collaborators_url: 'https://www.random.com', languages_url: 'https://api.github.com/repos/tcclevela/Clutch/languages', homepage_url: 'http://www.example.com')}

	describe 'linesOfCode' do 
		it 'should return the total lines of code in a repo' do

		end
	end
end