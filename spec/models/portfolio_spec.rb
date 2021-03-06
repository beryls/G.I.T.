require 'spec_helper'

describe Portfolio do 
	let(:portfolio) {Portfolio.new(name:'port', description:'a test')}
	let(:repo1) {Repo.new(name: 'clutch', html_url: 'http://clutch-app.herokuapp.com', collaborators: {'tcclevela' => 'http://www.github.com/users/tcclevela'}, languages:{'Ruby'=>2000,'JavaScript'=>2500,'CoffeeScript'=>2000}, homepage_url: 'http://www.example.com')}
	let(:repo2) {Repo.new(name: 'bean_fiend', html_url: 'http://bean-app.herokuapp.com', collaborators: {'tcclevela' => 'http://www.github.com/users/tcclevela'}, languages: {"Ruby"=>1000, 'JavaScript'=>2500,'CoffeeScript'=>4000}, homepage_url: 'http://www.example.com')}

	describe '.new' do 
		it 'initialize a portfolio' do
			expect(portfolio).to_not eq(nil)
			expect(portfolio.name).to eq('port')
			expect(portfolio.description).to eq('a test')
		end
	end

	describe '#linesOfCode' do 
		it 'should return the total lines of code in a portfolio' do
			portfolio.repos << repo1 << repo2
			expect(portfolio.linesOfCode()).to eq(14000)
		end
	end

	describe '#linesOfCodeByLanguage' do
		it 'should return a hash with language keys and line values' do
			portfolio.repos << repo1 << repo2
			expected_result = {'Ruby'=> 3000, 'JavaScript'=> 5000, 'CoffeeScript'=> 6000}
			expect(portfolio.linesOfCodeByLanguage).to eq(expected_result)
		end

		it 'should return an empty hash if no repos are in the portfolio' do
			expect(portfolio.linesOfCodeByLanguage).to eq({})
		end
	end

	describe "#percentageOfCodeByLanguage" do
		it 'should return a hash with language keys and percentage values' do
			portfolio.repos << repo1 << repo2
			expected_result = {'Ruby'=>21.43, 'JavaScript'=>35.71, 'CoffeeScript'=>42.86}
			expect(portfolio.percentageOfCodeByLanguage).to eq(expected_result)
		end
	end
end