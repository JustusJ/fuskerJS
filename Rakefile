require 'rubygems'
require 'bundler'
Bundler.require(:default)
require "./lib/slim_helper.rb"

desc "best build system ever"
task :build do |t|
  o = Tilt.new('src/index.html.slim').render(SlimHelper.new)
  File.open('index.html', 'w+').write(o)
end

