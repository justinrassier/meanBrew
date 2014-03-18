
UserViewModel = function(User){
    this._id = User._id;
    this.firstName = User.firstName;
    this.lastName =  User.lastName;
    this.username = User.username;
    this.roles = User.roles;
};

exports.UserViewModel = UserViewModel;