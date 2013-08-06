require 'spec_helper'

describe Repo do 
	let(:repo1) {Repo.new(name: 'clutch', html_url: 'http://clutch-app.herokuapp.com', collaborators_url: 'https://www.random.com', languages_url: 'https://api.github.com/repos/tcclevela/Clutch/languages', homepage_url: 'http://www.example.com')}
end