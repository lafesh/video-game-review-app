class Game < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews

    validates :name, :description, presence: true
    validates :name, uniqueness: true
    validates :description, length: { in: 20..500 }
    
end
