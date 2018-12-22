class Review < ApplicationRecord
    belongs_to :user
    belongs_to :game

    validates :title, presence: true
    validates :content, presence: true

    scope :recommended, -> { where(recommend: true) } #recommended reviews, dont need to write a class

    def age_restriction
        rating = nil
        if review.rating == "Adults (18+)"
            rating = Time.now.year - 18 #only the year is left, how to keep the whole date
           
        elsif review.rating == "Mature (17+)"
            rating = Time.now.year - 17
         
        elsif review.rating == "Teen (13+)"
            rating = Time.now.year - 13
          
        elsif review.rating == "Everyone (10+)"
           rating = Time.now.year - 10
        end
        flash[:messge] = "You are not old enough to review this game" if user.birthday.year > rating
    end
end
