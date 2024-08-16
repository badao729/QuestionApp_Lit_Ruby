require 'sinatra'
require 'json'

# Root route
get '/' do
  erb :index
end

# Get options based on question id
get '/options/:question_id' do
  content_type :json
  
  questions = {
    1 => { option_a: "pet unicorn", option_b: "pet dragon" },
    2 => { option_a: "car", option_b: "bike" },
    3 => { option_a: "react", option_b: "lit" }
  }

  question_id = params['question_id'].to_i
  selected_question = questions[question_id]

  if selected_question
    selected_question.to_json
  else
    status 404
    { error: "Question not found" }.to_json
  end
end

# Handle option selection and update JSON file
post '/select-option' do
  content_type :json

  question_id = params['question_id']
  selected_option = params['option']

  puts "Received params: question_id=#{question_id}, selected_option=#{selected_option}"

  if File.exist?('questions.json')
    questions = JSON.parse(File.read('questions.json'))

    if questions.key?(question_id)
      questions[question_id]['selected_option'] = selected_option
      File.write('questions.json', JSON.pretty_generate(questions))

      status 204 # No Content
    else
      status 404
      { error: "Question not found" }.to_json
    end
  else
    halt 500, { error: "Questions file not found" }.to_json
  end
end




# Serve the JavaScript file
get '/questionButton.js' do
  send_file 'public/questionButton.js'
end

# get '/test' do
#   "Test route works!"
# end
