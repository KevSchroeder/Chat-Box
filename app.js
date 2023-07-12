const Thing1SelectorBtn = document.querySelector('#Thing1-selector')
const Thing2SelectorBtn = document.querySelector('#Thing2-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

//fuction that calls message
const createChatMessageElement = (message) => `
<div class="message ${message.sender === 'Thing 1' ? 'blue-bg' : 'green-bg'}">
  <div class="message-sender">${message.sender}</div>
  <div class="message-text">${message.text}</div>
  <div class="message-timestamp">${message.timestamp}</div>
</div>
`

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'Thing 1'
const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Type here, ${messageSender}...`

  if (name === 'Thing 1') {
    Thing1SelectorBtn.classList.add('active-person')
    Thing2SelectorBtn.classList.remove('active-person')
  }

  if (name === 'Thing 2') {
    Thing2SelectorBtn.classList.add(`active-person`)
    Thing1SelectorBtn.classList.remove(`active-person`)
  }

  chatInput.focus()
}

Thing1SelectorBtn.onclick = () => updateMessageSender('Thing 1')
Thing2SelectorBtn.onclick = () => updateMessageSender('Thing 2')

//stores onto local storage
const sendMessage = (e) => {
  e.preventDefault()

  //timestamp constant
  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  localStorage.setItem('messages', JSON.stringify(message))
  chatMessages.innerHTML += createChatMessageElement(message) 

  chatInputForm.reset()
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})