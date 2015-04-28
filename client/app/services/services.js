angular.module('shortly.services', [])

.factory('Links', function ($http) {
  // Your code here

  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/links'
    })
    .success(function (resp) {
      return resp.data;
    });
  };

  var addLink = function (link, cb) {
    var successful = function(x){
      console.log('position',x);
      link.lat = x.coords.latitude;
      link.lon = x.coords.longitude;
      link.timestamp = x.timestamp;
      return $http.post('/api/links', link).success(cb);
      // return $http({
      //   method: 'POST',
      //   url: '/api/links',
      //   data: link
      // }).success(cb);
    };
    navigator.geolocation.getCurrentPosition(successful);
    console.log('addLink in services',link);
  };

  //         console.log('location',loc);
  //         link.loc = loc;
          // return $http({
          //   method: 'POST',
          //   url: '/api/links',
          //   data: link
          // });

  return {
    getAll: getAll,
    addLink: addLink
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
