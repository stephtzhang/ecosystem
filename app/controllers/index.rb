enable :sessions
use Rack::Flash

get '/' do
  @user = User.find(session[:user_id]) if session[:user_id]
  erb :index
end

get '/login' do
  erb :"user/login_signup"
end

get '/logout' do
  session.clear
  erb :index
end

post '/user' do
  user = User.create(params[:user_info])
  if user.valid?
    session[:user_id] = user.id
    redirect "/"
  else
    flash[:new_account_error] = user.errors.messages
    redirect '/login'
  end
end

post '/login' do
  user = User.find_by(name: params[:name]).try(:authenticate, params[:password])
  if user
    session[:user_id] = user.id
    redirect "/"
  else
    flash[:sign_in_error] = "Login password combination incorrect"
    redirect '/login'
  end
end

post '/game' do
  # how to get score??
  Game.create(user_id: params[:user_id], score: params[:score])

  redirect "/"
end

