$(function () {
  $(document).foundation();
  $(".login-form").on("submit", function (event) {
    // PreventDefault on submit event.
    event.preventDefault();
    var username = $("#login_username").val().trim();
    var password = $("#login_password").val().trim();
    $.post("/login", { username, password }).then(function (res) {
      window.sessionStorage.setItem("username", res.username);
      window.sessionStorage.setItem("id", res.id);
      window.location.href = "/users/" + sessionStorage.getItem("username")
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
      $(".reveal").foundation("close");
         // TODO: change so it requires login? otherwise there is no "SESSION"
      // window.location.href = "/users/" + res.username;
    });
  });

  $("#nextButton").on("click", function (event) {
    const numStats = parseInt($("#sliderOutput1").val());
    const statDiv = $(".stat-div");
    for (let i = 0; i < numStats; i++) {
      const newDiv = $("<div class='stat-def-params grid-x'>");
      const selectType = $("<select class='stat-type-select cell small-4'>");
      newDiv.append(
        $(
          "<input type='text' placeholder='stat-name' class='stat-def-name cell small-8'>"
        )
      );
      selectType.append($("<option value='1'>").text("Counter"));
      selectType.append($("<option value='2'>").text("Ratio"));
      selectType.append($("<option value='4'>").text("Colon Ratio"));
      selectType.append($("<option value='8'>").text("Average"));
      newDiv.append(selectType);
      statDiv.append(newDiv);
    }
  });

  // Making post request to make a new stat_list
  $(".new-stat-list").on("click", function (event) {
    event.preventDefault();
    var stat_list_name = $("#stat-list-name").val().trim();
    const newStatList = {
      name: stat_list_name,
      UserId: window.sessionStorage.getItem("id")
    };
    console.log("stat_list_name:", newStatList);
  });

  $(".submit-stat-list").on("click", function (event) {
    event.preventDefault();
    var stat_list_name = $("#stat-list-name").val().trim();
    const newStatList = {
      name: stat_list_name,
      UserId: window.sessionStorage.getItem("id")
    };
    console.log("stat_list_name:", newStatList);
    var sliderOutput = parseInt($("#sliderOutput1").val());
    console.log("slider value", sliderOutput);
    const statArray = [];
    $(".stat-def-params").each(function (index) {
      const name = $(this).find(".stat-def-name").val().trim();
      const stat_type = parseInt($(this).find(".stat-type-select").val());
      statArray.push({ name, stat_type });
    });
    $.post("/api/stat-lists", newStatList).then(function (res) {
      console.log("stat-list post: ", res);
      window.location.reload();
      $(".reveal").foundation("close");
      statArray.forEach(function (statDef) {
        $.post("/api/stat-defs", { StatListId: res.id, ...statDef }).then(
          function (res) {
            console.log(res);
          }
        );
      });
    });
  });

  $(".submit-new-ality").on("click", function (event) {
    event.preventDefault();
    var name = $("#alityName").val().trim();
    var imgsrc = $("#alityImageSrc").val().trim();
    var dataValueArray = [];

    var urlParams = window.location.href.split("/");
    const statListId = parseInt(urlParams[urlParams.length-1]);
    console.table(urlParams);
    console.log(statListId);

    var newAlity = {
      name,
      image: imgsrc,
      StatListId: statListId
    };

    // For each element of class stat_a or stat_b
    // Add the info about those stats to objects in a new array
    // For building the data-values objects
    $(".stat-a").each(function(index){
      const newDataValue = {};
      newDataValue.StatDefId = parseInt($(this).attr("name").substring(2));
      newDataValue.val_A = parseFloat($(this).val());
      dataValueArray.push(newDataValue);
    });

    $(".stat-b").each(function(index){
      const statDefId = parseInt($(this).attr("name").substring(2));
      const arrIndex = dataValueArray.findIndex((value, index)=>{
        return value.StatDefId == statDefId;
      });

      dataValueArray[arrIndex].val_B = parseFloat($(this).val());
    });
    
    $.post("/api/ality", newAlity).then(function (res) {
      console.log("ality post: ", res);
      // $(".reveal").foundation("close");
      
      for(let i = 0; i<dataValueArray.length; i++){
        dataValueArray[i].AlityId=res.id;
      }

      console.log(dataValueArray);

      $.post("/api/data-values", {dataValueArray}).then(function (res) {
        console.log(res);
        window.location.reload();
      })
    });
    
  });
  $(".deleteButton").on("click",function(){
    $.ajax({
      url: "/api/stat-list/" + $(this).attr("data-id"),
      type: 'DELETE',
      success: function(result) {
        console.log(result)
        window.location.reload()
          // Do something with the result
      }
  });

  })
});
