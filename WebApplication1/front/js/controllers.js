'use strict';

/* Controllers */

var productController = angular.module('productControllers', []);
productController.controller('ProductController', ['$scope', '$routeParams', '$http',
        function ($scope, $routeParams, $http) {

            var products;
            var query;
            var orderProp;

            $scope.fetchProducts = function () {
                console.log("probeer items te laden");
                $http.get("../api/product").then(
                function (response) {
                    $scope.products = response.data;
                }, function (response) {
                    $scope.error = response;
                });

            }
            $scope.fetchProducts();
            $scope.logMeIn = function () {
                var logindata = $scope.passwordinput;
                var emaildata = $scope.emailinput;
                var data = {"Password":logindata,"Email":emaildata};
                $http.post(
                    '../api/user/ValidateUser/', data
                    ).success(function (data) {
                        window.alert("succces!");
                    }
                    ).error(function (data) {
                        window.alert(logindata);
                    }
                    );
            }
        }
]);

productController.controller('ProductDetailController', ['$scope', '$routeParams', '$http',
        function ($scope, $routeParams, $http) {

            $scope.number = $routeParams.Product_id;
            var items = this;

            $scope.fetchDetails = function () {
                console.log("probeer details te laden");
                $http.get('../api/product/' + $scope.number).then(
                    function (response) {
                        $scope.item = response.data;

                    }, function (response) {
                        $scope.error = response;
                    });
            }
            $scope.fetchDetails();
        }
]);


productController.controller('AdminControl', ['$scope', '$routeParams', '$http',
        function ($scope, $routeParams, $http) {
            console.log("ben nu hier");

            var product = this;
            var products;
            var query;
            var orderProp;

            $scope.fetchProducts = function () {
                console.log("probeer die zooi te halen");
                $http.get("../api/product").then(
                function (response) {
                    $scope.products = response.data;
                }, function (response) {
                    $scope.error = response;
                });
            }
            $scope.fetchProducts();

            product.saveProduct = function () {
                console.log("save moet nog gemaakt worden");
                var name = $scope.Name;
                var price = $scope.Price;
                var brand = $scope.Brand;
                var category = $scope.Category;
                var quantity = $scope.Quantity;

                var data = {"Name":name,"Price":price, "Brand": brand, "Category": category, "Quantity": quantity};
                $http.post(
                    '../api/product/', data
                    ).success(function (data) {
                        window.alert("succces!");
                    }
                    ).error(function (data) {
                        window.alert(logindata);
                    }
                    );
            }

            product.deleteProducts = function () {
                console.log("delete moet nog gemaakt worden", product);
            }

            product.updateProducts = function (product) {
                console.log("update moet nog gemaakt worden", product.data);
            }

        }
]);
/*


//productController.controller('AddToCartCtrl', function($scope, $selectedProduct)

    /*/
    /*var countriesControllers = angular.module('countriesControllers', []);
    
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
*/

