class Msg {
    static IdNotFoundMsg = (msg) => {
        return { "msg": `${msg} Id Not Found`, "success": 1 }
    }
    static AlreadyMsg = (msg) => {
        return { "msg": `${msg} exists`, "success": 1 };
    }
    static ErrosMsg = (msg) => {
        return { "msg": `Server Error`, "success": 1 };
    }
    static DelNotMsg = (msg) => {
        return {
            "msg": `Sorry , this ${msg} is Not Cancel`, "success": 1
        };
    }

    static SuccessFulMsg = (msg, data) => {
        return {
            "msg": `${msg} Successfully`, "data": data, "success": 0
        };
    }
    static CreatedMsg = (msg) => {
        return {
            "msg": `${msg} Created Successfully`, "success": 0
        };
    }
    static DeleteMsg = (msg) => {
        return {
            "msg": `${msg} Deleted Successfully`, "success": 0
        };
    }
    static UpdateMsg = (msg) => {
        return {
            "msg": `${msg} Update Successfully`, "success": 0
        };
    }
    static CustMsg = (msg, data, status, success) => {
        return {
            "msg": msg, "data": data, "success": success
        };
    }
}

module.exports = { Msg }



