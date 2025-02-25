const socket = new WebSocket("ws://localhost:8765");

socket.onopen = function() {
  console.log("Connexion WebSocket établie");
};

socket.onmessage = function(event) {
  addMessage("server", event.data);
};

socket.onerror = function(error) {
  console.error("Erreur WebSocket :", error);
};

socket.onclose = function(event) {
  console.log(`Connexion fermée (code: ${event.code}, raison: ${event.reason})`);
};

document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("message").addEventListener("keyup", function(e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value.trim();
  if (!message) return;
  addMessage("client", message);
  if (message.toLowerCase() === "exit") {
    socket.close();
  } else if (socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.log("La connexion WebSocket est fermée ou en train de se fermer.");
  }
  messageInput.value = "";
}

function addMessage(type, text) {
  const chatArea = document.getElementById("chat-area");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);
  messageDiv.textContent = text;
  chatArea.appendChild(messageDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}