require 'spec_helper'



describe Repo do
  let(:repo1) {Repo.new(name: 'coaster_project', html_url: 'https://github.com/beryls/coaster_project', collaborators_url: 'https://api.github.com/repos/beryls/coaster_project/collaborators{/collaborator}', languages_url: 'https://api.github.com/repos/beryls/coaster_project/languages', homepage_url: 'http://www.example.com')}

  describe ".new" do
    it "creates a repo object" do
      expect(repo1).to_not eq(nil)
    end
  end

  describe "#linesOfCode" do
    it "returns a number" do
      expect(repo1.linesOfCode.class).to eq ("Integer")
    end
  end

  describe "#linesOfCodeByLanguage" do
    it "returns a hash" do
      expect(repo1.linesOfCodeByLanguage.class).to eq ("Hash")
    end

    it "returns numerical values for lines of code" do
      expect(repo1.linesOfCodeByLanguage.values[0].class).to eq ("Integer")
    end
  end

  describe "#percentOfCodeByLanguage" do
    it "returns a hash" do
      expect(repo1.percentOfCodeByLanguage.class).to eq ("Hash")
    end

    it "returns floats for percentage of code" do
      expect(repo1.percentOfCodeByLanguage.values[0].class).to eq ("Float")
    end
  end

  describe "#collaborators" do
    it "returns an array" do
      expect(repo1.collaborators.class).to eq ("Array")
    end
    it "returns the names or logins of each collaborator" do
      expect(repo1.collaborators[0].class).to eq ("String")
    end
  end

  describe "#updateOrCreate" do
  end

  describe "#loadRepos" do
  end
end