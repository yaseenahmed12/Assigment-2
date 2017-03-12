(function () {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var Purchase = this;
    Purchase.list = ShoppingListCheckOffService.getShoppingList();
    Purchase.item = function(itemIndex) {
      try {
        ShoppingListCheckOffService.purchaseItem(itemIndex);
      } catch (err) {
        alert(err);
      }
    };
  }


  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var Sold = this;
    Sold.list = ShoppingListCheckOffService.getSoldList();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var sold_list = [];
    var shopping_list = [
      {name: "Apples", quantity: 2},
      {name: "Oranges", quantity: 3},
      {name: "Pears", quantity: 4},
      {name: "Grapefruits", quantity: 5},
      {name: "Bananas", quantity: 6}
    ];

    service.getShoppingList = function() {
      return shopping_list;
    };

    service.getSoldList = function() {
      return sold_list;
    };

    service.purchaseItem = function(itemIndex) {
      var item = shopping_list.splice(itemIndex, 1);
      sold_list.push(item[0]);
    };
  }

})();