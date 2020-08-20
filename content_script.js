class ChatMessage {
  constructor(message) {
    this.content = message.querySelector("[class^=content-]").textContent
  }
  
  static createChatMessages(messages) {
    return messages.map(message => new ChatMessage(message)) 
  }
  
  buildLog() {
    return this.content 
  }
}

class ChatMessageGroup {
  constructor(group) {
    this.timestamp = group.querySelector("[class^=timestamp-]").textContent
    this.displayName = group.querySelector("[class^=displayName-]").textContent
    this.chatMessages = ChatMessage.createChatMessages(Array.from(group.querySelectorAll("[class^=ChatMessage-]")))
  }
  
  buildLog() {
    return `
>> ${this.displayName} ${this.timestamp}
     
${this.chatMessages.map((chatMessage) => chatMessage.buildLog()).join("\n\n")} 
    `
  }
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  let chatMessages = document.querySelector("[class^=ChatMessages]")
  if (!chatMessages) return 
  let messageGroups = Array.from(chatMessages.children).map((group) => new ChatMessageGroup(group))
  let log = messageGroups.map((group) => group.buildLog()).join("\n")
  sendResponse(log)
  return true
});
