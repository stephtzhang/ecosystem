steph = User.create(name: "steph", password: "test")
joe = User.create(name: "joe", password: "test")

(1..10).each do
  steph.games.create(score: 51 + rand(50))
  joe.games.create(score: 51 + rand(50))
end
