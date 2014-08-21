app.controller('AdminFeedCtrl', ['$scope', '$controller', 'Feed',  function ($scope, $controller, Feed) {
  // console.log("Attempting to invoke Feed.getAll()");
  // Feed.getAll().then(function(feedItems) {
  //   // if (err) {
  //   //   console.log(err);
  //   // }
  //   console.log(feedItems);
  //   $scope.feeditemdetails = feedItems;
  // });

  $scope.feeditemdetails = [
    {
      date: "Thu Aug 14",
      dateid: "20140814-date",
      isCollapsed: false,
      items: [
        // TODO: Group these by action/object
        {userid: "53b4c6e12595bcdc07a854dc", name: "Chris Oliver", action: "added a new opportunity", model: "opportunity", target: "Awesome Job", isCollapsed: false},
        {userid: "53b4c6e12595bcdc07a854dc", name: "Chris Oliver", action: "did something else", target: "to this object", isCollapsed: false},
        {userid: "53b4c6e12595bcdc07a854dc", name: "Chris Oliver", action: "did a third thing", target: "to another object", isCollapsed: false},
      ]
    },
    {
      date: "Wed Aug 13",
      dateid: "20140813-date",
      isCollapsed: false,
      items: [
        {userid: "53b4c6e12595bcdc07a854dc", name: "Admin", action: "added a new opportunity", target: "NinjaJob", isCollapsed: false},
        {userid: "53b4c6e12595bcdc07a854dc", name: "Admin", action: "updated ", target: "Company1", isCollapsed: false},
        {userid: "53b4c6e12595bcdc07a854dc", name: "Admin", action: "did something else?", target: "to another object", isCollapsed: false}
        ]
    },
    {
      date: "Tue Aug 12",
      dateid: "20140812-date",
      isCollapsed: false,
      items: [
        {userid: "53b4c6e12595bcdc07a854dc", name: "Admin", action: "added a new opportunity", target: "NinjaJob", isCollapsed: false},
        {userid: "53b4c6e12595bcdc07a854dc", name: "Admin", action: "updated ", target: "Company1", isCollapsed: false},
        {userid: "53b4c6e12595bcdc07a854dc", name: "Admin", action: "did something else?", target: "to another object", isCollapsed: false}
        ]
    },
    {
      date: "Mon Aug 11",
      dateid: "20140811-date",
      isCollapsed: false,
      items: [
        {userid: "53b4c6e12595bcdc07a854dc", name: "Admin", action: "added a new opportunity", target: "NinjaJob", isCollapsed: false},
        {userid: "53b4c6e12595bcdc07a854dc", name: "Admin", action: "updated ", target: "Company1", isCollapsed: false},
        {userid: "53b4c6e12595bcdc07a854dc", name: "Admin", action: "did something else?", target: "to another object", isCollapsed: false}
        ]
    }
  ];

}]);
