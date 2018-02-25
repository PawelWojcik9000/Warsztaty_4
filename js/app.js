$(function() {
    var booksList = $('#books-list');

    function loadAllBooks() {
        $.ajax({
            url: "http://localhost:8282/books",
            type: "GET",
            dataType: "json"
        }).done(function(res) {
            console.log(res);
            renderAllBookTitles(res);
        });
    }

    loadAllBooks();

    function renderAllBookTitles(arr) {
        arr.forEach(function(element, index, array) {
            var newListItem = $('<li>');
            newListItem.text(element.title);
            newListItem.data('id', element.id);
            newListItem.attr('data-id', element.id); // opcjonalnie
            newListItem.append($('<div class="book-details"></div>'));
            newListItem.appendTo(booksList);
        });

        var bookTitles = booksList.find('li');

        for (i = 0; i < bookTitles.length; i++) {
            $(bookTitles[i]).on('click', function(event) {
                var target = $(event.target);
                var id = target.data('id');
        
                $.ajax({
                    url: "http://localhost:8282/books/" + id,
                    type: "GET",
                    dataType: "json"
                })
                .done(function(res) {
                    populateDetailsDiv(res, target);
                })
                .always(function() {
                    console.log('wyslano zapytanie o pojedyncza ksiazke');
                })
                .fail(function(err) {
                    console.log(err);
                });
            });
        }
    }

    function populateDetailsDiv(obj, elem) {
        var isbn = obj.isbn;
        var publisher = obj.publisher;
        var type = obj.type;
        var author = obj.author;
        var bookDetailsElem = $(elem).find('.book-details');

        bookDetailsElem
            .append($("<p>ISBN: " + isbn + "</p>"))
            .append($("<p>Wydawca: " + publisher + "</p>"))
            .append($("<p>Typ: " + type + "</p>"))
            .append($("<p>Autor: " + author + "</p>"));

        bookDetailsElem.slideToggle();
    }



    $.ajax({
        url: "http://date.jsontest.com/",
        type: "GET",
        dataType: "json"
    })
    .always(function() {
        console.log('wyslalem zapytanie');
    })
    .done(function(res) {
        var responseObj = res;
        renderSpan(responseObj);
    })
    .fail(function() {});

    function renderSpan(obj) {
        var dateElement = $('<span>');
        dateElement.text("Dzisiejsza data: " + obj.date);
        dateElement.appendTo('body');
    }
});
