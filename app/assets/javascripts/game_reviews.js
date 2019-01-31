$(document).ready(function() {
    attachListeners()
})

function attachListeners() {
    $('.js-reviews').click(getReviews)
    $('.js-next').click(nextReview)
    $('.js-new-review').click(newReview)
    $('.js-submit').click(submitReview)
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

function newReview() {
    event.preventDefault()
    var gameId = parseInt($(".js-new-review").attr("data-id"))
    $.get(`/games/${gameId}/reviews/new.json`, function(data) {
        var form = $("#form_id")
        $("#review-form").append(form)
        debugger
    })
}

function submitReview() {

}