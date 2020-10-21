$(function() {
    $(".login-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var username = $("#login_username").val().trim();
        var password = $("#login_password").val().trim();
        // Send the GET request.
        $.ajax("/api/users/" + username, {
          type: "GET",
          username: username,
          password: password
        }).then(
          function() {
            // Locate user to the correct user page
            location.redirect("/users/" + username);
          }
        );
      });

    //Making post request to make a new user
    $(".new-user-form").on("submit", function(event) {
        
        event.preventDefault();
        var username = $("#new_username").val().trim();
        var password = $("#new_password").val().trim();
        var email = $("#new_email").val().trim();
        //Send POST request to make new User first
        $.ajax("/users/create", {
            type: "POST",
            username: username,
            password: password,
            email: email
          }).then(
            function() {
              // Locate user to their new user page
              location.redirect("/user/" + username);
            }
          );
      });

    // Making post request to make a new stat_list
    $(".new-stat-list").on("submit", function(event){
      event.preventDefault();
      var stat_list_name = $("#stat-list-name").val().trim();
      $.ajax("/stat_list/create", {
        type: "POST",
        stat_list_name: stat_list_name
      })
    })
})