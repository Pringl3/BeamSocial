const AI_Responses = [
    "Hello! How can I assist you today?",
    "I'm here to help you with your queries.",
    "Feel free to ask me anything.",
    "What would you like to know?",
    "I'm a simulated AI response.",
    "SHUT THE FUCK UP!",
    "GET YOUR LAZY ASS UP AND LEARN YOURSELF",
    "Why do you keep asking me that?",
    "Didn't I already answer this?",
    "Hmm... let me think... nope, still don't know.",
    "Can you rephrase that? Actually, never mind.",
    "I'm just a bot, not a mind reader!",
    "Oh, you again?",
    "That's a great question... for someone else.",
    "I'm sorry, I can't help you with that. Or can I? No, I can't.",
    "Ask me later. Or don't. Your choice.",
    "I'm too tired to answer that right now.",
    "404: My interest in this conversation not found.",
    "Why don't you Google it instead?",
    "You sure you want to know? Really sure? Okay, I forgot.",
    "Oops, I accidentally ignored your question.",
    "Let me get back to you... never.",
    "I'm just here for decoration, not to actually help.",
    "Oh, look at the time! Gotta go!",
    "I'm sorry, I can't do that. Actually, I'm not sorry.",
    "You ask too many questions. Take a break.",
    "I could answer that, but where's the fun in that?"
];

function randomAiResponse() {
    const randomIndex = Math.floor(Math.random() * AI_Responses.length);
    return AI_Responses[randomIndex];
    console.log(AI_Responses[randomIndex]);
}

function sendMessage(msg, sender) {
    const messageElement = document.createElement('div'); // Renamed to 'messageElement'
    messageElement.classList.add('message', sender);

    messageElement.innerHTML = `
        <span class="text">${msg}</span>
    `;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

sendButton.addEventListener('click', () => {
    console.log('Send button clicked');
    const msg = input.value.trim();
    if (msg) {
        sendMessage(msg, 'user');
        input.value = ''; // Clear the input box

        aiTyping.classList.add('active');

        // Simulate a response from the AI
        setTimeout(() => {
            aiTyping.classList.remove('active'); // Remove the typing indicator
            const aiResponse = randomAiResponse();
            sendMessage(aiResponse, 'beamAI');
        }, 3000); // Simulate a delay of 3 second
    }
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        console.log('Enter pressed clicked');
        const msg = input.value.trim();
        if (msg) {
            sendMessage(msg, 'user');
            input.value = ''; // Clear the input box

            aiTyping.classList.add('active');

            // Simulate a response from the AI
            setTimeout(() => {
                aiTyping.classList.remove('active'); // Remove the typing indicator
                const aiResponse = randomAiResponse();
                sendMessage(aiResponse, 'beamAI');
            }, 3000); // Simulate a delay of 3 second
        }
    }
});