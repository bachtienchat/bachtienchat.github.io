var NhanVien = function(maNV,tenNV,chucVu,luongCoBan,soGioLam){
    this.maNhanVien = maNV;
    this.tenNhanVien = tenNV;
    this.loaiChucVu = chucVu;
    // this.loaiNhanVien = loaiNhanVien;
    this.luongCoBan = luongCoBan;
    this.soGioLamTrongThang = soGioLam;
    this.tinhTongLuong = function(){
        var tongLuong = (Number(this.luongCoBan) + Number(this.soGioLamTrongThang)) * 3;
        return tongLuong
    }

    this.xepLoaiNhanVien = function(){
        var ketQuaXL = '';
        var tongLuong = this.tinhTongLuong();

        if(tongLuong <= 1000000){
             ketQuaXL = 'Yếu kém';
        }else if(tongLuong >=5000000){
            ketQuaXL = 'Yếu';
        }else if(tongLuong >= 10000000 && tongLuong < 15000000){
            ketQuaXL = 'Khá';
        }else if(tongLuong >= 15000000 && tongLuong < 20000000){
            ketQuaXL = 'Giỏi';
        }else if(tongLuong >= 20000000){
            ketQuaXL = 'xuất xắc';
        }else{
            ketQuaXL = 'không hợp lệ!';
        }
        return ketQuaXL;
    }
}