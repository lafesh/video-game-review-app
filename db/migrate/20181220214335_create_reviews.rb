class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :title
      t.text :content
      t.integer :rating
      t.boolean :recommend
      t.integer :user_id
      t.integer :game_id
      
      t.timestamps
    end
  end
end
