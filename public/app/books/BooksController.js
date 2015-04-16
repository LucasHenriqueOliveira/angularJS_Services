(function() {

    angular.module('app')
        .controller('BooksController', ['books', 'dataService', 'logger', 'badgeService', '$q', '$cookies', '$cookieStore', '$log', '$route', 'BooksResource', BooksController]);


    function BooksController(books, dataService, logger, badgeService, $q, $cookies, $cookieStore, $log, $route, BooksResource) {

        var vm = this;

        vm.appName = books.appName;

        dataService.getUserSummary()
            .then(getUserSummarySuccess);

        function getUserSummarySuccess(summaryData) {
            console.log(summaryData);
            vm.summaryData = summaryData;
        }

        //dataService.getAllBooks()
        //    .then(getBooksSuccess)
        //    .catch(errorCallback)
        //    .finally(getAllBooksComplete);

        vm.allBooks = BooksResource.query();

        function getBooksSuccess(books) {
            //throw 'error in success handler';
            vm.allBooks = books;
        }

        function getBooksNotification(notification) {
            //console.log('Promise Notification: ' + notification);
        }

        function errorCallback(errorMsg) {
            console.log('Error Message: ' + errorMsg);
        }

        function getAllBooksComplete() {
            //console.log('getAllBooks has completed');
        }

        dataService.getAllReaders()
            .then(getReadersSuccess)
            .catch(errorCallback)
            .finally(getAllReadersComplete);

        function getReadersSuccess(readers) {
            vm.allReaders = readers;
        }

        function getAllReadersComplete() {
            //console.log('getAllReaders has completed');
        }

        vm.getBadge = badgeService.retrieveBadge;

        vm.favoriteBook = $cookies.favoriteBook;
        vm.lastEdited = $cookieStore.get('lastEdited');

        vm.deleteBook = function (bookID) {

            dataService.deleteBook(bookID)
                .then(deleteBookSuccess)
                .catch(deleteBookError);

        };

        function deleteBookSuccess(message) {
            $log.info(message);
            $route.reload();
        }

        function deleteBookError(errorMessage) {
            $log.error(errorMessage);
        }

    }

}());