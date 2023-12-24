class MessagePost {
    constructor(conversationId, content, createdDate, userId, userMatricule, file){
        this.conversationId = conversationId;
        this.content = content;
        this.createdDate = createdDate;
        this.userId = userId;
        this.userMatricule = userMatricule;
        this.file = file
    }
}

export default MessagePost;