require "cgi"

class SlimHelper
  
  def inline_css(file_name)
    content = File.read(file_name)
    "<style>" + content + "</style>"
  end
  
  def inline_js(file_name)
    content = File.read(file_name)
    # content = CGI.escapeHTML(content)
    "<script>" + content + "</script>"
  end
  
  def insert(file_name)
    File.read(file_name)
  end
  
end
