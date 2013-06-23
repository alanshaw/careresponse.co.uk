window.cr = {}

cr.loadFeedsApi = function (cb) {
  try {
    google.load("feeds", "1")
    google.setOnLoadCallback(function (evt) {
      cb()
    })
  } catch (e) {
    cb(e)
  }
}

cr.getNewsFeed = function (num, cb) {
  cr.loadFeedsApi(function (er) {
    if (er) return cb(er)
    var feed = new google.feeds.Feed("http://careresponse.tumblr.com/rss")
    feed.setNumEntries(num)
    feed.load(function (res) {
      if (res.error) return cb(new Error(res.error.message))
      cb(null, res.feed)
    })
  })
}

// Get the post ID from a tumblr link
cr.getPostId = function (link) {
  return link.replace(/[^0-9]/g, "")
}

$(document).ready(function () {
  
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault()
    var target = this.hash, $target = $(target)
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
        window.location.hash = target
    })
  })
  
  $(".validation-engine").validationEngine()
})

$("#home").each(function () {
  cr.getNewsFeed(2, function (er, feed) {
    if (er) return console.error('Failed to load news feed', er)
    var container = $("#box-home-news ul")
    $.each(feed.entries, function (i, entry) {
      var link = $("<a/>").attr("href", "news.html#" + cr.getPostId(entry.link)).text(entry.title).append('<i class="icon-angle-right"></i>')
        , li = $("<li/>").append(link)
      container.append(li)
    })
  })
})

$("#news").each(function () {
  cr.getNewsFeed(5, function (er, feed) {
    if (er) return console.error('Failed to load news feed', er)
    var container = $('#articles')
    $.each(feed.entries, function (i, entry) {
      var title = $("<h1/>").append(entry.title)
        , article = $("<article/>").append(title).append(entry.content).attr('id', cr.getPostId(entry.link))
      container.append(article)
    })
    window.location.hash = window.location.hash
  })
})

$("#testimonials").each(function () {
  cr.getNewsFeed(2, function (er, feed) {
    if (er) return console.error('Failed to load news feed', er)
    var container = $("#box-news ul")
    $.each(feed.entries, function (i, entry) {
      var link = $("<a/>").attr("href", "news.html#" + cr.getPostId(entry.link)).text('More')
        , title = $('<h2/>').text(entry.title)
        , li = $("<li/>").append(title).append(entry.contentSnippet + ' ').append(link)
      container.append(li)
    })
  })
})