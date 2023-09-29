//region 1
const gREQUEST_STATUS_OK = 200; // GET & PUT success
const gREQUEST_READY_STATUS_FINISH_AND_OK = 4;
const gBASE_URL_VOUCHER = "http://203.171.20.210:8080/devcamp-pizza365/voucher_detail/"
const gBASE_URL_DRINKS = "http://203.171.20.210:8080/devcamp-pizza365/drinks"
//region 3
function onloadDataDrinks() {
    //fetchData(không có vì Data ở trong api)
    //Validate Data (chỉ kiểm tra = 0 vì đây là options nếu không chọn thì sẽ là số không)
    //initilize API
    //callApi(get api về và tạo options rồi appendchild những options đã có dữ liệu )
    //resposneHandle


    //initlize api
    var XmlHttpDrinks = new XMLHttpRequest();
    //call api
    apiToGetDrinks(XmlHttpDrinks)
    XmlHttpDrinks.onreadystatechange = function () {
        if (this.readyState == gREQUEST_READY_STATUS_FINISH_AND_OK) {
            if (this.status == gREQUEST_STATUS_OK) {
                console.log("quá trình gọi api thành công")
                var vDirnk = JSON.parse(XmlHttpDrinks.responseText)
                var vSelectDrinks = document.getElementById("select-drinks")
                for (var bIterator = 0; bIterator < vDirnk.length; bIterator++) {
                    var vOptions = document.createElement("option")
                    vOptions.text = vDirnk[bIterator].tenNuocUong
                    vSelectDrinks.appendChild(vOptions)
                }

            } else {
                console.error("Quá trình goi api thất bại")
            }
        }
    }


}
function onBtnKiemTraDon() { debugger;
    checkInformation()
}
//region 4
function apiToGetDrinks(paramApiToGetDrink) {
    paramApiToGetDrink.open("GET", gBASE_URL_DRINKS, true)
    paramApiToGetDrink.send()

}
function isVoucherValidate() { debugger;
    debugger;
    const vVoucher = {
        voucher: ""
    }
    //fetchData
    fetchVoucher(vVoucher)
    //validate data return boolean
    var vVoucherStatus = VoucherValidate(vVoucher)
    if (vVoucherStatus) {
        //initilize api
        const XmlHttpVoucher = new XMLHttpRequest();
        apiGetVoucher(XmlHttpVoucher, vVoucher)
    }


}
function fetchVoucher(paramVoucher) {
    var vVoucherValue = document.getElementById("input-voucher").value
    paramVoucher.voucher = vVoucherValue
}
function VoucherValidate(paramVoucher) {
    if (paramVoucher.voucher == "") {
        alert("Chưa điền voucher")
        return false
    }
    return true
}
function apiGetVoucher(paramApiVoucher, paramVoucher) { debugger;
    debugger;
    const vUrlResources = gBASE_URL_VOUCHER + paramVoucher.voucher + "/"
    paramApiVoucher.open("GET", vUrlResources, false)
    paramApiVoucher.send()
    responseFailHandle(paramApiVoucher)
}
function responseFailHandle(paramApiVoucher) { debugger
    if (paramApiVoucher.status == gREQUEST_STATUS_OK) {
        var vVoucher = JSON.parse(paramApiVoucher.responseText)
        console.log("Mã voucher hợp lệ,thông tin voucher")
        console.log(vVoucher)
        console.log("Discount : " + vVoucher.phanTramGiamGia)
        console.log("Mã voucher bạn sử dụng :" + vVoucher.maVoucher)
    } else {
        console.error("Không tìm thấy mã voucher")
        return false
    }
}
function checkInformation() { debugger;
    var nameElement = document.getElementById("input-name")
    var emailElement = document.getElementById("input-email")
    var phoneNumberElement = document.getElementById("input-phone")
    var addressElement = document.getElementById("input-address")
    var msgElement = document.getElementById("input-message")

    nameValue = nameElement.value
    emailValue = emailElement.value
    phoneValue = phoneNumberElement.value
    addressValue = addressElement.value
    msgValue = msgElement.value
    //size pizza
    if(isSizeSelected() == false){
        return false;
    }
    //typePizza
    if(isTypePizzaSelected() == false){
        return false;
    }

    if (nameValue == "") {
        alert("Không được để trống tên")
        return false
    }
    if (emailValue == "") {
        alert("Không được để trống email")
        return false
    }
    //kiemtradinhdangemail
    if(isEmailValidate() == false){
        return false;
    }
    if (phoneValue == "") {
        alert("Không được để trống số điện thoại")
        return false
    }
    if(checkNumber() == false){
        return false
    }
    if (addressValue == "") {
        alert("Không được để trống địa chỉ")
        return false
    }
    if (msgValue == "") {
        alert("Không được để trống tin nhắn")
        return false
    }
    if(isVoucherValidate() == false){
        return false;
    }
    return true;
}
function isSizeSelected() {
    debugger;
    var smallSize = document.getElementById("btn-size-small")
    var mediumSize = document.getElementById("btn-size-medium")
    var largeSize = document.getElementById("btn-size-large")

    var smalAttribute = smallSize.getAttribute("data-is-selected")
    var mediumAttribute = mediumSize.getAttribute("data-is-selected")
    var largeAttribute = largeSize.getAttribute("data-is-selected")
    if (smalAttribute == "N" && mediumAttribute == "N" && largeAttribute == "N") {
        alert("Chưa chọn size pizza")
        return false;
    }
}
function isTypePizzaSelected() {
    debugger;
    var pHawaiElement = document.getElementById("btn-type-hawai")
    var pHaiSanElement = document.getElementById("btn-type-hai-san")
    var pBaconElement = document.getElementById("btn-type-bacon")

    var HawaiAttribute = pHawaiElement.getAttribute("data-is-selected")
    var HaiSanAttribute = pHaiSanElement.getAttribute("data-is-selected")
    var BaconAttribute = pBaconElement.getAttribute("data-is-selected")
    if (HawaiAttribute == "N" && HaiSanAttribute == "N" && BaconAttribute == "N") {
        alert("Chưa chọn loại pizza")
        return false;
    }
}
function isEmailValidate() {
    debugger;
    var emailValue = document.getElementById("input-email").value
    var emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if (!emailValue.match(emailRegex)) {
        alert("Gmail sai định dạng")
        return false;
    }
        
}
function checkNumber() {
    debugger;
    var numberValue = document.getElementById("input-phone").value
    //kiemtracoicophailasohaykhong
    if (isNaN(numberValue)) {
        alert("Điện thoại phải là số")
        return false
    } else {
        if (numberValue.charAt(0) !== "+" && numberValue.charAt(0) != "0") {
            alert("Bắt đầu số điện thoại phải là + hoặc 0")
            return  false;
        } else {
            if (numberValue.length <= 12) {
            } else {
                alert("Độ dài số điện thoại dưới 12 thôi ông nội")
                return false;
            }
        }

    }


}