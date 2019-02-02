$(document).ready(function() {
    attachListeners()
})

function attachListeners() {
    $('.js-reviews').click(getReviews) // displays reviews on game show page
    $('.js-next').click(nextReview) // displays next review on review show page
    $('.js-new-review').click(newReview) // displays review form and creates review
    $('#submit-game').click(displayGame) // displays game show page after game selection
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
                 <h4>${r.rating} Star(s) - ${r.recommend == true ? "Would Recommend" : "Would Not Recommend"}</h4>
                 <p>${r.content}</p>
                 <h5>written by ${user}</h5><br>`)
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
            let rec = data[0].recommend == true ? "Would Recommend" : "Would Not Recommend"
            data[2].forEach(g => {if(g.id == data[0].game_id) {game = g.name}})
            $("#r-game").text(game)
            $("#r-rating").text(data[0]["rating"] + " Star(s) -" + rec )
            $("#r-title").text(data[0]["title"])
            $("#r-content").text(data[0]["content"])
            debugger
            //figure out buttons
            $(".edit-review").attr("data-id", data[0]["id"])
            $(".delete-review").attr("data-id", data[0]["id"])
            $(".show-reviews").attr("data-id", data[0]["game_id"])
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
                <input type="hidden" id="game_id" name="review[game_id]" value="${data["game_id"]}">
                <input type="hidden" id="user_id" name="review[user_id]" value="${data["user_id"]}">
                <input type="hidden" name="authenticity_token" value="${$("meta[name=csrf-token]")[1].content}">
                <label for="title">Title</label>
                <input type="text" name="review[title]">
                <label for="content">Content</label>
                <input type="text" name="review[content]">
                <label for="rating">Rating</label>
                <input type="number" name="review[rating]" min="1" max="5" step="1" value="1">
                <label for="recommend">Recommend</label>
                <input type="checkbox" name="review[recommend]">
                <input type="submit" value="Create Review" id=js-submit">
            </form>`
        )

    })
}

function displayGame() {
    event.preventDefault()
    let game_id = parseInt($("#games").val())
    $.get(`/games/${game_id}.json`, function(data){
        debugger
        //render the whole showpage somehow
    })
    
}