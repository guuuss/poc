'use strict';

/* Controllers */

var productController = angular.module('productControllers', ['ngCookies']);
productController.controller('LoginController', ['$scope', '$http', '$cookies',
    function($scope, $http, $cookies)
    {
        $scope.logMeIn = function () {
            var logindata = $scope.passwordinput;
            var emaildata = $scope.emailinput;
            var data = { "Password": logindata, "Email": emaildata };
            $http.post(
                '../api/user/ValidateUser/', data
                ).success(function (data) {
                    $cookies.put('logincookie', 'usr');
                }
                ).error(function (data) {
                    window.alert("Foute email en password combinatie ingevoerd!");
                }
                );
        }
        $scope.isNotLoggedIn = function () {
            if($cookies.get('logincookie') == null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        $scope.logout = function()
        {
            $cookies.remove('logincookie');
        }
    }
]);
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
            var categories;

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
            $scope.fetchCategories = function () {
                $http.get("../api/category/").then(
                function (response) {
                    $scope.categories = response.data;
                }, function (response) {
                    $scope.error = response;
                });
            }
            $scope.fetchCategories();
            $scope.saveProduct = function () {
                var name = $scope.Name;
                var price = $scope.Price;
                var brand = $scope.Brand;
                var category = $scope.Category;
                var quantity = $scope.Quantity;
                var data = {"Name":name,"Price":price, "Brand": brand, "Category": category, "Quantity": quantity};
                $http.post(
                    '../api/product/', data
                    ).success(function (data) {
                        window.alert("Product is succesvol toegevoegd!");

                    }
                    ).error(function (data) {
                        window.alert("Helaas pindakaas!\n Het product is niet toegevoegd!");
                    }
                    );
            }

            $scope.deleteProduct = function (id) {
                $scope.number = id;
                
                $http.delete('../api/product/' + $scope.number).success(function (data) { window.alert("Product verwijderd!"); }).error(function (data) { window.alert("Product niet verwijderd... "); })
            }

            $scope.updateProduct = function (p) {
                $scope.number = p.Product_id;
                var data = { "Product_id" : p.Product_id,"Name": p.Name, "Price": p.Price, "Brand": p.Brand, "Category": p.Category, "Quantity": p.Quantity };
                $http.put('../api/product/' + $scope.number, data).success(function (data) { window.alert("Product aangepast!"); }).error(function (data) { window.alert("Product niet aangepast... "); })
            }

        }
]);
productController.controller('shoppingcartCtrl', ['$scope', '$location', 'shoppingcartService', function ($scope, $location, shoppingcartService) {
    $scope.selectedProducts = [];
    $scope.addToCart = function (item, path) {
        shoppingcartService.addSelectedProduct(item);
        $location.url(path);

    }
}]);

productController.service('shoppingcartService', function () {
    var selectedProducts = [];
    var addSelectedProduct = function (noItem) {
        selectedProducts.push({ Item: noItem, isSelected: false, Quantity: noItem.Quantity });

    }

    var getSelectedProducts = function () {
        return selectedProducts;
    }

    return {
        addSelectedProduct: addSelectedProduct,
        getSelectedProducts: getSelectedProducts
    };

});
productController.controller('shoppingcartCtrlV2', function ($scope, shoppingcartService) {
    $scope.currentselectedproducts = shoppingcartService.getSelectedProducts();
});

productController.controller('shoppingcartFunctionsCtrl', function ($scope, shoppingcartService) {
    $scope.currentselectedproducts = shoppingcartService.getSelectedProducts();

    $scope.Remove = function (toRemove, item) {
        if (toRemove) {
            var index = $scope.currentselectedproducts.indexOf(item);
            $scope.currentselectedproducts.splice(index, 1);
        }
    }

    $scope.FinishOrder = function () {
        alert("Thank you for ordering!")
    }
});
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

