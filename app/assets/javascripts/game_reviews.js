$(document).ready(function() {
    attachListeners()
})

function attachListeners() {
    $('.js-reviews').click(getReviews) // displays reviews on game show page
    $('.js-next').click(nextReview) // displays next review on review show page
    $('.js-new-review').click(newReview) // displays review form and creates review
    $('#select-game').click(selectGame) // form sumission to 
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
        data.map(r => {
            let review = new Review(r.id, r.title, r.content, r.rating, r.recommend)
            $("#reviews").append(review.render() + `<h5>written by ${r.user.first_name}</h5><br>`)
        })
    })
}

function nextReview() {
    event.preventDefault()
    let gameId = parseInt($(".js-next").attr("game-id"))
    let reviewId = parseInt($(".js-next").attr("review-id"))
    $.get(`/games/${gameId}/reviews/${reviewId}.json`, function(data) {
        let ind
        data.forEach(function(r, index) {if(r.game.id == gameId) {ind = index + 1}})
        $.get(`/games/${data[ind].game.id}/reviews/${data[ind].id}.json`, function(data) {
            let ind
            data.forEach(function(r,index) {if(r.game.id == parseInt($(".js-next").attr("game-id"))) {ind = index + 1}})
            let rev = data[ind]
            $("#r-game").text(rev.game.name)
            $("#review-display").html("")
            let review = new Review(rev.id, rev.title, rev.content, rev.rating, rev.recommend)
            $("#review-display").append(review.render())
            $("#edit-button").attr("formAction", `/games/${rev.game.id}/reviews/${rev.id}/edit`)
            $("#delete-button").attr("formAction", `/games/${rev.game.id}/reviews/${rev.id}`)
            $(".show-reviews").attr("href", `/games/${rev.game.id}`)
            rev == data[data.length-1] ? $(".js-next").remove() : $(".js-next").attr({"game-id": rev.game.id, "review-id": rev.id}) 
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
                <input type="hidden" id="game_id" name="review[game_id]" value="${data.game.id}">
                <input type="hidden" id="user_id" name="review[user_id]" value="${data.user.id}">
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

function selectGame() {
    event.preventDefault()
    let game = parseInt($("#game_id").val())
    $.get(`/reviews.json`, function(data) {
        let rev
        data.forEach(r => {if(r.game_id == game) {rev = r}})
        if(rev == undefined) {
            $("#error").append('<p>You do not have a review for that Game.</p>')
            $("#review-list").html("")
        } else {
            $("#error").html("")
            let d = new Date(rev.created_at)
            let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
            let date = d.toLocaleDateString('en-EN', options)
            $("#review-list").html("")
            $("#review-list").append(`
                <br><a href="/games/${rev.game_id}/reviews/${rev.id}">${rev.title}</a><br>
                created on ${date}`)
        }    
    })
}