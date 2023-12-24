import apiBackEnd from "../api/backend/api.Backend";

const statService = {
    getUsersByCreationDate: async () => {
        const {data} = await apiBackEnd.get("/user/stat/date")
        console.log("users by date", data)
        return data;
    },

    getNbActifsUsers: async () => {
        const {data} = await apiBackEnd.get("user/stat/nb")
        console.log("nb", data)
        return data;
    },
    getRidesByType: async () => {
        const {data} = await apiBackEnd.get("/ride/stat/type")
        console.log("trajets par type ",data)
        return data;
    },
    getContactsByCreationDate: async () => {
        const {data} = await apiBackEnd.get("/contact_us/stat/date")
        console.log("contacts by date", data)
        return data;
    },
    getTreatedContacts: async () => {
        const {data} = await apiBackEnd.get("/contact_us/stat/treated")
        console.log("treated by date", data)
        return data;
    },
    getTreatmentTime: async () => {
        const {data} = await apiBackEnd.get("/contact_us/stat/time")
        console.log("time : ",data)
        return data
    }
}

export default statService;