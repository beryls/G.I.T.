# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

port = Portfolio.create(name: "David Fisher", description: "Awesome Teacher")

port.repos << Repo.create(name: "whatever", html_url: "http://4chan.org", collaborators_url: "http://redditt.com", languages_url: "http://github.com", homepage_url: "http://tibbon.github.com")