var app = angular.module('MyCtrl', []);
app.controller('BaseCtrl', ['$scope', function ($scope){

  function findIndex(arr, destroyedID) {
    var index = -1;
    var val = destroyedID;
    var filteredObj = arr.find(function(item, i){
      if(item.id === val){
        index = i;
        return i;
      }
    })
    return index;
  }

  function createUI(arr, data) {
    arr.push(data);
    $scope.$apply();
  }

  function destroyUI(arr, destroyedID) {
    var index = findIndex(arr, destroyedID);
    arr.splice(index, 1);
    $scope.$apply();
  }

  function updateUI(arr, destroyedID, data) {
    var index = findIndex(arr, destroyedID);
    alert(index);
    if(index > -1) {
      alert(JSON.stringify(arr[index]));
      arr[index] = data;
      alert(JSON.stringify(arr[index]));
    }
    $scope.$apply();
  }

  io.socket.get('/tags', function(data){
    $scope.tags = data;
    $scope.$apply();
  });

  io.socket.on('tags', function(event){
    switch(event.verb) {
      case 'created':
        createUI($scope.tags, event.data);
        break;
      case 'destroyed':
        destroyUI($scope.tags, event.previous.id);
        break;
      case 'updated':
        updateUI($scope.tags, event.previous.id, event.data);
        break;
    }
  });

  io.socket.get('/readers', function(data){
    $scope.readers = data;
    $scope.$apply();
  });

  io.socket.on('readers', function(event){
    switch(event.verb) {
      case 'created':
        createUI($scope.readers, event.data);
        break;
      case 'destroyed':
        destroyUI($scope.readers, event.previous.id);
        break;
      case 'updated':
        updateUI($scope.readers, event.previous.id, event.data);
        break;
    }
  });

  io.socket.get('/assets', function(data){
    $scope.assets = data;
    $scope.$apply();
  });

  io.socket.on('assets', function(event){
    switch(event.verb) {
      case 'created':
        createUI($scope.assets, event.data);
        break;
      case 'destroyed':
        destroyUI($scope.assets, event.previous.id);
        break;
      case 'updated':
        updateUI($scope.assets, event.previous.id, event.data);
        break;
    }
  });

  io.socket.get('/events', function(data){
    $scope.events = data;
    $scope.$apply();
  });

  io.socket.on('events', function(event){
    switch(event.verb) {
      case 'created':
        createUI($scope.events, event.data);
        break;
      case 'destroyed':
        destroyUI($scope.events, event.previous.id);
        break;
      case 'updated':
        updateUI($scope.events, event.previous.id, event.data);
        break;
    }
  });


}]);