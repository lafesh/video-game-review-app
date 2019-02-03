class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :rating, :recommend
  belongs_to :user
  belongs_to :game
end
