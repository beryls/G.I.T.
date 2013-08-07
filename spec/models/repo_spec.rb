require 'spec_helper'


describe Repo do
  let(:repo1) {Repo.new(name: 'clutch', html_url: 'http://clutch-app.herokuapp.com', collaborators: {'tcclevela' => 'http://www.github.com/users/tcclevela'}, languages:{'Ruby'=>2000,'JavaScript'=>2500,'CoffeeScript'=>2000}, homepage_url: 'http://www.example.com')}
  let(:repo2) {Repo.new(name: 'bean_fiend', html_url: 'http://bean-app.herokuapp.com', collaborators: {'tcclevela' => 'http://www.github.com/users/tcclevela'}, languages: {"Ruby"=>1000, 'JavaScript'=>2500,'CoffeeScript'=>4000}, homepage_url: 'http://www.example.com')}

  describe ".new" do
    it "creates a repo object" do
      expect(repo1).to_not eq(nil)
    end
  end

  describe "#linesOfCode" do
    it "returns a number" do
      expect(repo1.linesOfCode.class).to eq(Fixnum)
    end
    it 'should sum the lines in a repo' do
      expect(repo1.linesOfCode).to eq(6500)
    end

  end

  describe "#linesOfCodeByLanguage" do
  
  end

  describe "#percentOfCodeByLanguage" do
    it "returns a hash" do
      expect(repo1.percentOfCodeByLanguage.class).to eq(Hash)
    end

    it "returns floats for percentage of code" do
      expect(repo1.percentOfCodeByLanguage.values[0].class).to eq(Float)
    end
  end

  describe '#collaborators' do
  
  end
end