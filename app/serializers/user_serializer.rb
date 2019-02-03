class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name
  has_many :reviews
end
