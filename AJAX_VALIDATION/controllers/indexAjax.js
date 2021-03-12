const { default: axios } = require("axios");

var renderTB = function(arrSinhVien){
      var content = '';
      for(var i = 0; i < arrSinhVien.length; i++){
          var nhanVien = arrSinhVien[i];

          content = `
             <tr>
               <td>${nhanVien.maNhanVien}</td>
               <td>${nhanVien.tenNhanVien}</td>
               <td>${nhanVien.loaiChucVu}</td>
               <td>${nhanVien.luongCoBan}</td>
               <td>${nhanVien.soGioLamTrongThang}</td>

               <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')">Xóa</button>
               <button class="btn btn-primary" onclick="chinhSuaNhanVien('${nhanVien.maNhanVien}')">Chỉnh sửa</button>
             </tr>
          `
          document.querySelector('#tblNhanVien').innerHTML = content;
      }
}

//==========  GET NHAN VIEN USING AXIOS LIBRARY ============
var getNhanVien = function(){
    
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',  //backend cung cấp method
        responseType: 'json' //backend cung cấp kiểu dữ liệu trả về
    })

    //xử lý thành công
    promise.then(function(result){
        console.log('result', result.data);

        //hiển thị thông tin nhân viên lên table
        renderTB(result.data);
    })
    //xử lý không thành công
    promise.catch(function(error){
        console.log('error');
    })
}

//hàm gọi thực thi ajax ở trên
getNhanVien();

//============= POST : THÊM NHÂN VIÊN===================
document.querySelector('#btnXacNhan').onclick = function(){
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.loaiChucVu = document.querySelector('#loaiChucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    console.log('nhanvien', nhanVien);
    //gọi api để đưa dữ liệu về server lưu trữ

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        method: 'POST',
        data: nhanVien,
        responseType: 'json'
    })
    promise.then(function(result){
        console.log('xử lý thành công', result.data);
        //gọi hàm ajax lấy dữ liệu mới nhất từ server về
        getNhanVien();
    })
    
    promise.catch(function(error){
        console.log('xử lý thất bại',error);
    })
}

//=============== PUT ( CHỈNH SỬA NHÂN VIÊN) ==================

window.chinhSuaNhanVien = function(maNhanVien){
    //cách tạo promise khác
    console.log(maNhanVien,'maNhanVien');
    axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: 'GET'

    }).then(function(result){
        var nv = result.data;
           document.querySelector('#maNhanVien').value = nv.maNhanVien;
           document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
           document.querySelector('#loaiChucVu').value = nv.loaiChucVu;
           document.querySelector('#luongCoBan').value = nv.luongCoBan;
           document.querySelector('#soGioLamTrongThang').value = nv.soGioLamTrongThang;

    }).catch(function(err){
        console.log(err,'error');
    })

    document.querySelector('#btnCapNhat').onclick = function(){

        var nhanVien = new NhanVien();
        nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
        nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
        nhanVien.loaiChucVu = document.querySelector('#loaiChucVu').value;
        nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
        nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

        axios({
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanvien.maNhanVien}`,
            method: 'PUT',
            data: nhanVien

        }).then(function(result){

           getNhanVien();

        }).catch(function(failed){
            console.log(failed,'reqest')
        })
        
    }
}