//put toaster global variable into service so we can use in dependency injection
angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function(mvToastr){
    return {
        notify: function(msg){
            mvToastr.success(msg);
            console.log(msg);
        }
    }

})