const channels = [];

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

createNewChannel = () => {
  const newChannel = {
    name: getNewChannelInput().value,
    messages: [],
  };
  channels.push(newChannel);
  addChanneltoList(newChannel);
};

addChanneltoList = (channel) => {
  const channelList = getChannelList();
  const li = document.createElement("li");
  li.className = "channel-list-item";
  li.onclick = () => {
    selectChannel(channel);
  };
  li.innerHTML = channel.name;
  channelList.appendChild(li);
  toggleNewChannelModal(false);
};

selectChannel = (channel) => {
  selectedChannel = channel;
  document.getElementById("new-channel-input").value = "";
  setChannelName(selectedChannel.name);
};

setChannelName = (channelName) => {
  const chatTitleText = document.getElementById("chat-title-text");
  chatTitleText.innerHTML = channelName;
};
