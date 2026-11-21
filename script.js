// Name: Paxton Robertson
// Desc: Populate Channels and messages from API endpoint


function changeChannel(e) {
  document.querySelector(".active")?.classList.remove("active");
  e.currentTarget.classList.add("active");
  populateMessages(e.currentTarget.getAttribute("data-channel"));
  document.querySelector("#channel-title").innerText =
    e.currentTarget.innerText;
}

async function populateMessages(chat) {
  document.querySelectorAll(".message").forEach((item) => item.remove());
  let template = document.querySelector("template");
  // INSERT CODE HERE
  // Fetch brings in the messages using the channel name as the parameter
  const restults2 = await fetch(`https://slackclonebackendapi.onrender.com/messages?channelId=${chat}`)
  const messagesArr = await restults2.json(); // change results to JSON format

  // Loops through each message brought in to the array of the respective channel
  for (let message of messagesArr) {
    // take user id from array and fetch the user name to use later
    const senderResults = await fetch(`https://slackclonebackendapi.onrender.com/users?id=${message.senderId}`);
    const senderName = await senderResults.json();

    // brings in template to map each message to and then append
    let newTemplate = document.importNode(template.content, true);
    let messageElement = newTemplate.querySelector(".message");

    // set message text and sender information
    messageElement.querySelector(".text").textContent = message.content;
    messageElement.querySelector(".sender").textContent = senderName[0].name;

    // append message to chat messages section
    document.querySelector("#chat-messages").appendChild(newTemplate);
  }

}


async function init() {
  // INSERT CODE HERE
  // fetches the channel names
  const results = await fetch("https://slackclonebackendapi.onrender.com/channels");
  // makes channel name results into JSON
  const resultArr = await results.json();

  // loops through each channel in json array to create a new element for each
  for (i = 0; i < resultArr.length; i++) {
    const button = document.createElement("button"); // creat new button element

    button.className = "channel"; // add channel class
    button.setAttribute("data-channel", resultArr[i].id); // set data-channel attribute to id
    button.innerText = resultArr[i].name; // sets inner text of button to name of each returned channel

    // appends new button element to the list of channels
    document.querySelector(".channel-list").appendChild(button);
  }
  document
    .querySelectorAll(".channel")
    .forEach((item) => item.addEventListener("click", changeChannel)); // adds click event listener to each new channel button

}

init();
