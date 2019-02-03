class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :platform, :rating
  has_many :reviews
end
