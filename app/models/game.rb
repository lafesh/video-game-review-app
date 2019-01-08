class Game < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews

    validates :name, uniqueness: true
    validates :name, :description, presence: true
    
end
