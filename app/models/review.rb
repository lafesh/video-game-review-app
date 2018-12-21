class Review < ApplicationRecord
    belongs_to :user
    belongs_to :game

    def age_restriction
        message = (flash[:messge] = "You are not old enough to review this game" unless user.birthday.year > self.rating)
        if review.rating == "Adults (18+)"
            review.rating = Time.now.year - 18 #only the year is left, how to keep the whole date
            message
        elsif review.rating == "Mature (17+)"
            review.rating = Time.now.year - 17
            message
        elsif review.rating == "Teen (13+)"
            review.rating = Time.now.year - 13
            message  
        elsif review.rating == "Everyone (10+)"
            review.rating = Time.now.year - 10
            message
        elsif review.rating == "Everyone"
            flash[:message] = "You are old enough to review this game!"
        end
    end
end
