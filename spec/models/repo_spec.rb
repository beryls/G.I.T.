require 'spec_helper'


describe Repo do
  let(:repo1) {Repo.new(name: 'clutch', html_url: 'http://clutch-app.herokuapp.com', collaborators: {'tcclevela' => 'http://www.github.com/users/tcclevela'}, languages:{'Ruby'=>2000,'JavaScript'=>2500,'CoffeeScript'=>2000}, homepage_url: 'http://www.example.com')}
  let(:repo2) {Repo.new(name: 'bean_fiend', html_url: 'http://bean-app.herokuapp.com', collaborators: {'tcclevela' => 'http://www.github.com/users/tcclevela'}, languages: {"Ruby"=>1000, 'JavaScript'=>2500,'CoffeeScript'=>4000}, homepage_url: 'http://www.example.com')}

  describe '#new' do 
    it 'should initialize a new repo object' do
      expect(repo1).to_not eq(nil)
    end
  end


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


  describe "#percentOfCodeByLanguage" do
    it "returns a hash" do
      expect(repo1.percentOfCodeByLanguage.class).to eq(Hash)
    end

    it "returns floats for percentage of code" do
      expect(repo1.percentOfCodeByLanguage.values[0].class).to eq(Float)
    end
  end


  describe "#getLinesOfCodeByLanguage" do
    url = 'https://api.github.com/repos/tcclevela/Clutch/languages'
    it 'should set the languages equal to a hash' do
      repo1.getLinesOfCodeByLanguage(url)
      expect(repo1.languages.class).to eq(Hash)
    end

    # will result in false if public repo changes
    it 'should set the languages equal to the correct value' do
      repo1.getLinesOfCodeByLanguage(url)
      expected_result = {'Ruby'=>24458, 'JavaScript'=>2985}
      expect(repo1.languages).to eq(expected_result)
    end
  end

  describe '#getCollaborators' do
    url = 'https://api.github.com/repos/tcclevela/Clutch/collaborators'
    it 'should return a hash of collaborators' do
        repo1.getCollaborators(url)
      expect(repo1.collaborators.class).to eq(Hash)
    end

    # will result in false if more collaborators added to repo
    it 'should return an accurate list of collaborators' do
      repo1.getCollaborators(url)
      expected_result = {"tcclevela"=>"https://github.com/tcclevela", 
        "kevonc"=>"https://github.com/kevonc", 
        "Swelly"=>"https://github.com/Swelly", 
        "zreitano"=>"https://github.com/zreitano"}
      expect(repo1.collaborators).to eq(expected_result)
    end
  end

end