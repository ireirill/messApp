const channels = [];
let selectedChannel = channels.length ? channels[0] : null;
const CURRENT_USER = "Irene";

init = () => {
  for (let i = 0; i < channels.length; i++) {
    addChannelToList(channels[i]);
  }
  if (channels.length > 0) {
    selectChannel(channels[0]);
  } else {
    console.log("hi");
    toggleNewMessageDisabled(true);
  }
};

/*Show modal to create new channel*/

openNewChannelModal = () => {
  toggleNewChannelModal(true);
};

/*Hide modal to create new channel*/

closeNewChannelModal = () => {
  toggleNewChannelModal(false);
};

toggleNewChannelModal = (show) => {
  getNewChannelModal().style.display = show ? "block" : "none";
  const newChannelInput = getNewChannelInput();
  newChannelInput.value = "";
  if (show) {
    newChannelInput.focus();
  }
};

/*Create new channel when you click enter*/

newChannelInputKey = (event) => {
  if (event.key === "Enter") {
    createNewChannel();
  }
};

/*Create channel with value of input and add to array of channels*/

createNewChannel = () => {
  const newChannel = {
    name: getNewChannelInput().value,
    messages: [],
  };
  channels.push(newChannel);
  addChanneltoList(newChannel);
  toggleNewMessageDisabled(false);
  selectChannel(newChannel);
  toggleNewChannelModal(false);
};

/*Add channel to the sidebar*/

addChanneltoList = (channel) => {
  const channelList = getChannelList();
  createElement("li", channelList, channel.name, "channel-list-item", () => {
    selectChannel(channel);
  });
  toggleNewChannelModal(false);
};

selectChannel = (channel) => {
  selectedChannel = channel;
  document.getElementById("new-channel-input").value = "";
  setChannelName(selectedChannel.name);
  showMessages(selectedChannel.messages);
  document.getElementById("message-input").focus();
};

setChannelName = (channelName) => {
  const chatTitleText = getChatTitleText();
  chatTitleText.innerHTML = channelName;
};

addMessage = () => {
  const messageInput = getNewMessageInput();
  if (messageInput.value) {
    const newMessage = {
      author: CURRENT_USER,
      dateTime: new Date(),
      text: messageInput.value,
    };
    selectedChannel.messages.push(newMessage);
    showMessageInChat(newMessage);
    messageInput.value = "";
  }
};

newMessageInputKey = (event) => {
  if (event.key === "Enter") {
    addMessage();
  }
};

showMessages = (messages) => {
  const chatMessages = getChatMessages();
  chatMessages.innerHTML = "";
  for (let i = 0; i < messages.length; i++) {
    showMessageInChat(messages[i]);
  }
};

createElement = (type, parent, innerHTML, className, onClick) => {
  const element = document.createElement(type);
  element.className = className;
  element.innerHTML = innerHTML;
  if (parent) {
    parent.appendChild(element);
  }
  if (onClick) {
    element.onclick = onClick;
  }
  return element;
};

showMessageInChat = (message) => {
  const messageBox = createElement("div", null, null, "message-box");
  const messageTitleContainer = createElement(
    "div",
    messageBox,
    null,
    "message-box-title"
  );
  const messageContainer = createElement(
    "div",
    messageBox,
    null,
    "message-box-text"
  );

  createElement(
    "span",
    messageTitleContainer,
    message.author,
    "message-user-name"
  );
  createElement("span", messageContainer, message.text);

  const chatMessages = getChatMessages();
  chatMessages.appendChild(messageBox);
};

toggleNewMessageDisabled = (disabled) => {
  const messageButton = getNewMessageButton();
  const messageInput = getNewMessageInput();
  if (disabled) {
    messageButton.setAttribute("disabled", disabled.toString());
    messageInput.setAttribute("disabled", disabled.toString());
  } else {
    messageButton.removeAttribute("disabled");
    messageInput.removeAttribute("disabled");
  }
};
