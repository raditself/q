

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const imageUpload = document.getElementById('image-upload');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        const image = imageUpload.files[0];

        if (message || image) {
            appendMessage('user', message, image);
            userInput.value = '';
            imageUpload.value = '';

            // Send message to backend
            const formData = new FormData();
            formData.append('message', message);
            if (image) {
                formData.append('image', image);
            }

            fetch('/chat', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                appendMessage('ai', data.response);
            })
            .catch(error => {
                console.error('Error:', error);
                appendMessage('ai', 'Sorry, an error occurred.');
            });
        }
    }

    function appendMessage(sender, text, image = null) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        if (text) {
            const textSpan = document.createElement('span');
            textSpan.textContent = text;
            messageDiv.appendChild(textSpan);
        }

        if (image) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(image);
            img.style.maxWidth = '200px';
            img.style.maxHeight = '200px';
            messageDiv.appendChild(img);
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

