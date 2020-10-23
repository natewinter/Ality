$(function() {
  $(document).foundation();
    $(".login-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var username = $("#login_username").val().trim();
        var password = $("#login_password").val().trim();
        // Send the GET request.
        // $.ajax("/api/users/" + username, {
        //   type: "GET",
        //   username: username,
        //   password: password
        // }).then(
        //   function() {
        //     console.log("username: ", username)

        //     location.replace("/users/" + username)
        //   }
        // );
        $.post("/login", {username, password}).then(function(res){
          window.location.href = res;
        })
      });

    //Making post request to make a new user
    $(".new-user-form").on("submit", function(event) {
        
        event.preventDefault();
        var username = $("#new_username").val().trim();
        var password = $("#new_password").val().trim();
        var email = $("#new_email").val().trim();
        const newUser = {
          username, password, email
        }
        console.log(newUser);
        //Send POST request to make new User first
        $.post("/api/users", newUser).then(
            function(res) {
              $('.reveal').foundation('close');
              window.location.href = "/users/"+res.username;
            }
          );
      });

    // Making post request to make a new stat_list
    $(".new-stat-list").on("click", function(event){
      event.preventDefault();
      debugger;
      var stat_list_name = $("#stat-list-name").val().trim();
      var userID = $("#user-id").text();
      const newStatList = {
        name: stat_list_name,
        UserId: userID
      }
      console.log("stat_list_name:", newStatList);
      $.post("/api/stat-lists", newStatList).then(
        function(res) {
          console.log("stat-list post: ", res);
          window.location.reload();
          $('.reveal').foundation('close');
        }
      )
    })
})