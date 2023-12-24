class Message {
  constructor(type, content, sender, receiver, date, fileUrl) {
    this.type = type;
    this.content = content;
    this.sender = sender;
    this.receiver = receiver;
    this.date = date;
    this.fileUrl = fileUrl;
    
  }
}

export default Message;
