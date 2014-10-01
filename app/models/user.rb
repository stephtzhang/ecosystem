class User < ActiveRecord::Base
  has_many :games

  has_secure_password
  validates :name, presence: true
end
