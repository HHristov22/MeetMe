localStorage.setItem("Start_calculation", -1);
localStorage.setItem("room_numvers", 0);
localStorage.setItem("room_student_create", 0);

function reloadHelloUser() {
  let fullname = "";

  let isLogin = localStorage.getItem("login");
  if (isLogin == "1") {
    fullname = localStorage.getItem("userFullname");
    role = localStorage.getItem("role");
    if (role == "teacher") {
      refresh_calendar(localStorage.getItem("userFullname"));
    }
    if (role == "student") {
      student_calendar(localStorage.getItem("FN"));
    }
  }
  if (fullname != "") fullname = ", " + fullname;
  //console.log("|" + fullname + "|");
  //document.getElementById("hello_user").innerText = "fullname";
  document.getElementById("output").innerHTML = fullname;
}

function logOut() {
  localStorage.setItem("login", "0");
  reloadHelloUser();
}

function visibilityLoggedButtons() {
  // document.getElementById("f").style.display = "none";
  let isLogin = localStorage.getItem("login");
  if (isLogin == "1")
    document.getElementById("logged-buttons").style.display = "none";
  else document.getElementById("logged-buttons").style.display = "block";
}

function visibilityNavButtons() {
  // document.getElementById("f").style.display = "none";
  let isLogin = localStorage.getItem("login");
  if (isLogin == "1")
    document.getElementById("nav-buttons").style.display = "block";
  else document.getElementById("nav-buttons").style.display = "none";
}

if (localStorage.getItem("role") == "teacher") {
  document.getElementById("virtual-room").style.display = "flex";
  document.getElementById("AddMeet").style.display = "flex";
  document.getElementById("importButton").style.display = "block"; //show
} else {
  document.getElementById("virtual-room").style.display = "none";
  document.getElementById("AddMeet").style.display = "none";
  document.getElementById("importButton").style.display = "none"; // hide
}

reloadHelloUser();
visibilityLoggedButtons();
visibilityNavButtons();

var counter = 0;
var virtualroom = document.getElementById("room");
var members = document.getElementById("members");
var button = document.getElementById("AddMeet");
var virtualroom_list = document.getElementById("meets-list");

var memberList;

const fileInput = document.getElementById("fileInput");
fileInput.style.visibility = "hidden";
const importButton = document.getElementById("importButton");

importButton.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file.type != "text/csv") {
    console.log("Error: Selected file is not CSV file!");
    return;
  }
  console.log("filename:" + file.name);
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    const filecontent = event.target.result;
    if (filecontent.includes("\r\n")) lines = filecontent.split("\r\n");
    else lines = filecontent.split("\n");
    num_lines = lines.length;
    //  console.log(lines);
    console.log(lines);
    for (let index in lines) {
      if (index == 0) {
        console.log(lines[0]);
        if (lines[0] != "room,holder,data,hour,duration,members") {
          console.log(lines[0]);
          console.log("Error: Selected file dosenot contains rooms!");
          return;
        }
      } else if (lines[index] != "" /*index != num_lines - 1*/) {
        data = lines[index];
        data = data.split(",");
        //console.log(data);
        roomname = data[0]; //
        holder = data[1]; //
        date = data[2];
        date = date.split("/");
        time = data[3];
        time_new = time.split(":");
        newdate =
          date[2] +
          "-" +
          date[1].padStart(2, "0") +
          "-" +
          date[0].padStart(2, "0") +
          "T" +
          time_new[0].padStart(2, "0") +
          ":" +
          time_new[1].padStart(2, "0");
        duration = data[4];
        //console.log(duration);
        if (duration == "") duration = 15;
        members_list = data[5];
        members_list = conv_members(members_list);
        let array = [holder, roomname, newdate, duration];
        array = array.concat(members_list);
        ///console.log(array);
        fetch("./models/create_room.php?variableName=" + array)
          .then((response) => response.text())
          .then((data) => {
            if (data) {
              console.log("Room: " + roomname + " was added successfully");
            } else {
              console.log(
                "Room: " + roomname + " contains invalid information"
              );
            }
          });
      }
      window.location.reload();
    }
  });

  reader.readAsText(file);
});

function addMeetToCalendar(
  virtualroom_name,
  meet_link,
  date_room,
  duration_romm,
  members_string,
  indexID
) {
  counter++;
  counter = counter % 2;
  indexID++;
  let classname = "";

  var linebreak1 = document.createElement("br");
  var linebreak2 = document.createElement("br");
  var linebreak3 = document.createElement("br");
  var linebreak4 = document.createElement("br");
  var linebreak5 = document.createElement("br");
  var linebreak6 = document.createElement("br");
  var linebreak_comment = document.createElement("br");
  var linebreak_comment2 = document.createElement("br");

  linebreak5.id = "break" + indexID;

  var newvirtualroom = document.createElement("div");
  newvirtualroom.className = "newvirtualroom";
  newvirtualroom.id = "newvirtualroom" + indexID;
  //////////////////////////////////////////////////
  var virtualroomdiv = document.createElement("div");
  virtualroomdiv.className = "output-virtualroom";
  var label_room = document.createElement("label");
  label_room.textContent = "Room:";
  var room_name = document.createElement("label");
  classname = "labelroom" + counter;
  room_name.className = classname;
  room_name.textContent = virtualroom_name;
  room_name.id = "roomname" + indexID;

  virtualroomdiv.appendChild(label_room);
  virtualroomdiv.appendChild(linebreak1);
  virtualroomdiv.appendChild(room_name);
  ///////////////// LINK  ////////////////////////
  var linkdiv = document.createElement("div");
  linkdiv.className = "output-link";
  var label_link = document.createElement("label");
  label_link.textContent = "Link:";
  var room_link = document.createElement("a");
  classname = "labelroom" + counter;
  room_link.className = classname;
  // let link_text = generate_meet_jit_si_link();
  let link_text = meet_link;
  room_link.id = "roomlink" + indexID;
  room_link.textContent = "Shit.";

  let add_href_to_meet = meet_time(date_room, duration_romm);
  // console.log(date_room + " " + add_href_to_meet);
  if (add_href_to_meet == 1) {
    room_link.textContent = link_text;
    room_link.href = link_text;
    room_link.target = "_blank";
  } else {
    if (add_href_to_meet == 0) {
      room_link.textContent = "Available when meeting start.";
    }
    if (add_href_to_meet == 2) {
      room_link.textContent = "The meeting is over.";
    }
  }

  // console.log(room_link.href);
  linkdiv.appendChild(label_link);
  linkdiv.appendChild(linebreak3);
  linkdiv.appendChild(room_link);
  // console.log("After: " + room_link.href);
  //////////////////////////////////////////////////
  var datadiv = document.createElement("div");
  datadiv.className = "output-data";
  var label_data = document.createElement("label");
  label_data.textContent = "Date:";
  var date_room_label = document.createElement("label");
  classname = "labelroom" + counter;
  date_room_label.className = classname;
  data_str = date_room;
  data_str = data_str.replace("T", " ");
  date_room_label.textContent = data_str;
  date_room_label.id = "roomdate" + indexID;

  datadiv.appendChild(label_data);
  datadiv.appendChild(linebreak2);
  datadiv.appendChild(date_room_label);
  /////////////////////////////////////////////
  var membersdiv = document.createElement("div");
  membersdiv.className = "output-members";

  var label_members = document.createElement("label");
  label_members.textContent = "Members:";

  var members_list = document.createElement("label");
  classname = "labelmembers" + counter;
  members_list.className = classname;
  members_list.textContent = members_string;
  members_list.id = "members_list" + indexID;

  membersdiv.appendChild(label_members);
  membersdiv.appendChild(linebreak4);
  membersdiv.appendChild(members_list);
  ///////////////// comment //////////////////
  var commentdiv = document.createElement("div");
  commentdiv.className = "comments";
  commentdiv.id = "comments" + indexID;
  // add new comment to this element -> commentdiv
  // add comment
  var newcommentdiv = document.createElement("div");
  newcommentdiv.className = "newcomments";

  var add_comment = document.createElement("button");
  add_comment.className = "add_comments";
  add_comment.textContent = "Add comment";
  add_comment.id = "add_button" + indexID;
  add_comment.onclick = function (e) {
    add_comment_function(e);
  };

  var add_comment_input = document.createElement("input");
  add_comment_input.className = "add_comments_input";
  // add_comment_input.ariaPlaceholder = "Add comment";
  add_comment_input.id = "addcomment_input" + indexID;

  newcommentdiv.appendChild(add_comment);
  newcommentdiv.appendChild(add_comment_input);
  // -----------

  var div_label_com = document.createElement("div");
  div_label_com.id = "commentsdiv" + indexID;
  var label_com = document.createElement("label");
  label_com.textContent = "Comments:";
  /* button  hide/ show*/
  var visibility_comments = document.createElement("button");
  visibility_comments.className = "vis_comments";
  visibility_comments.style.backgroundImage = "url(./images/show_button.png)";
  visibility_comments.id = "Vis_button" + indexID;
  visibility_comments.onclick = function (e) {
    visibility(e);
  };
  div_label_com.appendChild(visibility_comments);
  div_label_com.appendChild(label_com);

  /*delete_button.id = "del_button" + indexID; //NOT DONE
  delete_button.onclick = function (e) { del_room(e); };*/

  var comm_list = document.createElement("div");
  classname = "coomets_text";
  comm_list.className = classname;
  // comm_list.textContent = members_string;
  comm_list.id = "comments_list" + indexID;
  commentdiv.appendChild(newcommentdiv);
  commentdiv.appendChild(div_label_com);
  // commentdiv.appendChild(linebreak_comment);
  commentdiv.appendChild(comm_list);
  /////////////////////////////////////////////

  //////////////////////////////////////////////////
  var duration_div = document.createElement("div");
  duration_div.className = "output-duration";
  var label_duration = document.createElement("label");
  label_duration.textContent = "Duration:";
  var duration_label = document.createElement("label");
  classname = "labelroom" + counter;
  duration_label.className = classname;
  duration_label.textContent = duration_romm + " min.";
  duration_label.id = "roomduration" + indexID;

  duration_div.appendChild(label_duration);
  duration_div.appendChild(linebreak6);
  duration_div.appendChild(duration_label);
  /////////////////////////////////////////////

  //////// delay room
  var delay_room_div = document.createElement("div");
  delay_room_div.className = "output-delay-room";
  var linebreak_delay_room = document.createElement("br");
  var linebreak_delay_room2 = document.createElement("br");

  var label_delay_room = document.createElement("label");
  label_delay_room.textContent = "Extending mtg with:";

  var select_delay_room = document.createElement("select");
  select_delay_room.id = "delay_room" + indexID;
  select_delay_room.className = "box";

  var option0 = document.createElement("option");
  option0.value = "";
  option0.text = "Select delay";
  // faster

  var option_5 = document.createElement("option");
  option_5.value = "-5";
  option_5.text = "-5 min";
  var option_10 = document.createElement("option");
  option_10.value = "-10";
  option_10.text = "-10 min";
  var option_15 = document.createElement("option");
  option_15.value = "-15";
  option_15.text = "-15 min";

  // delay
  var option00 = document.createElement("option");
  option00.value = "0";
  option00.text = "ON TIME";
  var option5 = document.createElement("option");
  option5.value = "5";
  option5.text = "5 min";
  var option10 = document.createElement("option");
  option10.value = "10";
  option10.text = "10 min";
  var option15 = document.createElement("option");
  option15.value = "15";
  option15.text = "15 min";
  var option20 = document.createElement("option");
  option20.value = "20";
  option20.text = "20 min";
  var option25 = document.createElement("option");
  option25.value = "25";
  option25.text = "25 min";
  var option30 = document.createElement("option");
  option30.value = "30";
  option30.text = "30 min";
  var option45 = document.createElement("option");
  option45.value = "45";
  option45.text = "45 min";
  var option60 = document.createElement("option");
  option60.value = "60";
  option60.text = "1 hour";

  select_delay_room.appendChild(option0);
  select_delay_room.appendChild(option_15);
  select_delay_room.appendChild(option_10);
  select_delay_room.appendChild(option_5);
  select_delay_room.appendChild(option00);
  select_delay_room.appendChild(option5);
  select_delay_room.appendChild(option10);
  select_delay_room.appendChild(option15);
  select_delay_room.appendChild(option20);
  select_delay_room.appendChild(option25);
  select_delay_room.appendChild(option30);
  select_delay_room.appendChild(option45);
  select_delay_room.appendChild(option60);

  var label_delay_this_room = document.createElement("label");
  label_delay_this_room.id = "delay_this_room" + indexID;

  delay_room_div.appendChild(label_delay_room);
  delay_room_div.appendChild(linebreak_delay_room);
  delay_room_div.appendChild(label_delay_this_room);
  delay_room_div.appendChild(linebreak_delay_room2);
  delay_room_div.appendChild(select_delay_room);

  /*select_delay_room.addEventListener('click', (event) => {
    if(select_delay_room.value==="")
    {
      select_delay_room.removeChild(option0);
    }
  });*/

  select_delay_room.addEventListener("change", (event) => {
    var index = event.target.id;
    index = index.replace(/[\D_]/g, "");
    id_element = "roomname" + index;
    var room_name = document.getElementById(id_element);
    console.log(
      room_name.textContent + ": Delay-> " + event.target.value + " min."
    );
    g_delay = document
      .getElementById("global_delay" + index)
      .textContent.replace(/[\D_]/g, "");
    list =
      room_name.textContent +
      "|" +
      parseInt(event.target.value) +
      "|" +
      g_delay;
    console.log(list);
    fetch("./models/delay_room.php?variableName=" + list)
      .then((response) => response.text())
      .then((data) => {
        if (data) window.location.reload();
      });
  });
  //////////// global delay ////////////////////////////

  var global_delay_room_div = document.createElement("div");
  global_delay_room_div.className = "output-delay-global";
  var linebreak_global_delay_room = document.createElement("br");

  var label_global_delay_room = document.createElement("label");
  label_global_delay_room.textContent = "Meeting start delay:";

  var label_global_delay_room_min = document.createElement("label");
  label_global_delay_room_min.textContent = "0 min.";
  label_global_delay_room_min.className = "labelroom" + counter;
  label_global_delay_room_min.id = "global_delay" + indexID;

  global_delay_room_div.appendChild(label_global_delay_room);
  global_delay_room_div.appendChild(linebreak_global_delay_room);
  global_delay_room_div.appendChild(label_global_delay_room_min);

  /////////////// delete button //////////////////
  var delete_button = document.createElement("button");
  delete_button.className = "delete-rome-button";
  // delete_button.textContent = "8"; //☒🗑❌
  delete_button.id = "del_button" + indexID;
  delete_button.onclick = function (e) {
    del_room(e);
  };

  newvirtualroom.appendChild(datadiv);
  newvirtualroom.appendChild(virtualroomdiv);
  newvirtualroom.appendChild(linkdiv);
  newvirtualroom.appendChild(duration_div);
  newvirtualroom.appendChild(membersdiv);
  newvirtualroom.appendChild(delay_room_div);
  newvirtualroom.appendChild(global_delay_room_div);
  if (localStorage.getItem("role") == "teacher") {
    newvirtualroom.appendChild(delete_button);
    get_room_delay(virtualroom_name, label_delay_this_room);
  } else {
    select_delay_room.style.visibility = "hidden";
    get_gloabl_delay(
      virtualroom_name,
      label_delay_this_room,
      label_global_delay_room_min
    );
  }

  virtualroom_list.appendChild(linebreak5);
  // virtualroom_list.appendChild(newvirtualroom);

  var vir_room = document.createElement("div");
  vir_room.className = "virtual_room";
  vir_room.appendChild(newvirtualroom);
  // vir_room.appendChild(linebreak_comment2);
  vir_room.appendChild(commentdiv);
  // newvirtualroom.appendChild(linebreak_comment2); ////////
  // newvirtualroom.appendChild(commentdiv);////////
  virtualroom_list.appendChild(vir_room);
  add_get_comments(virtualroom_name, comm_list.id, indexID);

  return true;
}

function get_room_delay(roomname, room_delay) {
  // console.log(roomname);
  fetch("./models/get_room_delay.php?variableName=" + roomname)
    .then((response) => response.text())
    .then((data) => {
      room_delay.textContent = data + " min.";
      // console.log("TUK!!!!");
      T = localStorage.getItem("Start_calculation");
      T++;
      localStorage.setItem("Start_calculation", T);
    });
}

function get_gloabl_delay(roomname, delay, global_delay) {
  console.log(roomname);
  fetch("./models/get_global_delay.php?variableName=" + roomname)
    .then((response) => response.text())
    .then((data) => {
      data = data.split(",");
      delay.textContent = data[0] + " min.";
      global_delay.textContent = data[1] + " min.";
      T = localStorage.getItem("Start_calculation");
      T++;
      localStorage.setItem("Start_calculation", T);
      let R = localStorage.getItem("room_student_create");
      R++;
      localStorage.setItem("room_student_create", R);
    });
}

function meet_time(meet_start, duration_romm) {
  now = new Date();

  const duration = parseInt(duration_romm);
  // Create a Date object for the start date
  let startDate = new Date(meet_start);
  let endDate = new Date(meet_start);
  // Add the desired number of minutes to the start date
  endDate.setMinutes(endDate.getMinutes() + duration);
  /*let isBetween = now.getTime() >= startDate.getTime() && now.getTime() <= endDate.getTime();
    console.log(now + "|" + startDate + "|" + endDate);
  if (isBetween) {
    return 1;
  }*/

  if (now < startDate) {
    return 0;
  } else if (now > endDate) {
    return 2;
  } else {
    return 1;
  }
}

function add_comment_function(e) {
  let button_id = e.target.id;
  indexID = button_id.replace(/[\D_]/g, "");
  //comments_list
  id_element = "addcomment_input" + indexID;
  var comment = document.getElementById(id_element);
  holder = localStorage.getItem("userFullname");
  id_room_name = "roomname" + indexID;
  var room = document.getElementById(id_room_name);
  room_name = room.textContent;
  comment_text = comment.value;
  dupp_comm = comment_text.replace(/ /g, "");
  var list = room_name + "|" + holder + "|" + comment_text;
  console.log(list);
  if (dupp_comm.length > 0) {
    fetch("./models/add_comment.php?variableName=" + list)
      .then((response) => response.text())
      .then((data) => {
        if (data) {
          console.log("ADDD.............");
          window.location.reload();
        } else {
          console.log("No");
        }
      });
  }
  //console.log(list);
}

async function add_get_comments(someVariable, div_comments_id, ID_div) {
  try {
    const response = await fetch("./models/room_comments.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `someVariable=${someVariable}`,
    });
    let data = await response.text();
    data = data.slice(1);
    if (data.length != 0) {
      let list_com = data.split("//");
      // console.log(list_com);
      for (let index in list_com) {
        one_comment = list_com[index].split("||");
        // console.log(one_comment);
        var label_holder = document.createElement("label");
        label_holder.textContent = one_comment[0] + ": ";
        label_holder.className = "holder_comment";

        var label_com = document.createElement("label");
        label_com.textContent = one_comment[1];
        label_com.className = "single_comment";

        var div_single_com = document.createElement("div");
        div_single_com.className = "div_single_comment";
        // div_single_com.id = "comments_" + ID_div;

        div_single_com.appendChild(label_holder);
        div_single_com.appendChild(label_com);

        var all_comms = document.getElementById(div_comments_id);
        all_comms.appendChild(div_single_com);
      }
    } else {
      element1id = "commentsdiv" + ID_div;
      element2id = "comments_list" + ID_div;

      var el1 = document.getElementById(element1id);
      var el2 = document.getElementById(element2id);
      el1.style.display = "none"; //hide
      el2.style.display = "none"; //hide
    }
  } catch (error) {
    console.error(error);
  }
}

function generate_meet_jit_si_link() {
  let link = "Shit";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < 8; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  randomString = "https://meet.jit.si/" + randomString;
  return randomString;
}

function addXmintodata(datestr, min) {
  let date = new Date(datestr);
  let after = new Date(datestr);
  after.setMinutes(after.getMinutes() + min);

  let year = after.getFullYear();
  let month = String(after.getMonth() + 1).padStart(2, "0");
  let day = String(after.getDate()).padStart(2, "0");
  let hours = String(after.getHours()).padStart(2, "0");
  let minutes = String(after.getMinutes()).padStart(2, "0");

  let dateString = `${year}-${month}-${day}T${hours}:${minutes}`;
  return dateString;
}

function visibility(e) {
  let button_id = e.target.id;
  var button = document.getElementById(button_id);
  indexID = button_id.replace(/[\D_]/g, "");
  //comments_list
  id_element = "comments_list" + indexID;
  var comments = document.getElementById(id_element);
  if (comments.style.display == "none") {
    comments.style.display = "block";
    e.target.style.backgroundImage = "url(./images/show_button.png)";
  } else {
    comments.style.display = "none";
    e.target.style.backgroundImage = "url(./images/hide_button.png)";
  }
}

function del_room(e) {
  /*console.log("Del!");
  console.log(e.target.id);*/
  let button_id = e.target.id;
  indexID = button_id.replace(/[\D_]/g, "");
  // for delete
  //console.log(indexID);
  let virtualroom_div_id = "newvirtualroom" + indexID;
  let break_line_id = "break" + indexID;
  var virtualroom_div = document.getElementById(virtualroom_div_id);
  var break_line = document.getElementById(break_line_id);
  // get data
  // room name
  let virtualroom_id = "roomname" + indexID;
  var virtualroom = document.getElementById(virtualroom_id);
  room_for_delete = virtualroom.textContent;
  //console.log("|" + room_for_delete + "|");
  // members list
  let members_id = "members_list" + indexID;
  var members = document.getElementById(members_id);
  members_for_delete = members.textContent;
  //console.log("|"+members_for_delete+"|");
  fetch("./models/delete_room.php?variableName=" + room_for_delete)
    .then((response) => response.text())
    .then((data) => {
      // console.log("ALL ROOM:\n");
      if (data) {
        fetch("./models/delete_comments.php?variableName=" + room_for_delete)
          .then((response) => response.text())
          .then((data) => {
            // console.log("ALL ROOM:\n");
            if (data) {
              //console.log("Del! YESS");
              /*fullname = localStorage.getItem("userFullname");
              if (virtualroom_div && break_line) {
                virtualroom_div.parentNode.removeChild(virtualroom_div);
                break_line.parentNode.removeChild(break_line);
              }*/
              window.location.reload();
              //refresh_calendar(localStorage.getItem("userFullname"));
            }
          });
      }
    });
}

function addMeet(event) {
  event.preventDefault();
  validateMeet();
}

function validateMeet(result) {
  let room = document.getElementById("room");
  let members = document.getElementById("members");
  let properties = [room, members];
  let check = 0;
  properties.forEach((property, index) => {
    let validityState = property.validity;

    let errorSection = property.nextElementSibling;

    if (!validityState.valid) {
      if (validityState.valueMissing) {
        outputMissing = property.getAttribute("name");
        outputMissing = outputMissing[0].toUpperCase() + outputMissing.slice(1);
        errorSection.innerHTML = "'" + outputMissing + "' is missing.";
        //console.log("Missing");
        check = index + 1;
      }
      errorSection.style.display = "block";
    }
    if (
      property.value.length < property.minLength ||
      property.value.length > property.maxLength
    ) {
      let outputMissing = property.getAttribute("name");
      outputMissing = outputMissing[0].toUpperCase() + outputMissing.slice(1);
      errorSection.innerHTML = "Enter valid: " + outputMissing + ".";
      check = index + 1;

      errorSection.style.display = "block";
      // console.log(property.value + "-> Errors:" + check + " min:"+property.minLength +" max:"+property.maxLength+" |->"+property.value.length);
    }
    if (property == members) {
      let str = members.value;
      let lenmembers = str.length;
      outputMissing = property.getAttribute("name");
      if (lenmembers % 6 != 5) {
        errorSection.innerHTML = "Enter valid: " + outputMissing + ".";
        check = index + 1;
      } else {
        for (let i = 0; i < lenmembers; i++) {
          if ((str[i] == " " && (i + 1) % 6 != 0) || isNaN(str[i])) {
            errorSection.innerHTML = "Enter valid: " + outputMissing + ".";
            check = index + 1;
            break;
          }
        }
      }
      errorSection.style.display = "block";
    }
    // if (index == 1 && check == 0) {

    //     if(&&)

    // }
    errorSection.style.display = "block";
    if (check != index + 1) {
      errorSection.innerHTML = "";
      errorSection.style.display = "none";
    }
  });
  if (check == 0) {
    let R = 1;
    let S = 1;

    ////////////     room      /////////////////////
    roomname = room.value;
    let rooms = [];
    let all_student = [];
    fetch("./models/check_room.php")
      .then(function (response) {
        //console.log("First");
        return response.text();
      })
      .then(function (resultr) {
        // Handle the response from the PHP script
        //console.log(result);
        rooms = resultr.split(",");
        //console.log(rooms);
        if (rooms.includes(roomname)) {
          R = 0;
          //room.nextElementSibling.innerHTML = "This room exists.";
          //console.log("This room exists.");
          // Vurni greska che sushtestvuva tazi staq
        }
      })
      .catch(function (error) {
        console.error(error);
      });
    ///////////// student //////////////////////
    membersforCheck = conv_members(members.value);
    fetch("./models/check_students.php")
      .then(function (response) {
        //console.log("First");
        return response.text();
      })
      .then(function (result) {
        // Handle the response from the PHP script
        result = result.slice(1);
        //console.log("?"+result+"?");
        students = result.split(",");
        // console.log(students);
        students = students.map(Number);
        /*console.log(students);*/
        if (!membersforCheck.every((elem) => students.includes(elem))) {
          //console.log("Some FNs are invalid.");
          S = 0;
          //members.nextElementSibling.innerHTML = "Some FNs are invalid.";
        }
      })
      .catch(function (error) {
        console.error(error);
      });
    ///////////////////////////////////////////////

    setTimeout(function () {
      //console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
      //console.log(R + "*" + S);
      if (R && S) {
        ///console.log("Add");
        fullname = localStorage.getItem("userFullname");
        //roomname // newroom
        let datatime = document.getElementById("data_time");
        let duration = document.getElementById("duration");
        let dur = duration.value;
        if (dur == "") dur = 15;
        console.log("dur" + dur);
        let array = [fullname, roomname, datatime.value, dur];
        array = array.concat(membersforCheck);
        ///console.log(array);
        fetch("./models/create_room.php?variableName=" + array)
          .then((response) => response.text())
          .then((data) => {
            ////console.log(data);
            if (data) {
              // let datatime = document.getElementById("data_time");
              window.location.reload();
              //console.log("Data:"+datatime.value+"|");
              //refresh_calendar(fullname);
            }
          });
      } else {
        //console.log("No");
      }
    }, 440);

    //console.log(memberList);
  }
}

function conv_members(str) {
  let mem_list = str.split(" ").map(Number);
  return mem_list;
}

function refresh_calendar(teacher) {
  fetch("./models/teacher_room.php?variableName=" + teacher)
    .then((response) => response.text())
    .then((data) => {
      // console.log("ALL ROOM:\n");
      //console.log("|*"+data+"*|");
      if (data.length > 1) teachersroom(data);
    });
}

function student_calendar(fn_student) {
  fetch("./models/student_room.php?variableName=" + fn_student)
    .then((response) => response.text())
    .then((data) => {
      // console.log("ALL ROOM:\n");
      // console.log(fn_student);
      // console.log("@" + data + "@");
      if (data.length > 2) studentsroom(data);
      else emptystudentcalendar();
    });
}

function emptystudentcalendar() {
  var zerovirtualroomlabel = document.createElement("h2");
  zerovirtualroomlabel.className = "emptycalendar";
  zerovirtualroomlabel.textContent =
    '"You have no virtual meetings scheduled for today. Enjoy your free time!"';
  // zerovirtualroomlabel.id = "roomname" + indexID;

  var elem_header = document.getElementById("header");
  elem_header.appendChild(zerovirtualroomlabel);

  var calendar = document.getElementById("meets-list");
  calendar.parentNode.removeChild(calendar);
}

function teachersroom(data) {
  data = data.slice(1);
  list = data.split("|");
  old_room_lenght = list.length;
  for (let removeID = 1; removeID < old_room_lenght; removeID++) {
    let nameid = "newvirtualroom" + removeID;
    let breakid = "break" + removeID;
    let rem_element = document.getElementById(nameid);
    let rem_element_break = document.getElementById(breakid);
    if (rem_element && rem_element_break) {
      rem_element.parentNode.removeChild(rem_element);
      rem_element_break.parentNode.removeChild(rem_element_break);
    }
  }
  //console.log(list);
  /*
  localStorage.setItem("Start_calculation", -1);
  localStorage.setItem("room_numvers", 0);
  */
  localStorage.setItem("room_numvers", list.length);
  localStorage.setItem("Start_calculation", 0);
  for (let index in list) {
    // console.log(index + "->" + list[index]);
    room = list[index];
    room = room.split(",");
    let roomname = room[0];
    room.shift();
    let meet_link = room[0];
    room.shift();
    let data_time_room = room[0];
    room.shift();
    let duration_romm = room[0];
    room.shift();
    let roommembers = room.join(", ");
    let T = addMeetToCalendar(
      roomname,
      meet_link,
      data_time_room,
      duration_romm,
      roommembers,
      index
    );

    // console.log("N: "+ localStorage.getItem("room_numvers")+" I" +localStorage.getItem("Start_calculation"));
  }
  let i = 0;
  let j = 0;
  N = list.length;
  let listdup = [];
  // console.log(N);
  for (i = 1; i < N; i++) {
    let change = 0;
    let divid1 = "newvirtualroom" + i;
    let div1 = document.getElementById(divid1);

    for (j = i + 1; j <= N; j++) {
      let id1 = "roomdate" + i;
      let id1_dur = "roomduration" + i;

      let id2 = "roomdate" + j;
      let id2_dur = "roomduration" + j;

      let meetdata1 = document.getElementById(id1);
      let dur1 = document.getElementById(id1_dur);
      let meetdata2 = document.getElementById(id2);
      let dur2 = document.getElementById(id2_dur);

      let conflict = check_meets(
        meetdata1.textContent,
        dur1.textContent,
        meetdata2.textContent,
        dur2.textContent
      );
      // console.log("i:"+i+" " + meetdata1.textContent+ " " +dur1.textContent+ "j:"+j + " "+ meetdata2.textContent+ " " +dur2.textContent + "-> "+ conflict)
      if (conflict) {
        listdup.push(i);
        listdup.push(j);
      }
    }
  }
  // console.log(listdup);
  listdup = [...new Set(listdup)];
  // console.log(listdup);
  // listdup = Array.from(new Set(listdup));

  //dupp_room
  /*for (let i = 0; i < listdup.length; i++) {
    id = "newvirtualroom" + listdup[i];
    let div = document.getElementById(id);
    //console.log(div.className);
    div.className = "newvirtualroom_dup";
  }*/

  // setTimeout(function () {add_global_delay(N)},1000);
  let intervalId = setInterval(() => {
    let A = localStorage.getItem("Start_calculation");
    let B = localStorage.getItem("room_numvers");
    if (A == B) {
      // console.log("wait...");
      clearInterval(intervalId);
      // console.log("START");
      add_global_delay(N);
      export_button();
    }
  });
}

function export_button() {
  var export_button = document.createElement("button");
  export_button.className = "exportMeets";
  export_button.textContent = "Export meets";
  export_button.id = "exportButton";
  export_button.onclick = function (e) {
    export_meets();
  };
  var virtualroom_list = document.getElementById("meets-list");
  virtualroom_list.appendChild(export_button);
}

function export_meets() {
  let N = localStorage.getItem("room_numvers");
  console.log("........->" + N);

  let data = [["room", "holder", "data", "hour", "duration", "members"]];
  console.log("N->" + N);
  for (let i = 1; i <= N; i++) {
    let room_ex = document.getElementById("roomname" + i).textContent;
    let holder_ex = localStorage.getItem("userFullname");
    let fulldate = document.getElementById("roomdate" + i).textContent;
    fulldate = fulldate.split(" ");
    let data_mid = fulldate[0].replace(/-/g, "/");
    data_mid = data_mid.split("/");
    let data_ex = data_mid[2] + "/" + data_mid[1] + "/" + data_mid[0];

    let hour_ex = fulldate[1];
    let duration_ex = parseInt(
      document.getElementById("roomduration" + i).textContent
    );
    let members_ex = document.getElementById("members_list" + i).textContent;
    members_ex = members_ex.replace(/,/g, "");
    console.log(members_ex);
    info_room = [room_ex, holder_ex, data_ex, hour_ex, duration_ex, members_ex];
    data.push(info_room);
    console.log(info_room);
  }

  teacher = localStorage.getItem("userFullname");

  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1 to get the actual month
  const day = String(now.getDate()).padStart(2, "0");

  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  date =
    day + "-" + month + "-" + year + "_H" + hour + "-" + minute + "-" + second;
  let date_export_file = date;

  const name_file = teacher.replace(/ /g, "_") + "_D" + date_export_file;
  const csvString = data.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = name_file;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function check_meets(meetdata1, dur1, meetdata2, dur2) {
  meetdata1 = meetdata1.replace(/ /g, "T");
  dur1 = dur1.split(" ")[0];
  meetdata2 = meetdata2.replace(/ /g, "T");
  dur2 = dur2.split(" ")[0];

  const duration1 = parseInt(dur1);
  let startDate1 = new Date(meetdata1);
  let endDate1 = new Date(meetdata1);
  endDate1.setMinutes(endDate1.getMinutes() + duration1);

  const duration2 = parseInt(dur2);
  let startDate2 = new Date(meetdata2);
  let endDate2 = new Date(meetdata2);
  endDate2.setMinutes(endDate2.getMinutes() + duration2);

  if (startDate1 <= startDate2 && endDate1 > startDate2) {
    return true;
  }
  return false;
}

function studentsroom(data) {
  data = data.slice(1);
  list = data.split("|");
  old_room_lenght = list.length;
  for (let removeID = 1; removeID < old_room_lenght; removeID++) {
    let nameid = "newvirtualroom" + removeID;
    let breakid = "break" + removeID;
    let rem_element = document.getElementById(nameid);
    let rem_element_break = document.getElementById(breakid);
    if (rem_element && rem_element_break) {
      rem_element.parentNode.removeChild(rem_element);
      rem_element_break.parentNode.removeChild(rem_element_break);
    }
  }
  //console.log(list);
  for (let index in list) {
    room = list[index];
    room = room.split(",");
    let roomname = room[0];
    room.shift();
    let meet_link = room[0];
    room.shift();
    let data_time_room = room[0];
    room.shift();
    let duration_romm = room[0];
    room.shift();
    let roommembers = room.join(", ");
    roommembers = roommembers.replace(",", " -"); //roommembers = roommembers.replace(",", " Students:");
    roommembers = roommembers; //roommembers = "Teacher: " + roommembers;
    // console.log(roomname + "->" + roommembers);
    addMeetToCalendar(
      roomname,
      meet_link,
      data_time_room,
      duration_romm,
      roommembers,
      index
    );
  }
  //console.log(list.length);
  let i = 0;
  let j = 0;
  N = list.length;
  let listdup = [];
  for (i = 1; i < N; i++) {
    let change = 0;
    let divid1 = "newvirtualroom" + i;
    let div1 = document.getElementById(divid1);

    for (j = i + 1; j <= N; j++) {
      let id1 = "roomdate" + i;
      let id1_dur = "roomduration" + i;

      let id2 = "roomdate" + j;
      let id2_dur = "roomduration" + j;

      let meetdata1 = document.getElementById(id1);
      let dur1 = document.getElementById(id1_dur);
      let meetdata2 = document.getElementById(id2);
      let dur2 = document.getElementById(id2_dur);

      let conflict = check_meets(
        meetdata1.textContent,
        dur1.textContent,
        meetdata2.textContent,
        dur2.textContent
      );
      // console.log("i:"+i+" " + meetdata1.textContent+ " " +dur1.textContent+ "j:"+j + " "+ meetdata2.textContent+ " " +dur2.textContent + "-> "+ conflict)
      if (conflict) {
        listdup.push(i);
        listdup.push(j);
      }
    }
  }
  listdup = [...new Set(listdup)];
  // console.log(listdup);
  // listdup = Array.from(new Set(listdup));
  let intervalId = setInterval(() => {
    let A = localStorage.getItem("room_student_create");
    if (N == A) {
      console.log("wait_color...");
      clearInterval(intervalId);
      room_color(N);
      console.log("START_color");
    }
  });
}

function add_global_delay(N) {
  // N = 0;
  for (let i = 1; i < N; i++) {
    let j = i + 1;
    let id_delay_global1 = "global_delay" + i;
    let id_delay_global2 = "global_delay" + j;
    let delay_global1 = document.getElementById(id_delay_global1);
    let delay_global2 = document.getElementById(id_delay_global2);
    let id_start_meet1 = "roomdate" + i;
    let id_duration = "roomduration" + i;
    let id_start_meet2 = "roomdate" + j;
    roomname = document.getElementById("roomname" + j).textContent;
    extendet = document.getElementById("delay_this_room" + i).textContent;
    //console.log(roomname);
    let diff = diff_beetween_two_meets(
      id_start_meet1,
      id_duration,
      id_start_meet2,
      delay_global1,
      delay_global2,
      extendet
    );
    //console.log(diff)
    if (diff < 0) {
      let delay2 = parseInt(delay_global2.textContent.replace(/[\D_]/g, ""));
      delay2 += diff * -1;
      delay_global2.textContent = delay2 + " min.";
      diff = -1 * diff;
    } else {
      diff = 0;
    }
    room_delay = parseInt(
      document.getElementById("delay_this_room" + j).textContent
    );
    list = roomname + "|" + room_delay + "|" + diff;
    // console.log(list);
    fetch("./models/delay_room.php?variableName=" + list)
      .then((response) => response.text())
      .then((data) => {
        // console.log(data + "|");
      });
  }
  room_color(N);
}

function room_color(N) {
  for (let i = 1; i <= N; i++) {
    id = "newvirtualroom" + i;
    let div = document.getElementById(id);
    let id_delay_global = "global_delay" + i;
    let delay_global = document.getElementById(id_delay_global);
    let delay1 = parseInt(delay_global.textContent);
    // console.log(delay1);
    if (delay1 > 0) {
      if (delay1 > 60) delay1 = 60;
      delay1 = (delay1 * 25) / 10;
      let B = 255 - parseInt(delay1); //255 - 105 //100-> RED
      div.style.backgroundColor = "rgb(255, " + B + ", 0, 0.4)";
    } else div.style.backgroundColor = "(255, 255, 255, 0.2)";
  }
}

function diff_beetween_two_meets(id_s1, dur, id_s2, d1, d2, extendetn) {
  let el_s1 = document.getElementById(id_s1);
  let el_dur = document.getElementById(dur);
  let el_s2 = document.getElementById(id_s2);

  let start1 = el_s1.textContent.replace(/ /g, "T");
  let delay1 = parseInt(d1.textContent.replace(/[\D_]/g, ""));
  let duration = parseInt(el_dur.textContent.replace(/[\D_]/g, ""));
  extendetn = parseInt(extendetn);

  let start2 = el_s2.textContent.replace(/ /g, "T");
  let delay2 = parseInt(d2.textContent.replace(/[\D_]/g, ""));

  let startDate1 = new Date(start1);
  startDate1.setMinutes(startDate1.getMinutes() + delay1);
  let endDate1 = new Date(start1);
  endDate1.setMinutes(endDate1.getMinutes() + delay1 + duration + extendetn);
  // console.log("Extendet......: "+ extendetn);

  let startDate2 = new Date(start2);
  startDate2.setMinutes(startDate2.getMinutes() + delay2);

  difference = Math.round((startDate2 - endDate1) / (1000 * 60));

  // console.log("S:" + startDate1+ " E: "+endDate1+ " S-> "+startDate2 + "DIFF" +difference);
  return difference;
}
