class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def e
    self.errors.full_messages.join(", ")
  end
end
