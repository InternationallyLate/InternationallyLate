const socket = io("ws://127.0.0.1:3500");

let waitingForResponse = false;

chatinput = document.querySelector(".chatbot-body-input");

firstBotMessageChoices = [
    "Hi, I'm your personalized Verizon assistant! I will help you pick the best plan for you. What are you looking for?",
    "Hey there! I'm your Verizon assistant and I'm here to help you. What plan are you looking for?",
    "Hi, I'm your Verizon assistant! I will help you pick the best plan for you. What are you looking for?",
];
const firstChoice = Math.floor(Math.random() * firstBotMessageChoices.length);
appendBotMessage(firstBotMessageChoices[firstChoice]);

// automatically focus on the input field
chatinput.focus();

// add an event listener to the input field. On enter, send the message
chatinput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        console.log(waitingForResponse);
        if (waitingForResponse) {
            console.log("waiting for response, please wait");
            return;
        }
        // skip if the input is whitespace
        if (chatinput.value.trim() === "") {
            chatinput.value = "";
            return;
        }
        event.preventDefault();
        console.log("enter pressed");
        waitingForResponse = true;
        try {
            appendUserMessage(chatinput.value);
            // send the message to the server
            const message = chatinput.value;
            chatinput.value = "";
            handleSendWSMessage(message);
        } catch (error) {
            console.log(error);
        }
        console.log("message sent");
        let conversation = document.querySelector(".chatbot-history");
        conversation.scrollTop = conversation.scrollHeight;
        waitingForResponse = false;
    }
    });

function appendUserMessage(message) {
    const conversation = document.querySelector(".chatbot-history");
    const chatmessage = document.createElement("div");
    chatmessage.classList.add("chatbot-body-text");
    chatmessage.classList.add("message-user");
    chatmessage.innerHTML = message;
    conversation.appendChild(chatmessage);
}

function appendBotMessage(message) {
    const conversation = document.querySelector(".chatbot-history");
    const chatmessage = document.createElement("div");
    chatmessage.classList.add("chatbot-body-text");
    chatmessage.classList.add("message-bot");
    chatmessage.innerHTML = message;
    conversation.appendChild(chatmessage);
    return chatmessage;
}

function handleSendWSMessage (message) {
    console.log(message);
    const botTyping = appendBotMessage("");
    botTyping.classList.add("typing");
    // scroll the chat to the bottom
    let conversation = document.querySelector(".chatbot-history");
    conversation.scrollTop = conversation.scrollHeight;
    try {
        socket.emit("message", message);
    } catch (error) {
        console.log(error);
    }
}

socket.on("message", (data) => {
    console.log(data);
    const botTyping = document.querySelector(".typing");
    document.querySelector(".chatbot-history").removeChild(botTyping);
    appendBotMessage(data);
    
    let conversation = document.querySelector(".chatbot-history");
    conversation.scrollTop = conversation.scrollHeight;
    console.log("message received");
    waitingForResponse = false;
});
