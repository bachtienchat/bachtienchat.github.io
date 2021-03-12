//Xây dựng class để kiểm tra dữ liệu

var Validation = function(){
    //.trim() loại bỏ khoảng trống đầu và cuối của chuỗi
    this.kiemTraRong = function(select,name,error_selector){
        if(document.querySelector(select).value.trim() === ''){
            document.querySelector(error_selector).innerHTML = name + '  không được bỏ trống!';
            return false;
        }

        document.querySelector(error_selector).innerHTML = '';
        return true;
    }

    this.kiemTraTatCaSo = function (select, name, error_selector) {
        var regex = /^[0-9]+$/;
        //Kiểm tra đúng định dạng return true
        if (regex.test(document.querySelector(select).value)) {
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }

        document.querySelector(error_selector).innerHTML = name + ' phải là số!';
        return false;
    }
    // kiểm tra độ dài cho input 
    this.checkLength = function(select,name,error_selector,minlg,maxlg){
        var val = document.querySelector(select).value;

        if(val.length < minlg || val.length > maxlg){
            document.querySelector(error_selector).innerHTML = `${name} từ ${minlg} đến ${maxlg} ký tự`;
            return false;
        }else{
            document.querySelector(error_selector).innerHTML = '';
            return true;    
        }
        
    }
    //check
    //kiểm tra giá trị phải là chữ
    this.checkValueText = function(select,name,error_selector){
        var regex = /^[a-zA-Z ]*$/;
        // kiểm tra đúng định dạng return true
        if(regex.test(document.querySelector(select).value)){
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }

        document.querySelector(error_selector).innerHTML = name + ' phải là chữ!';
        return false;
    }
    

    // kiểm tra giá trị
    this.checkValueNumber = function(select,name,error_selector,minValue,maxValue){
        var value = document.querySelector(select).value;

        if(Number(value) < minValue || Number(value) > maxValue){
            document.querySelector(error_selector).innerHTML = `${name} từ ${minValue} đến ${maxValue}`;
            return false;
        }else{
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }
    }

}