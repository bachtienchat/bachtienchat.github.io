var arrNhanVien = [];

var validate = new Validation();

document.querySelector('#btnXacNhan').onclick = function (event) {
    var nhanVien = new NhanVien();
    //Lấy thông tin từ người dùng nhập vào gán vào đối tượng
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.loaiChucVu = document.querySelector('#loaiChucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    // hiển thị dữ liệu lên giao diện
    document.querySelector('#txtXepLoai').innerHTML = nhanVien.xepLoaiNhanVien();
    document.querySelector('#txtTongLuong').innerHTML = nhanVien.tinhTongLuong();
    document.querySelector('#txtMaNhanVien').innerHTML = nhanVien.maNhanVien;
    document.querySelector('#txtTenNhanVien').innerHTML = nhanVien.tenNhanVien;
    document.querySelector('#txtChucVu').innerHTML = nhanVien.loaiChucVu;
    document.querySelector('#txtLuongCoBan').innerHTML = nhanVien.luongCoBan;
    document.querySelector('#txtSoGioLamTrongThang').innerHTML = nhanVien.soGioLamTrongThang;
    


     // =========== Kiểm tra dữ liệu hợp lệ trước khi thêm vào mảng ============
    var valid = true;
    // kiểm tra rỗng
    valid &= validate.kiemTraRong('#maNhanVien','mã nhân viên','#kiemTraRong_maNhanVien') & validate.kiemTraRong('#tenNhanVien','tên nhân viên','#kiemTraRong_tenNhanVien');
    
    valid &= validate.kiemTraTatCaSo('#maNhanVien','mã nhân viên','#kiemTraTatCaSo_maNhanVien') & validate.kiemTraTatCaSo('#luongCoBan','lương cơ bản','#kiemTraTatCaSo_luongCoBan') & validate.kiemTraTatCaSo('#soGioLamTrongThang','số giờ làm','#kiemTraTatCaSo_soGioLamTrongThang');
    
    valid &= validate.checkLength('#maNhanVien','mã nhân viên','#kiemTraDoDai_maNhanVien',4,6);

    valid &= validate.checkValueNumber('#luongCoBan','lương cơ bản','#checkNumber_luongCoBan',1000000,20000000);

    valid &= validate.checkValueNumber('#soGioLamTrongThang','số giờ làm trong tháng','#checkNumber_soGioLamTrongThang',50,150);

    valid &= validate.checkValueText('#tenNhanVien','tên nhân viên','#checkText_tenNhanVien');
    
    if(!valid){
        return;
    }

    // Mỗi lần click thêm nhân viên => lấy đối tượng nhân viên lưu vào mảng
    arrNhanVien.push(nhanVien);
    //Sau khi thêm nhân viên vào mảng => lấy mảng nhân viên tạo ra chuỗi thẻ tr rồi in lên giao diện
    renderTableNhanVien(arrNhanVien);

    //Lưu data vào storage
    luuStorage();
}
// hiển thi table nhân viên có chỉnh sửa và xóa
var renderTableNhanVien = function (mangNhanVien){
    var content = '';

    for(var i = 0; i < mangNhanVien.length; i++){
        // duyệt mỗi lần lấy ra một đối tượng nhân viên trong mảng
        var nhanVien = mangNhanVien[i];
        var nv = new NhanVien(nhanVien.maNhanVien, nhanVien.tenNhanVien, nhanVien.loaiChucVu, nhanVien.luongCoBan,  nhanVien.soGioLamTrongThang);

        content +=`
              <tr>
                  <td>${nv.maNhanVien}</td>
                  <td>${nv.tenNhanVien}</td>
                  <td>${nv.loaiChucVu}</td>
                  <td>${nv.luongCoBan}</td>
                  <td>${nv.tinhTongLuong()}</td>
                  <td>${nv.soGioLamTrongThang}</td>
                  <td>${nv.xepLoaiNhanVien()}</td>

                  <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button>
                  <button class="btn btn-primary" onclick="chinhSuaNhanVien('${nv.maNhanVien}')">Chỉnh sửa</button>
              </tr>
        `
    }
    document.querySelector('#tblNhanVien').innerHTML = content;
}

// chức năng chỉnh sửa
var chinhSuaNhanVien = function(maNhanVien){
     for(var i=0; i<arrNhanVien.length; i++){
         var nv = arrNhanVien[i];

         if(nv.maNhanVien === maNhanVien){
             document.querySelector('#maNhanVien').value = nv.maNhanVien;
             document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
             document.querySelector('#luongCoBan').value = nv.luongCoBan;
             document.querySelector('#loaiChucVu').value = nv.loaiChucVu;
             document.querySelector('#soGioLamTrongThang').value = nv.soGioLamTrongThang;
         }
     }
}

//chức năng xóa 
window.xoaNhanVien = function(maNhanVien){
    for(var i = arrNhanVien.length-1; i>=0; i--){
        var nv = arrNhanVien[i];

        if(nv.maNhanVien === maNhanVien){
            arrNhanVien.splice(i,1);
        }
    }

    // gọi hàm tạo lại bảng
    renderTableNhanVien(arrNhanVien);

    // lưu localStorage
    luuStorage();
}

// lưu storage
var luuStorage = function(){
    // convert mảng (arrNhanVien) thành sring
    var strArrNhanVien = JSON.stringify(arrNhanVien);
    //lưu vào storage
    localStorage.setItem('arrNhanVien', strArrNhanVien);
}

var layDataStorage = function(){

    // kiểm tra có storage đó hay không
    if(localStorage.getItem('arrNhanVien')){
        // dữ liệu lấy ra từ localStorage là dạng string
        var strArrNhanVien = localStorage.getItem('arrNhanVien');
        // chuyển chuỗi JSON  về object json
        arrNhanVien = JSON.parse(strArrNhanVien);

        // gọi hàm render table từ dữ liệu trong storage
        renderTableNhanVien(arrNhanVien);
    }
}

// chạy function layDataStorage
layDataStorage();

document.querySelector('#btnCapNhat').onclick = function(){
    var nvCapNhat = new NhanVien();
    nvCapNhat.maNhanVien = document.querySelector('#maNhanVien').value;
    nvCapNhat.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nvCapNhat.luongCoBan = document.querySelector('#luongCoBan').value;
    nvCapNhat.loaiChucVu = document.querySelector('#loaiChucVu').value;
    nvCapNhat.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    
    for (var  index = 0; index < arrNhanVien.length; index++) {
        var nv = arrNhanVien[index];
        if(nv.maNhanVien === nvCapNhat.maNhanVien){
            nv.maNhanVien = nvCapNhat.maNhanVien;
            nv.tenNhanVien = nvCapNhat.tenNhanVien;
            nv.luongCoBan = nvCapNhat.luongCoBan;
            nv.soGioLamTrongThang = nvCapNhat.soGioLamTrongThang;
        }
    }
    renderTableNhanVien(arrNhanVien);
        luuStorage();
}