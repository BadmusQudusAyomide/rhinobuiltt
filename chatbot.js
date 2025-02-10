document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.querySelector('.chat-container');
    const messageInput = document.querySelector('.message-input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const typingIndicator = document.querySelector('.typing-indicator');
    const attachBtn = document.querySelector('.attach-btn input[type="file"]');

    // Simulate bot response
    function showBotResponse(message) {
        typingIndicator.style.display = 'flex';
        
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot';
            botMessage.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                </div>
                <span class="timestamp">${new Date().toLocaleTimeString()}</span>
            `;
            
            chatMessages.appendChild(botMessage);
            typingIndicator.style.display = 'none';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
    }

    // Create new message
    function createMessage(text, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                ${isUser ? '<div class="message-status"><i class="fas fa-check-double"></i></div>' : ''}
            </div>
            <span class="timestamp">${new Date().toLocaleTimeString()}</span>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message handler
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            createMessage(message);
            messageInput.value = '';
            showBotResponse("Thank you for your message! Our team will respond shortly.");
        }
    }

    // Event Listeners
    sendBtn.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Quick reply buttons
    document.querySelectorAll('.quick-btn').forEach(button => {
        button.addEventListener('click', () => {
            const message = button.textContent;
            createMessage(message);
            showBotResponse("We've received your query about: " + message);
        });
    });

    // File attachment
    attachBtn.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            createMessage(`File attached: ${e.target.files[0].name}`);
            showBotResponse("We've received your file. Thank you!");
        }
    });

    // Close chat
    document.querySelector('.close-chat').addEventListener('click', () => {
        chatContainer.style.animation = 'slideUp 0.6s reverse';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    });
});