(function() {

    angular.module('app')
        .controller('BooksController', ['books', 'dataService', 'logger', 'badgeService', '$q', '$cookies', '$cookieStore', '$log', BooksController]);


    function BooksController(books, dataService, logger, badgeService, $q, $cookies, $cookieStore, $log) {

        var vm = this;

        vm.appName = books.appName;

        var booksPromise = dataService.getAllBooks();
        var readersPromise = dataService.getAllReaders();

        $q.all([booksPromise, readersPromise])
            .then(getAllDataSuccess)
            .catch(getAllDataError);

        function getAllDataSuccess(dataArray){
            vm.allBooks = dataArray[0];
            vm.allReaders = dataArray[1];
        }

        function getAllDataError(reason){
            console.log(reason)
        }

        vm.getBadge = badgeService.retrieveBadge;

        vm.favoriteBook = $cookies.favoriteBook;
        vm.lastEdited = $cookieStore.get('lastEdited');

        $log.log("logging with log");
        $log.info("logging with info");
        $log.warn("logging with warn");
        $log.error("logging with error");
        $log.debug("logging with debug");

    }

}());