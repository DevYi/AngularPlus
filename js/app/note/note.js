app.controller('NoteCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('js/app/note/notes.json').then(function (resp) {
    $scope.notes = resp.data.notes;
    //设置便笺默认值
    $scope.note = $scope.notes[0];
    $scope.notes[0].selected = true;
  });

  $scope.colors = ['primary', 'info', 'success', 'warning', 'danger', 'dark'];
  //创建新便笺
  $scope.createNote = function(){
    var note = {
      content: '添加新便笺',
      color: $scope.colors[Math.floor((Math.random()*3))],
      date: Date.now(),
      completed: false
    };
    note.content = $scope.checkItem(note, $scope.notes, 'content');
    $scope.notes.push(note);
    $scope.selectNote(note);
  }

  $scope.checkItem = function(obj, arr, key){
    var i=1;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };

  //删除便笺
  $scope.deleteNote = function(note){
    $scope.notes.splice($scope.notes.indexOf(note), 1);
    if(note.selected){
      //更换选中状态，清除textarea中内容
      $scope.note = $scope.notes[0];
      $scope.notes.length && ($scope.notes[0].selected = true);
    }
  }
  //选中便笺
  $scope.selectNote = function(note){
    angular.forEach($scope.notes, function(note) {
      //默认是false
      note.selected = false;
    });
    $scope.note = note;
    //点击就为true
    $scope.note.selected = true;
  };
 //清空已经完成
  $scope.clear = function(note){
    var result = [];
    angular.forEach($scope.notes,function(note) {
      if(!note.completed){
        result.push(note);
      }
    });
    $scope.notes = result;
    $scope.note = $scope.notes[0];
   };

 //显示已完成
  $scope.show = function(){
    for(var i = 0; i < $scope.notes.length; i++){
      if($scope.notes[i].completed){
        return true;
      }
    }
    return false;
  };

}]);