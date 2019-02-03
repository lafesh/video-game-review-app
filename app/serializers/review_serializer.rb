class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :rating, :recommend, :game_id, :created_at
  belongs_to :user
  belongs_to :game
end
