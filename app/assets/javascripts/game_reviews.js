$(document).ready(function() {
    attachListeners()
})

function attachListeners() {
    $('.js-reviews').click(getReviews) // displays reviews on game show page
    $('.js-next').click(nextReview) // displays next review on review show page
    $('.js-new-review').click(newReview) // displays review form and creates review
}

class Review {
    constructor(id, title, content, rating, recommend) {
        this.id = id
        this.title = title
        this.content = content
        this.rating = rating
        this.recommend = recommend
    }

    render() {
        let html = `
        <h3>${this.title}</h3>
        <h4>${this.rating} Star(s) - ${this.recommend == true ? "Would Recommend" : "Would Not Recommend"}</h4>
        <p>${this.content}</p>
        `
        return html
    }
}

function getReviews() {
    event.preventDefault()
    let id = parseInt($(".js-reviews").attr("data-id"))
    $.get(`/games/${id}/reviews.json`, function(data) {
        $("#h2-reviews").text("Reviews")
        data[0].map(r => {
            let user
            data[1].map(u => {if(u.id == r.user_id) {user = u.first_name}})
            let game = new Review(r.id, r.title, r.content, r.rating, r.recommend)
            $("#reviews").append(game.render() + `<h5>written by ${user}</h5><br>`)
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
            $("#review-display").html("")
            let review = new Review(data[0].id, data[0].title, data[0].content, data[0].rating, data[0].recommend)
            $("#review-display").append(review.render())
            debugger
            $("#edit-button").attr("formAction", `/games/${data[0]["game_id"]}/reviews/${data[0]["id"]}/edit`)
            $("#delete-button").attr("formAction", `/games/${data[0]["game_id"]}/reviews/${data[0]["id"]}`)
            $(".show-reviews").attr("data-id", data[0]["game_id"])
            $(".js-next").attr("game-id", data[0]["game_id"])
            $(".js-next").attr("review-id", data[0]["id"])   
        })
    })
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