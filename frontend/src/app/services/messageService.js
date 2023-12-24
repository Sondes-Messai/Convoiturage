import apiBackEnd from "../api/backend/api.Backend";

const messageService = {
  getAllByConversationId: async (conversationId) => {
    const {data} = await apiBackEnd.get(`/message/${conversationId}`);
    return data;
  },

  postMessage: async (message) => {
    const messageData = JSON.stringify(message);
    const { data } = await apiBackEnd.post(`/message`, messageData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  },


  postMessageFile: async (formData) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const  {data}  = await apiBackEnd.post(`/message/file`, formData, config)
   
    return data
  },

};


export default messageService;
