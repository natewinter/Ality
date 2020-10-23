$(function () {
  $(document).foundation();
  
  $("#nextButton").on("click", function (event) {
    const numStats = parseInt($("#sliderOutput1").val());
    const statDiv = $(".stat-div");
    for (let i = 0; i < numStats; i++) {
      const newDiv = $("<div class='stat-def-params grid-x'>");
      const selectType = $("<select class='stat-type-select cell small-4'>")
      newDiv.append($("<input type='text' placeholder='stat-name' class='stat-def-name cell small-8'>"));
      selectType.append($("<option value='1'>").text("Counter"));
      selectType.append($("<option value='2'>").text("Ratio"));
      selectType.append($("<option value='4'>").text("Colon Ratio"));
      selectType.append($("<option value='8'>").text("Average"));
      newDiv.append(selectType);
      statDiv.append(newDiv);
    }
  })

  $(".login-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var username = $("#login_username").val().trim();
    var password = $("#login_password").val().trim();
    // Send the GET request.
    $.ajax("/api/users/" + username, {
      type: "GET",
      username: username,
      password: password,
    }).then(function () {
      console.log("username: ", username);

      location.replace("/users/" + username);
    });
  });

  //Making post request to make a new user
  $(".new-user-form").on("submit", function (event) {
    event.preventDefault();
    var username = $("#new_username").val().trim();
    var password = $("#new_password").val().trim();
    var email = $("#new_email").val().trim();
    const newUser = {
      username,
      password,
      email,
    };
    console.log(newUser);
    //Send POST request to make new User first
    $.post("/api/users", newUser).then(function (res) {
      console.log("users post: ", res);
      $(".reveal").foundation("close");
    });
  });

  // Making post request to make a new stat_list
  $(".new-stat-list").on("click", function (event) {
    event.preventDefault();
    var stat_list_name = $("#stat-list-name").val().trim();
    var userID = $("#user-id").text();
    const newStatList = {
      name: stat_list_name,
      UserId: userID,
    };
    console.log("stat_list_name:", newStatList);
  
  });

  $(".submit-stat-list").on("click", function (event) {
    event.preventDefault();
    var stat_list_name = $("#stat-list-name").val().trim();
    var userID = $("#user-id").text();
    const newStatList = {
      name: stat_list_name,
      UserId: userID,
    };
    console.log("stat_list_name:", newStatList);
    var sliderOutput = parseInt($("#sliderOutput1").val());
    console.log("slider value", sliderOutput);
    const statArray = []
    $(".stat-def-params").each(function(index){
      const name = $(this).find(".stat-def-name").val().trim()
      const stat_type = parseInt($(this).find(".stat-type-select").val())
      statArray.push({name, stat_type})
    })
    $.post("/api/stat-lists", newStatList).then(function (res) {
      console.log("stat-list post: ", res);
      window.location.reload();
      $(".reveal").foundation("close");
      statArray.forEach(function(statDef){
        $.post("/api/stat-defs", {StatListId: res.id, ...statDef}).then(function (res) {
          console.log(res);
        });
      })
    });
    
  });
});