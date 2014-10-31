app.factory('authHttpInterceptor', ['localStorageService', '$location', function (localStorageService, $location) {
   return {
     'request': function(config) {
       config.headers = config.headers || {};
       if (localStorageService.get('token')) {
         config.headers.Authorization = 'Bearer ' + localStorageService.get('token');
       }
       if (!isTokenInDate(localStorageService) && checkAuthorizedRoutes(config.url)) {
         $location.path('/login');
       }
       return config;
     }
   };
  }])

  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authHttpInterceptor');
  }]);

var checkAuthorizedRoutes = function(url){
  if(url.match(/send/g)){
    return false;
  } else if (url.match(/reset/g)) {
    return false;
  } else if (url.match(/auth/g)) {
    return false;
  } else {
    return true;
  }
};

var isTokenInDate = function (localStorageService) {
  var tokenDate = new Date(JSON.parse(localStorageService.get('token-date')));
  if (tokenDate) {
    var today = new Date();
    var timeDiff = Math.abs(today.getTime() - tokenDate.getTime());
    var diffDays = timeDiff / (1000 * 3600 * 24);
    if(diffDays > 0.25) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};

app.factory('OppSetUp', ['Match', function(Match) {

  return {
    groups: Match.getAll().then(function(data) {
      return data;
    })
  };
}]);













