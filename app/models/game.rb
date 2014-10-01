class Game < ActiveRecord::Base
  belongs_to :user

  # call Game.top_scores(5) for 5 top scores
  # is the game responsible for this?
  def self.top_scores(num)
    top_scores = self.order(score: :desc).limit(num)
    top_scores.map do |game|
      {name: game.user.name, score: game.score}
    end
  end

end
