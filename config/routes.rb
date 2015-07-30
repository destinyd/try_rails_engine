Rails.application.routes.draw do
  mount TaskApi::Engine => '/', :as => 'a'
  #devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  #root 'home#index'
end
