app.controller('AdminTagsCtrl', ['$scope', 'Tag', function($scope, Tag){

  var initialize = function(){
    Tag.getAll().then(function(tags){
      $scope.tags = tags.filter(function(tag){ return tag.active; });
    });
  };

  $scope.save = function(tag){
    if(tag._id){
      Tag.update(tag).then(function(data){
        console.log('Tag updated successfully');
      });
    } else {
      Tag.create(tag).then(function(data){
        console.log('Tag created successfully');
      });
    }
  };

  $scope.add = function(){
    $scope.tags.unshift({});
  };

  $scope.remove = function(tag, index){
    if(tag._id){
      tag.active = false;
      Tag.update(tag).then(function(data){
        console.log('Tag removed successfully');
        $scope.tags.splice(index, 1);
      });
    } else {
      $scope.tags.splice(index, 1);
    }
  };

  initialize();

}]);