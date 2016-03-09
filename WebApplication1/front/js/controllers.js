'use strict';

/* Controllers */

var productController = angular.module('pocApp', []);

/*productController.factory('TestService', ['$http', function ($http) {
    var productService = {};

    productService.getProducts = function () {
        return $http.get("/api/product");
    };

    return productService;

}]);

productController.controller('ProductListControl', function ($scope, TestService) {

    getProducts();
    function getProducts() {
        TestService.getProducts()
            .succes(function (studs) {
                $scope.products = studs;
                console.log($scope.products);
            })
            .error(function (error) {
                $scope.status = "Cannot load data" + " " + error.message;
                console.log($scope.status);
            })
    }
});

productController.controller('ProductDetailCtrl', function ($scope, $routeParams, TestService) {
    function showDetails() {
        TestService.getProducts()
                .succes(function (studs) {
                    $scope.product = studs[$routeParams.productid]
                })
                .error(function (error) {
                    $scope.status = "Cannot load details" + error.message;
                    console.log($scope.status);
                })
    }
});

//productController.controller('AddToCartCtrl', function($scope, $selectedProduct)

    /*/var countriesControllers = angular.module('countriesControllers', []);
    
    countriesControllers.controller('CountryListCtrl', ['$scope', '$http',
      function($scope, $http) {
    
          $http.get('countries/countries.json').success(function (data) {
              $scope.countries = data;
            });
    
          $scope.orderProp = 'name';
      }]);
    
    countriesControllers.controller('CountryDetailCtrl', ['$scope', '$routeParams', '$http',
      function($scope, $routeParams, $http) {
           $http.get('countries/' + $routeParams.countryId + '.json').success(function(data) {
               $scope.country = data;
            });
      }]);
    
    countriesControllers.controller('CountryAddCtrl', ['$scope',
        function ($scope) {
            var newcountry = this;
    
            newcountry.countries = [{ text: 'Belgium', done: true }];
    
           /* newcountry.addCountry = function () {
                $scope.adding = [
                   { name: "text", value: newcountry.text },
                   { name: "done", value: 1 },
                ];
    
                $scope.save = function () {
                    $http.post('./countries/countries.JSON, $scope.countries).then(function(data) {
                      $scope.msg = 'Data saved';
                    });
                    $scope.msg = 'Data sent: ' + JSON.stringify($scope.countries);
                };
    };
    
            newcountry.addCountry = function () {
                newcountry.countries.push({ text: newcountry.text, done: false });
                newcountry.text = '';
            };
    
            newcountry.remaining = function () {
                var count = 0;
                angular.forEach(newcountry.countries, function (country) {
                    count += country.done ? 0 : 1;
                });
                return count;
            };
    
            newcountry.archive = function () {
                var oldList = newcountry.countries;
                newcountry.countries = [];
    
                angular.forEach(oldList, function (country) {
                    if (!country.done) newcountry.countries.push(country);
                });
            };
        }]);*/



/*'use strict'; */

/* Controllers */

/*var countryControllers = angular.module('countriesControllers', []);

    countryControllers.controller('CountryListCtrl', ['$scope', '$http', function($scope, $http) {

      var todoList = this;

      todoList.naam = "Countries to visit";
      todoList.todos = [
        { text: 'Belgium', done: true, age: 1000 },
        { text: 'Gambia', done: false, age: 99 }];

      var int = 99;

      $http.get("http://www.w3schools.com/angular/customers.php")
      .success(function (response) {
          
          $scope.names = response.records;
          for (var item in response.records) {
              todoList.todos.push({ text: response.records[item].Country, done: false, age: int = int - 1 });
          }
      });

      todoList.addTodo = function () {
          todoList.todos.push({ text: todoList.todoText, done: false, age: int = int - 1 });
          todoList.todoText = '';
      };

      todoList.remaining = function () {
          var count = 0;
          angular.forEach(todoList.todos, function (todo) {
              count += todo.done ? 0 : 1;
          });
          return count;
      };

      $scope.orderProp = 'age';
      

      todoList.archive = function () {
          var oldTodos = todoList.todos;
          todoList.todos = [];

          angular.forEach(oldTodos, function (todo) {
              if (!todo.done) todoList.todos.push(todo);
          });
      };
  }]);

countryControllers.controller('countryDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      $scope.todo.text = $routeParams.countrytext;
}]); */