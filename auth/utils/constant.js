
class StaticData {
    static mobileRegex = /^[6-9]\d{9}$/;
    static nameRegex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/
    static emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    static gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    static platformList = ['Ios', 'Android', 'Mac', 'Web'];
    static genderList = ["Male", "Female"];
}


module.exports = { StaticData }