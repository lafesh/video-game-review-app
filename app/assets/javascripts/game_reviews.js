$(document).ready(function() {
    attachListeners()
})

function attachListeners() {
    $('.js-reviews').click(getReviews)
    $('.js-next').click(nextReview)
    $('.js-new-review').click(newReview)
    $('#js-submit').click(submitReview)
}

function getReviews() {
    event.preventDefault()
    let id = parseInt($(".js-reviews").attr("data-id"))
    $.get(`/games/${id}/reviews.json`, function(data) {
        $("#h2-reviews").text("Reviews")
        data[0].map(r => {
            let user
            data[1].map(u => {if(u.id == r.user_id) {user = u.first_name}})
            $("#reviews").append(
                `<h3>${r.title}</h3>
                 <h4>${r.rating} Star(s) - </h4>
                 <p>${r.content}</p>
                 <h5>written by ${user}</h5><br>`)
                 //recommendation
        })
    })
}

function nextReview() {
    event.preventDefault()
    var gameId = parseInt($(".js-next").attr("game-id"))
    var reviewId = parseInt($(".js-next").attr("review-id"))
    $.get(`/games/${gameId}/reviews/${reviewId}.json`, function(data) {
        var ind
        data[1].forEach(function(r, index) {if(r.game_id == data[0].game_id) {ind = index}})
        $.get(`/games/${data[1][ind+1].game_id}/reviews/${data[1][ind+1].id}.json`, function(data) {
            var game
            data[2].forEach(g => {if(g.id == data[0].game_id) {game = g.name}})
            $("#r-game").text(game)
            $("#r-rating").text(data[0]["rating"] + " Star(s) -") //figure out recommend
            $("#r-title").text(data[0]["title"])
            $("#r-content").text(data[0]["content"])
            
            //figure out buttons

            $(".js-next").attr("game-id", data[0]["game_id"])
            $(".js-next").attr("review-id", data[0]["id"])   
        })
    })
}

function createForm(action, method, model = null) {
    //do i need this if i am only using it for one form
}

function newReview() {
    event.preventDefault()
    var gameId = parseInt($(".js-new-review").attr("data-id"))
    $.get(`/games/${gameId}/reviews/new.json`, function(data) {
        $(".js-new-review").remove()
        $("#review-form").append(
            `<form action="/reviews" method="post">
                <input type="hidden" id="game_id" name="game_id" value="${data["game_id"]}">
                <input type="hidden" id="user_id" name="user_id" value="${data["user_id"]}">
                <label for="title">Title</label>
                <input type="text" name="title">
                <label for="content">Content</label>
                <input type="text" name="content">
                <label for="rating">Rating</label>
                <input type="number" name="rating" min="1" max="5" step="1" value="1">
                <label for="recommend">Recommend</label>
                <input type="checkbox" name="recommend">
                <input type="submit" value="Create Review" id=js-submit">
            </form>`
        )
        debugger
    })
}

function submitReview() {
    debugger
}