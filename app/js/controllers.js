'use strict';

/* Controllers */


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

/*
function CartController($scope){
    $scope.items=[
        {tile:'pea',count:8,price:3.00},{tile:'apple',count:9,price:4.00}
    ]
}
CartController.$inject = [];*/

myApp.controller('CartController', ['$scope', function($scope){
	$scope.items=[
        {tile:'pea',count:8,price:3.00},{tile:'apple',count:9,price:4.00}
    ]
}]);

