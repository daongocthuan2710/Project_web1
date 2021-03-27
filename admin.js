function DKadmin()
{
	document.getElementById("DNadmin").style.display='none';
	document.getElementById("DKadmin").style.display='block';
}
function DNadmin()
{
	document.getElementById("DKadmin").style.display='none';
	document.getElementById("DNadmin").style.display='block';
}
function User(fullname,phone,address,username,password,datesignup,role)
{
	this.fullname=fullname;
	this.phone=phone;
	this.address=address;
	this.username=username;
	this.password=password;
	this.datesignup=datesignup;
	this.role=role;
}



function publicAdmin()	
{
	if(localStorage.getItem("admin")==null){
	var admin= new User("Nguyễn Thiện Trí","0931853843","273 An Dương Vương, P3, Quận 5, TPHCM","admin","admin","16-11-2020","admin");
	var admin=[admin];
	localStorage.setItem("admin", JSON.stringify(admin));}
}



var	fullname = document.getElementById("name");
var phone = document.getElementById("phone");
var address = document.getElementById("address");
var admin_name = document.getElementById("admin_name");
var password = document.getElementById("password");
var re_password = document.getElementById("re_password");
var tkInput=  document.getElementById("TK");
var mkInput=  document.getElementById("MK");

var signupForm = document.querySelector('#DK_ThanhCong');
var validationsList = [];
  

var MAX_PHONE = 11;
var MIN_PHONE = 9;

var MAX_CHARS = 10;
var MIN_CHARS = 6;

function nameValidator(value) {
	if (value === '') {
		return{
			field: 'name',
			message: 'Bạn chưa nhập họ và tên'
		}
	}
	return false;
  }

function phoneValidator(value) {
	if (value === '') {
		return{
			field: 'phone',
			message: 'Bạn chưa nhập số điện thoại'
		}
	}

	

	const phonePattern = /[0-9]/;
	for( let i = 0; i< value.length; i++){
	if(!phonePattern.test(value[i])) {
		return{
			field: 'phone',
			message: 'Số điện thoại không hợp lệ'
		}
	}
	}
	if (value.length < MIN_PHONE || value.length > MAX_PHONE) {
		return{
			field: 'phone',
			message: 'Số điện thoại không đúng'
		}
	}
	return false;
  }

  function addressValidator(value) {
	if (value === '') {
		return{
			field: 'address',
			message: 'Bạn chưa nhập địa chỉ'
		}
	}
	return false;
}

  function adminNameValidator(value) {
	if (value === '') {
		return{
			field: 'admin_name',
			message: 'Bạn chưa nhập tên đăng nhập'
		}
	}
	check = 0;
		var mangadmin= JSON.parse(localStorage.getItem("admin"));
		mangadmin.forEach(function(item) {
			if(item.username == value) { 
				check = 1;
			}
		})
		if (check == 1) {
			return{
				field: 'admin_name',
				message: 'Tên đăng nhập đã tồn tại'
			}
		}

	return false;
  }

  function passwordValidator(value) {
	if (value === '') {
		return{
			field: 'password',
			message: 'Bạn chưa nhập mật khẩu'
		}
	}
	if (value.length < MIN_CHARS || value.length > MAX_CHARS) {
		return{
			field: 'password',
			message: 'Mật khẩu phải từ 6 - 10 ký tự'
		}
	}
	return false;
  }

function confirmPasswordValidator(value1, value2) {
	if((value2.length >= MIN_CHARS && value2.length <= MAX_CHARS) && value1 == '') {		
		return{
			field: 're_password',
			message: 'Vui lòng nhập lại mật khẩu'
		}
	}
	if ((value2.length >= MIN_CHARS && value2.length <= MAX_CHARS) && (value1 != value2)) {
		return{
			field: 're_password',
			message: 'Mật khẩu không đúng'
		}
	}
	return false;
  }

  function loginValidator(value1, value2) {
	if (value1 === '') {
		return{
			field: 'TK',
			message: 'Bạn chưa nhập tên đăng nhập'
		}
	}
	var dangnhapAd=0;
	// var dangnhapUs=0;
	var valueMK = 0;
	var valueTK = 0;
	// var  arrAcc = DSTaiKhoan();

	// var manguser= JSON.parse(localStorage.getItem("user"));
	var arrAdmin= JSON.parse(localStorage.getItem("admin"));
	//user
	for(var i=0;i<arrAdmin.length;i++)
	{
		if(arrAdmin[i].username==value1 && arrAdmin[i].password==value2) 
		{
			var name= arrAdmin[i].fullname;
			localStorage.setItem("adminlogin", JSON.stringify(arrAdmin[i]));
			var accLogin= new Login(arrAdmin[i].username, arrAdmin[i].password,[]);
			var accLogin=[accLogin];
			localStorage.setItem("accLogin", JSON.stringify(accLogin));
	
			dangnhapAd = 1; 
			valueMK = 1;
			valueTK = 1;	
			break;
		}
		if (arrAdmin[i].username == value1 &&  arrAdmin[i].passwords !== value2) {
			valueTK = 1;
		}
		if (arrAdmin[i].username == value1 && arrAdmin[i].passwords == value2) {
			valueMK = 1;
			break;
		}
	}

	
	if (valueTK == 0) {
		return{
			field: 'TK',
			message: 'Tên đăng nhập không tồn tại'
		}
	}
	else if (valueTK == 1 && value2 === '') {
		return{
			field: 'MK',
			message: 'Bạn chưa nhập mật khẩu'
		}
	}
	else if (valueMK == 0) {
		return{
			field: 'MK',
			message: 'Mật khẩu sai, vui lòng nhập lại'
		}
	}

	
	return false

}

function Login(username, password) {
	this.username = username;
	this.password = password;
}

function resetDom() {
	fullname.classList.remove('form__invalid');
	phone.classList.remove('form__invalid');
	address.classList.remove('form__invalid');
	admin_name.classList.remove('form__invalid');
	password.classList.remove('form__invalid');
	re_password.classList.remove('form__invalid');
	tkInput.classList.remove('form__invalid');
	tkInput.classList.remove('form__invalid');

	document.querySelectorAll('.errorMessage').forEach(function(errMsg) {
		errMsg.parentNode.removeChild(errMsg)
	})
}

function DOMRender(testResult) {
const element = document.createElement('small');
element.textContent = testResult.message;
element.classList.add('errorMessage');

switch(testResult.field) {
	case 'name':
		fullname.classList.add('form__invalid');
		fullname.insertAdjacentElement('afterend', element);
		break;
	case 'phone':
		phone.classList.add('form__invalid');
		phone.insertAdjacentElement('afterend', element);
		break;
	case 'address':
		address.classList.add('form__invalid');
		address.insertAdjacentElement('afterend', element);
		break;
	case 'admin_name':
		admin_name.classList.add('form__invalid');
		admin_name.insertAdjacentElement('afterend', element);
		break;
	case 'password':
		password.classList.add('form__invalid');
		password.insertAdjacentElement('afterend', element);
		break;
	case 're_password':
		re_password.classList.add('form__invalid');
		re_password.insertAdjacentElement('afterend', element);
		break;
	case 'TK':
		tkInput.classList.add('form__invalid');
		tkInput.insertAdjacentElement('afterend', element);
		break;
	case 'MK':
		mkInput.classList.add('form__invalid');
		mkInput.insertAdjacentElement('afterend', element);
		break;
	}
}

function customAlert(message,type) {
	if (type=='success') {
		document.getElementById("customalert").style.backgroundColor = '#4CAF50';
	}
	if (type=='warning') {
		document.getElementById("customalert").style.backgroundColor = '#f44336';
	}
	document.getElementById("customalert").innerHTML = message;
	var x = document.getElementById("customalert");
	x.className = "show";
	setTimeout(function(){ x.className = x.classList.remove("show"); }, 3500);
}

function resetInput() {
	fullname.value = '';
	phone.value = '';
	address.value = '';
	admin_name.value = '';
	password.value = '';
	re_password.value = '';
	mkInput.value = '';
	tkInput.value = '';
}

	
signupForm.addEventListener('click', function(e){
	e.preventDefault();

	resetDom();

	validationsList = [
		nameValidator(fullname.value),
		phoneValidator(phone.value),
		addressValidator(address.value),
		adminNameValidator(admin_name.value),
		passwordValidator(password.value),
		confirmPasswordValidator(re_password.value, password.value)
	]

	var filteredValidationList = validationsList.filter(function(item) {
		return item !== false;
		}) 

		if (filteredValidationList.length > 0) {
		filteredValidationList.forEach(function(testResult){
			DOMRender(testResult);
		})
		console.log(validationsList);
		} else {

		console.log('======== SUCCESS ========');
		console.log({
			name: fullname.value,
			phone: phone.value,
			address: address.value,
			userName: admin_name.value,
			password: password.value,
			confirmPassword: re_password.value
		});
		


		customAlert('Bạn đã đăng ký thành công!','success');
		document.getElementById("DKadmin").style.display = 'none';
		document.getElementById("DNadmin").style.display = 'block';
		var today = new Date();
		var datesignup= today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
		var admin= new User(fullname.value,phone.value,address.value,admin_name.value,password.value,datesignup,"admin",[]);
		// console.log(user);
		var mangadmin= JSON.parse(localStorage.getItem("admin"));
		mangadmin.push(admin);
		localStorage.setItem("admin", JSON.stringify(mangadmin));
		resetInput();
		return true
	}	
})

var loginForm = document.getElementById('DN');
var arrValidater = []
loginForm.addEventListener('click', function(e){
	e.preventDefault();

	resetDom();
 
	if (loginValidator(tkInput.value, mkInput.value) !== false) {
		DOMRender(loginValidator(tkInput.value, mkInput.value))
	} else {
	
	


    location.reload();
    trangthaiDangNhap();
    customAlert("Bạn đã đăng nhập thành công")
    
    document.getElementById("close_login").display = "none";
    document.getElementById("registration").display = "none";


	// document.getElementById("click_login").innerHTML='<img src="image/2x/baseline_perm_identity_black_18dp.png" style="float:left; margin-top:25px"/>'+'<div class="username">'+name+'<div class="logout" onclick="logout();">Logout</div></div>';

	resetInput();
	return true;
	}
	
})





// function registration() {
// 	var name = document.getElementById("name").value;
// 	var phone = document.getElementById("phone").value;
// 	var address = document.getElementById("address").value;
// 	var admin_name = document.getElementById("admin_name").value;
// 	var password = document.getElementById("password").value;
// 	var re_password = document.getElementById("re_password").value;
// 	if (name == "") {
// 		alert('Bạn Chưa Nhập Họ Và Tên')
// 		return false
// 	}
// 	if (phone == "") {
// 		alert('Bạn Chưa Nhập Số Điện Thoại')
// 		return false
// 	}
// 	if (address == "") {
// 		alert('Bạn Chưa Nhập Địa Chỉ')
// 		return false
// 	}
// 	if (admin_name == "") {
// 		alert('Bạn Chưa Nhập Tên Đăng Nhập')
// 		return false
// 	}
// 	if (password == "") {
// 		alert('Bạn Chưa Nhập Mật Khẩu')
// 		return false
// 	}
// 	if(isNaN(phone)){
// 		alert('Số Điện Thoại Không Hợp Lệ')
// 		return false
// 	}
// 	if (password != re_password) {
// 		alert('Mật Khẩu Nhập Lại Không Khớp')
// 		return false
// 	}
// 	alert('Đăng Ký Tài Khoản Thành Công')
// 	document.getElementById("DKadmin").style.display = 'none';
// 	document.getElementById("DNadmin").style.display = 'block';
// 	var today = new Date();
// 	var datesignup= today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
// 	var admin= new User(name,phone,address,admin_name,password,datesignup,"admin");
// 	var mangadmin= JSON.parse(localStorage.getItem("admin"));
// 	mangadmin.push(admin);
// 	localStorage.setItem("admin", JSON.stringify(mangadmin));
// 	return true
// }
// function dangnhap()
// {
// 	var dangnhap=0;
// 	var tk=  document.getElementById("TK").value;
// 	var mk=  document.getElementById("MK").value;
// 	var mangadmin= JSON.parse(localStorage.getItem("admin"));
// 	for(var i=0;i<mangadmin.length;i++)
// 	{
// 		if(mangadmin[i].username==tk && mangadmin[i].password==mk) 
// 		{
// 			var name= mangadmin[i].fullname;
// 			localStorage.setItem("adminlogin", JSON.stringify(mangadmin[i]));
// 			dangnhap=1;		
// 			break;
// 		}
// 	}
// 	if(dangnhap==0) {
// 		alert("Sai tên đăng nhập hoặc mật khẩu!");
// 		return false;}
// 	else {
// 		document.getElementById("DNadmin").style.display = 'none';
// 		document.getElementById("adminCenter").style.display='block';
// 		document.getElementById("adminLeft").style.display='block';
// 		document.getElementById("adminRight").style.display='block';
// 		document.getElementById("nameAdmin").innerHTML=name;
// 		hienthi();
// 		alert("Đăng Nhập Thành Công");
// 	}
// }
function logout(){
	localStorage.removeItem("adminlogin");
	document.getElementById("adminCenter").style.display='none';
	document.getElementById("adminLeft").style.display='none';
	document.getElementById("adminRight").style.display='none';
	document.getElementById("DNadmin").style.display = 'block';
	
}
function trangthaiDangNhap()
{
	if(localStorage.getItem("adminlogin")!=null) {
	document.getElementById("adminCenter").style.display='block';
	document.getElementById("adminLeft").style.display='block';
	document.getElementById("adminRight").style.display='block';
    document.getElementById("DNadmin").style.display = 'none';
    document.getElementById("first").style.display = 'none';

	var admin = JSON.parse(localStorage.getItem("adminlogin"));
	document.getElementById("nameAdmin").innerHTML=admin.fullname;
	}
	else {
	document.getElementById("adminCenter").style.display='none';
	document.getElementById("adminLeft").style.display='none';
	document.getElementById("adminRight").style.display='none';
	document.getElementById("DNadmin").style.display = 'block';
	document.getElementById("first").style.display = 'block';

	}
}
var item = [
	{ id: 1  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac1_1.jpg"        , ida: "1-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac1_1.jpg"        , idb: "1-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac1_2.jpg"        , idc: "1-c"  , imagec:"image/A_ao/Ao_khoac/aokhoac1_3.jpg"        , Name:"Áo Khoác Vải Đơn Giản E06"                                                 , Normal_Price:425000   , Normal_Price_id: "1a"  , Promotional_Price:" "      , Promotional_Price_id: "1b"  , sl:1 , size:"S" , tt:425000   },
	{ id: 2  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac2_1.jpg"        , ida: "2-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac2_1.jpg"        , idb: "2-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac2_2.jpg"        , idc: "2-c"  , imagec:" "                                         , Name:"Áo Khoác Thun Đơn Giản C01"                                                , Normal_Price:349000   , Normal_Price_id: "2a"  , Promotional_Price:" "      , Promotional_Price_id: "2b"  , sl:1 , size:"S" , tt:349000   },
	{ id: 3  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac3_1.jpg"        , ida: "3-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac3_1.jpg"        , idb: "3-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac3_2.jpg"        , idc: "3-c"  , imagec:" "                                         , Name:"Áo Khoác Vải Đơn Giản L02"                                                 , Normal_Price:399000   , Normal_Price_id: "3a"  , Promotional_Price:" "      , Promotional_Price_id: "3b"  , sl:1 , size:"S" , tt:399000   },
	{ id: 4  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac4_1.jpg"        , ida: "4-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac4_1.jpg"        , idb: "4-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac4_2.jpg"        , idc: "4-c"  , imagec:"image/A_ao/Ao_khoac/aokhoac4_3.jpg"        , Name:"Áo Khoác Nỉ Có Nón AKN0175"                                                , Normal_Price:245000   , Normal_Price_id: "4a"  , Promotional_Price:" "      , Promotional_Price_id: "4b"  , sl:1 , size:"S" , tt:245000   },
	{ id: 5  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac5_1.jpg"        , ida: "5-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac5_1.jpg"        , idb: "5-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac5_2.jpg"        , idc: "5-c"  , imagec:" "                                         , Name:"Áo Khoác Dù Đơn Giản F03"                                                  , Normal_Price:299000   , Normal_Price_id: "5a"  , Promotional_Price:" "      , Promotional_Price_id: "5b"  , sl:1 , size:"S" , tt:299000   },
	{ id: 6  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac6_1.jpg"        , ida: "6-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac6_1.jpg"        , idb: "6-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac6_2.jpg"        , idc: "6-c"  , imagec:" "                                         , Name:"Áo Khoác Dù Just Men"                                                      , Normal_Price:600000   , Normal_Price_id: "6a"  , Promotional_Price:" "      , Promotional_Price_id: "6b"  , sl:1 , size:"S" , tt:600000   },
	{ id: 7  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac7_1.jpg"        , ida: "7-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac7_1.jpg"        , idb: "7-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac7_2.jpg"        , idc: "7-c"  , imagec:" "                                         , Name:"Áo Khoác Dù Thời Trang Windbreaker Neochic"                                , Normal_Price:489000   , Normal_Price_id: "7a"  , Promotional_Price:299000   , Promotional_Price_id: "7b"  , sl:1 , size:"S" , tt:489000   },
	{ id: 8  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac8_1.jpg"        , ida: "8-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac8_1.jpg"        , idb: "8-b"  , imageb:" "                                         , idc: "8-c"  , imagec:" "                                         , Name:"ÁO KHOÁC DÙ 2 LỚP BIG SIZE BS1624"                                         , Normal_Price:565000   , Normal_Price_id: "8a"  , Promotional_Price:" "      , Promotional_Price_id: "8b"  , sl:1 , size:"S" , tt:565000   },
	{ id: 9  , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi1_1.jpg"          , ida: "9-a"  , imagea:"image/A_ao/Ao_somi/aosomi1_1.jpg"          , idb: "9-b"  , imageb:"image/A_ao/Ao_somi/aosomi1_2.jpg"          , idc: "9-c"  , imagec:"image/A_ao/Ao_somi/aosomi1_3.jpg"          , Name:"Áo Sơ Mi Nam Trắng Trơn TRANGBE99 (Trắng Bẻ)"                              , Normal_Price:220000   , Normal_Price_id: "9a"  , Promotional_Price:68000    , Promotional_Price_id: "9b"  , sl:1 , size:"S" , tt:220000   },
	{ id: 10 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi2_1.jpg"          , ida: "10-a" , imagea:"image/A_ao/Ao_somi/aosomi2_1.jpg"          , idb: "10-b" , imageb:"image/A_ao/Ao_somi/aosomi2_2.jpg"          , idc: "10-c" , imagec:" "                                         , Name:"Áo sơ mi nam hàng hiệu cao cấp ARMANI"                                     , Normal_Price:6084000  , Normal_Price_id: "10a" , Promotional_Price:3285360  , Promotional_Price_id: "10b" , sl:1 , size:"S" , tt:6084000  },
	{ id: 11 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi3_1.jpg"          , ida: "11-a" , imagea:"image/A_ao/Ao_somi/aosomi3_1.jpg"          , idb: "11-b" , imageb:"image/A_ao/Ao_somi/aosomi3_2.jpg"          , idc: "11-c" , imagec:"image/A_ao/Ao_somi/aosomi3_3.jpg"          , Name:"Áo sơ mi SOO Thiết Kế B1KM19"                                              , Normal_Price:285000   , Normal_Price_id: "11a" , Promotional_Price:142500   , Promotional_Price_id: "11b" , sl:1 , size:"S" , tt:285000   },
	{ id: 12 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi4_1.jpg"          , ida: "12-a" , imagea:"image/A_ao/Ao_somi/aosomi4_1.jpg"          , idb: "12-b" , imageb:"image/A_ao/Ao_somi/aosomi4_2.jpg"          , idc: "12-c" , imagec:" "                                         , Name:"Áo sơ mi du lịch nam caro cao cấp (AXH-146)"                               , Normal_Price:285000   , Normal_Price_id: "12a" , Promotional_Price:265000   , Promotional_Price_id: "12b" , sl:1 , size:"S" , tt:285000   },
	{ id: 13 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi5_1.jpg"          , ida: "13-a" , imagea:"image/A_ao/Ao_somi/aosomi5_1.jpg"          , idb: "13-b" , imageb:"image/A_ao/Ao_somi/aosomi5_2.jpg"          , idc: "13-c" , imagec:"image/A_ao/Ao_somi/aosomi5_3.jpg"          , Name:"Áo SM JustMen Trơn Tay Dài"                                                , Normal_Price:380000   , Normal_Price_id: "13a" , Promotional_Price:" "      , Promotional_Price_id: "13b" , sl:1 , size:"S" , tt:380000   },
	{ id: 14 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi6_1.jpg"          , ida: "14-a" , imagea:"image/A_ao/Ao_somi/aosomi6_1.jpg"          , idb: "14-b" , imageb:"image/A_ao/Ao_somi/aosomi6_2.jpg"          , idc: "14-c" , imagec:" "                                         , Name:"Áo Sơ Mi Nam Dài Tay KOJIBA - Màu Đen Trơn"                                , Normal_Price:179000   , Normal_Price_id: "14a" , Promotional_Price:" "      , Promotional_Price_id: "14b" , sl:1 , size:"S" , tt:179000   },
	{ id: 15 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi7_1.jpg"          , ida: "15-a" , imagea:"image/A_ao/Ao_somi/aosomi7_1.jpg"          , idb: "15-b" , imageb:" "                                         , idc: "15-c" , imagec:" "                                         , Name:"Áo Sơ Mi Đen Trụ SMD0008"                                                  , Normal_Price:175000   , Normal_Price_id: "15a" , Promotional_Price:135000   , Promotional_Price_id: "15b" , sl:1 , size:"S" , tt:175000   },
	{ id: 16 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi8_1.jpg"          , ida: "16-a" , imagea:"image/A_ao/Ao_somi/aosomi8_1.jpg"          , idb: "16-b" , imageb:"image/A_ao/Ao_somi/aosomi8_2.jpg"          , idc: "16-c" , imagec:" "                                         , Name:"Áo Sơ Mi Đơn Giản B1KM12"                                                  , Normal_Price:286000   , Normal_Price_id: "16a" , Promotional_Price:" "      , Promotional_Price_id: "16b" , sl:1 , size:"S" , tt:286000   },
	{ id: 17 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun1_1.jpg"          , ida: "17-a" , imagea:"image/A_ao/Ao_thun/aothun1_1.jpg"          , idb: "17-b" , imageb:"image/A_ao/Ao_thun/aothun1_2.jpg"          , idc: "17-c" , imagec:"image/A_ao/Ao_thun/aothun1_3.jpg"          , Name:"Áo Thun Đơn Giản BF01"                                                     , Normal_Price:150000   , Normal_Price_id: "17a" , Promotional_Price:" "      , Promotional_Price_id: "17b" , sl:1 , size:"S" , tt:150000   },
	{ id: 18 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun2_1.jpg"          , ida: "18-a" , imagea:"image/A_ao/Ao_thun/aothun2_1.jpg"          , idb: "18-b" , imageb:"image/A_ao/Ao_thun/aothun2_2.jpg"          , idc: "18-c" , imagec:"image/A_ao/Ao_thun/aothun2_3.jpg"          , Name:"Áo thun nam hàng hiệu cao cấp SAINT LAURENT"                               , Normal_Price:10257000 , Normal_Price_id: "18a" , Promotional_Price:5538780  , Promotional_Price_id: "18b" , sl:1 , size:"S" , tt:10257000 },
	{ id: 19 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun3_1.jpg"          , ida: "19-a" , imagea:"image/A_ao/Ao_thun/aothun3_1.jpg"          , idb: "19-b" , imageb:"image/A_ao/Ao_thun/aothun3_2.jpg"          , idc: "19-c" , imagec:"image/A_ao/Ao_thun/aothun3_3.jpg"          , Name:"Áo Thun Đơn Giản BE01"                                                     , Normal_Price:150000   , Normal_Price_id: "19a" , Promotional_Price:" "      , Promotional_Price_id: "19b" , sl:1 , size:"S" , tt:150000   },
	{ id: 20 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun4_1.jpg"          , ida: "20-a" , imagea:"image/A_ao/Ao_thun/aothun4_1.jpg"          , idb: "20-b" , imageb:"image/A_ao/Ao_thun/aothun4_2.jpg"          , idc: "20-c" , imagec:"image/A_ao/Ao_thun/aothun4_3.jpg"          , Name:"Áo Thun Đơn Giản J01"                                                      , Normal_Price:185000   , Normal_Price_id: "20a" , Promotional_Price:" "      , Promotional_Price_id: "20b" , sl:1 , size:"S" , tt:185000   },
	{ id: 21 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun5_1.jpg"          , ida: "21-a" , imagea:"image/A_ao/Ao_thun/aothun5_1.jpg"          , idb: "21-b" , imageb:"image/A_ao/Ao_thun/aothun5_2.jpg"          , idc: "21-c" , imagec:" "                                         , Name:"Áo Thun Nam Unisex thiết kế hình trơn"                                     , Normal_Price:249000   , Normal_Price_id: "21a" , Promotional_Price:99000    , Promotional_Price_id: "21b" , sl:1 , size:"S" , tt:249000   },
	{ id: 22 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun6_1.jpg"          , ida: "22-a" , imagea:"image/A_ao/Ao_thun/aothun6_1.jpg"          , idb: "22-b" , imageb:"image/A_ao/Ao_thun/aothun6_2.jpg"          , idc: "22-c" , imagec:" "                                         , Name:"Áo Thun Đơn Giản E13"                                                      , Normal_Price:150000   , Normal_Price_id: "22a" , Promotional_Price:" "      , Promotional_Price_id: "22b" , sl:1 , size:"S" , tt:150000   },
	{ id: 23 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun7_1.jpg"          , ida: "23-a" , imagea:"image/A_ao/Ao_thun/aothun7_1.jpg"          , idb: "23-b" , imageb:" "                                         , idc: "23-c" , imagec:" "                                         , Name:"Áo Thun ValKnut Ver1"                                                      , Normal_Price:99000    , Normal_Price_id: "23a" , Promotional_Price:" "      , Promotional_Price_id: "23b" , sl:1 , size:"S" , tt:99000    },
	{ id: 24 , style_ItemID: "giay_adidas"      , image: "image/A_giay/giay1_1.jpg"                  , ida: "24-a" , imagea:"image/A_giay/giay1_1.jpg"                  , idb: "24-b" , imageb:"image/A_giay/giay1_2.jpg"                  , idc: "24-c" , imagec:"image/A_giay/giay1_3.jpg"                  , Name:"Giày adidas Supperstar"                                                    , Normal_Price:2400000  , Normal_Price_id: "24a" , Promotional_Price:" "      , Promotional_Price_id: "24b" , sl:1 , size:36  , tt:2400000  },
	{ id: 25 , style_ItemID: "giay_adidas"      , image: "image/A_giay/giay2_1.jpg"                  , ida: "25-a" , imagea:"image/A_giay/giay2_1.jpg"                  , idb: "25-b" , imageb:"image/A_giay/giay2_2.jpg"                  , idc: "25-c" , imagec:"image/A_giay/giay2_3.jpg"                  , Name:"Giày adidas Duramo SL"                                                     , Normal_Price:1500000  , Normal_Price_id: "25a" , Promotional_Price:" "      , Promotional_Price_id: "25b" , sl:1 , size:36  , tt:1500000  },
	{ id: 26 , style_ItemID: "giay_adidas"      , image: "image/A_giay/giay3_1.jpg"                  , ida: "26-a" , imagea:"image/A_giay/giay3_1.jpg"                  , idb: "26-b" , imageb:"image/A_giay/giay3_2.jpg"                  , idc: "26-c" , imagec:"image/A_giay/giay3_3.jpg"                  , Name:"Giày adidas Ultraboost"                                                    , Normal_Price:4200000  , Normal_Price_id: "26a" , Promotional_Price:" "      , Promotional_Price_id: "26b" , sl:1 , size:36  , tt:4200000  },
	{ id: 27 , style_ItemID: "giay_adidas"      , image: "image/A_giay/giay4_1.jpg"                  , ida: "27-a" , imagea:"image/A_giay/giay4_1.jpg"                  , idb: "27-b" , imageb:"image/A_giay/giay4_2.jpg"                  , idc: "27-c" , imagec:"image/A_giay/giay4_3.jpg"                  , Name:"Giày adidas Stan Smith"                                                    , Normal_Price:2300000  , Normal_Price_id: "27a" , Promotional_Price:" "      , Promotional_Price_id: "27b" , sl:1 , size:36  , tt:2300000  },
	{ id: 28 , style_ItemID: "giay_nike"        , image: "image/A_giay/giay5_1.jpg"                  , ida: "28-a" , imagea:"image/A_giay/giay5_1.jpg"                  , idb: "28-b" , imageb:"image/A_giay/giay5_2.jpg"                  , idc: "28-c" , imagec:"image/A_giay/giay5_3.jpg"                  , Name:"Giày NIKE AIR FORCE 1 (314192-117)"                                        , Normal_Price:2500000  , Normal_Price_id: "28a" , Promotional_Price:1770000  , Promotional_Price_id: "28b" , sl:1 , size:36  , tt:2500000  },
	{ id: 29 , style_ItemID: "giay_nike"        , image: "image/A_giay/giay6_1.jpg"                  , ida: "29-a" , imagea:"image/A_giay/giay6_1.jpg"                  , idb: "29-b" , imageb:"image/A_giay/giay6_2.jpg"                  , idc: "29-c" , imagec:"image/A_giay/giay6_3.jpg"                  , Name:"Giày Nike Air Force 1 Shadow Kim Cương REP 1:1"                            , Normal_Price:1500000  , Normal_Price_id: "29a" , Promotional_Price:" "      , Promotional_Price_id: "29b" , sl:1 , size:36  , tt:1500000  },
	{ id: 30 , style_ItemID: "giay_nike"        , image: "image/A_giay/giay7_1.jpg"                  , ida: "30-a" , imagea:"image/A_giay/giay7_1.jpg"                  , idb: "30-b" , imageb:"image/A_giay/giay7_2.jpg"                  , idc: "30-c" , imagec:"image/A_giay/giay7_3.jpg"                  , Name:"GIÀY Nike AIR JORDAN 1 LOW (NOTHING BUT NET)"                              , Normal_Price:4900000  , Normal_Price_id: "30a" , Promotional_Price:4000000  , Promotional_Price_id: "30b" , sl:1 , size:36  , tt:4900000  },
	{ id: 31 , style_ItemID: "giay_nike"        , image: "image/A_giay/giay8_1.jpg"                  , ida: "31-a" , imagea:"image/A_giay/giay8_1.jpg"                  , idb: "31-b" , imageb:"image/A_giay/giay8_2.jpg"                  , idc: "31-c" , imagec:"image/A_giay/giay8_3.jpg"                  , Name:"Giày Nike  golf nam FI Impact 3 (W)"                                       , Normal_Price:3700000  , Normal_Price_id: "31a" , Promotional_Price:3500000  , Promotional_Price_id: "31b" , sl:1 , size:36  , tt:3700000  },
	{ id: 32 , style_ItemID: "giay_gucci"       , image: "image/A_giay/giay9_1.jpg"                  , ida: "32-a" , imagea:"image/A_giay/giay9_1.jpg"                  , idb: "32-b" , imageb:"image/A_giay/giay9_2.jpg"                  , idc: "32-c" , imagec:"image/A_giay/giay9_3.jpg"                  , Name:"Giày Gucci Men's Ace Embroidered Sneaker White Leather With Bee Màu Trắng" , Normal_Price:15600000 , Normal_Price_id: "32a" , Promotional_Price:13600000 , Promotional_Price_id: "32b" , sl:1 , size:36  , tt:15600000 },
	{ id: 33 , style_ItemID: "giay_gucci"       , image: "image/A_giay/giay10_1.jpg"                 , ida: "33-a" , imagea:"image/A_giay/giay10_1.jpg"                 , idb: "33-b" , imageb:"image/A_giay/giay10_2.jpg"                 , idc: "33-c" , imagec:"image/A_giay/giay11_3.jpg"                 , Name:"Giày Gucci Ace Sneaker Leather Sneaker"                                    , Normal_Price:12500000 , Normal_Price_id: "33a" , Promotional_Price:" "      , Promotional_Price_id: "33b" , sl:1 , size:36  , tt:12500000 },
	{ id: 34 , style_ItemID: "giay_gucci"       , image: "image/A_giay/giay11_1.jpg"                 , ida: "34-a" , imagea:"image/A_giay/giay11_1.jpg"                 , idb: "34-b" , imageb:"image/A_giay/giay11_2.jpg"                 , idc: "34-c" , imagec:"image/A_giay/giay10_3.jpg"                 , Name:"Giày Gucci ACE Triple Black"                                               , Normal_Price:2300000  , Normal_Price_id: "34a" , Promotional_Price:" "      , Promotional_Price_id: "34b" , sl:1 , size:36  , tt:2300000  },
	{ id: 35 , style_ItemID: "giay_gucci"       , image: "image/A_giay/giay12_1.jpg"                 , ida: "35-a" , imagea:"image/A_giay/giay12_1.jpg"                 , idb: "35-b" , imageb:"image/A_giay/giay12_2.jpg"                 , idc: "35-c" , imagec:" "                                         , Name:"Giày Gucci MLB Boston"                                                     , Normal_Price:2400000  , Normal_Price_id: "35a" , Promotional_Price:" "      , Promotional_Price_id: "35b" , sl:1 , size:36  , tt:2400000  },
	{ id: 36 , style_ItemID: "quan_tay"         , image: "image/A_quan/quan1_1.jpg"                  , ida: "36-a" , imagea:"image/A_quan/quan1_1.jpg"                  , idb: "36-b" , imageb:"image/A_quan/quan1_2.jpg"                  , idc: "36-c" , imagec:"image/A_quan/quan1_3.jpg"                  , Name:"Quần Tây Đơn Giản B2FL02"                                                  , Normal_Price:425000   , Normal_Price_id: "36a" , Promotional_Price:" "      , Promotional_Price_id: "36b" , sl:1 , size:36  , tt:425000   },
	{ id: 37 , style_ItemID: "quan_jogger"      , image: "image/A_quan/quan2_1.jpg"                  , ida: "37-a" , imagea:"image/A_quan/quan2_1.jpg"                  , idb: "37-b" , imageb:"image/A_quan/quan2_2.jpg"                  , idc: "37-c" , imagec:"image/A_quan/quan2_3.jpg"                  , Name:"QUẦN THỂ THAO SST"                                                         , Normal_Price:1000000  , Normal_Price_id: "37a" , Promotional_Price:" "      , Promotional_Price_id: "37b" , sl:1 , size:36  , tt:1000000  },
	{ id: 38 , style_ItemID: "quan_kaki"        , image: "image/A_quan/quan3_1.jpg"                  , ida: "38-a" , imagea:"image/A_quan/quan3_1.jpg"                  , idb: "38-b" , imageb:"image/A_quan/quan3_2.jpg"                  , idc: "38-c" , imagec:"image/A_quan/quan3_3.jpg"                  , Name:"Quần kaki baggy nam nữ cực chất"                                           , Normal_Price:180000   , Normal_Price_id: "38a" , Promotional_Price:119000   , Promotional_Price_id: "38b" , sl:1 , size:36  , tt:180000   },
	{ id: 39 , style_ItemID: "quan_jogger"      , image: "image/A_quan/quan4_1.jpg"                  , ida: "39-a" , imagea:"image/A_quan/quan4_1.jpg"                  , idb: "39-b" , imageb:"image/A_quan/quan4_2.jpg"                  , idc: "39-c" , imagec:"image/A_quan/quan4_3.jpg"                  , Name:"Quần Jogger Nam Ống Bó Thời Trang Hàn Quốc JOGGER04"                       , Normal_Price:179000   , Normal_Price_id: "39a" , Promotional_Price:85000    , Promotional_Price_id: "39b" , sl:1 , size:36  , tt:179000   },
	{ id: 40 , style_ItemID: "quan_jogger"      , image: "image/A_quan/quan5_1.jpg"                  , ida: "40-a" , imagea:"image/A_quan/quan5_1.jpg"                  , idb: "40-b" , imageb:"image/A_quan/quan5_2.jpg"                  , idc: "40-c" , imagec:"image/A_quan/quan5_3.jpg"                  , Name:"Quần Jogger Thun Đen Trơn DC QTD0001"                                      , Normal_Price:180000   , Normal_Price_id: "40a" , Promotional_Price:" "      , Promotional_Price_id: "40b" , sl:1 , size:36  , tt:180000   },
	{ id: 41 , style_ItemID: "quan_jean"         , image: "image/A_quan/quan6_1.jpg"                  , ida: "41-a" , imagea:"image/A_quan/quan6_1.jpg"                  , idb: "41-b" , imageb:"image/A_quan/quan6_2.jpg"                  , idc: "41-c" , imagec:"image/A_quan/quan6_3.jpg"                  , Name:"Quần jeans nam VNXK Form 511 suông"                                        , Normal_Price:350000   , Normal_Price_id: "41a" , Promotional_Price:280000   , Promotional_Price_id: "41b" , sl:1 , size:36  , tt:350000   },
	{ id: 42 , style_ItemID: "quan_kaki"        , image: "image/A_quan/quan7_1.jpg"                  , ida: "42-a" , imagea:"image/A_quan/quan7_1.jpg"                  , idb: "42-b" , imageb:"image/A_quan/quan7_2.jpg"                  , idc: "42-c" , imagec:"image/A_quan/quan7_3.jpg"                  , Name:"Quần Kaki Dài Nam QKK0016"                                                 , Normal_Price:320000   , Normal_Price_id: "42a" , Promotional_Price:" "      , Promotional_Price_id: "42b" , sl:1 , size:36  , tt:320000   },
	{ id: 43 , style_ItemID: "quan_tay"         , image: "image/A_quan/quan8_1.jpg"                  , ida: "43-a" , imagea:"image/A_quan/quan8_1.jpg"                  , idb: "43-b" , imageb:"image/A_quan/quan8_2.jpg"                  , idc: "43-c" , imagec:" "                                         , Name:"Quần Tây Âu Màu Trơn Cho Nam"                                              , Normal_Price:250000   , Normal_Price_id: "43a" , Promotional_Price:193000   , Promotional_Price_id: "43b" , sl:1 , size:36  , tt:250000   },
	{ id: 44 , style_ItemID: "quan_jean"        , image: "image/A_quan/quan9_1.jpg"                  , ida: "44-a" , imagea:"image/A_quan/quan9_1.jpg"                  , idb: "44-b" , imageb:"image/A_quan/quan9_2.jpg"                  , idc: "44-c" , imagec:" "                                         , Name:"Quần jean nam hàng hiệu Merriman MJ001"                                    , Normal_Price:680000   , Normal_Price_id: "44a" , Promotional_Price:" "      , Promotional_Price_id: "44b" , sl:1 , size:36  , tt:680000   },
	{ id: 45 , style_ItemID: "phukien_dongho"   , image: "image/A_phukien/dong_ho/dongho1_1.jpg"     , ida: "45-a" , imagea:"image/A_phukien/dong_ho/dongho1_1.jpg"     , idb: "45-b" , imageb:"image/A_phukien/dong_ho/dongho1_2.jpg"     , idc: "45-c" , imagec:"image/A_phukien/dong_ho/dongho1_3.jpg"     , Name:"Đồng hồ Jacques Lemans JL-1-1654ZD"                                        , Normal_Price:5500000  , Normal_Price_id: "45a" , Promotional_Price:" "      , Promotional_Price_id: "45b" , sl:1            , tt:5500000  },
	{ id: 46 , style_ItemID: "phukien_dongho"   , image: "image/A_phukien/dong_ho/dongho2_1.jpg"     , ida: "46-a" , imagea:"image/A_phukien/dong_ho/dongho2_1.jpg"     , idb: "46-b" , imageb:"image/A_phukien/dong_ho/dongho2_2.jpg"     , idc: "46-c" , imagec:"image/A_phukien/dong_ho/dongho2_3.jpg"     , Name:"Đồng hồ nam chính hãng Teintop T7015-1"                                    , Normal_Price:1923000  , Normal_Price_id: "46a" , Promotional_Price:1250000  , Promotional_Price_id: "46b" , sl:1            , tt:1923000  },
	{ id: 47 , style_ItemID: "phukien_dongho"   , image: "image/A_phukien/dong_ho/dongho3_1.jpg"     , ida: "47-a" , imagea:"image/A_phukien/dong_ho/dongho3_1.jpg"     , idb: "47-b" , imageb:"image/A_phukien/dong_ho/dongho3_2.jpg"     , idc: "47-c" , imagec:"image/A_phukien/dong_ho/dongho3_3.jpg"     , Name:"Đồng hồ nam DIZIZID mặt mỏng chạy FULL kim DZKG001"                        , Normal_Price:650000   , Normal_Price_id: "47a" , Promotional_Price:450000   , Promotional_Price_id: "47b" , sl:1            , tt:650000   },
	{ id: 48 , style_ItemID: "phukien_dongho"   , image: "image/A_phukien/dong_ho/dongho4_1.jpg"     , ida: "48-a" , imagea:"image/A_phukien/dong_ho/dongho4_1.jpg"     , idb: "48-b" , imageb:"image/A_phukien/dong_ho/dongho4_2.jpg"     , idc: "48-c" , imagec:"image/A_phukien/dong_ho/dongho4_3.jpg"     , Name:"Đồng hồ nam Casio MTP-1374L-1AVDF 6 Kim - Dây da màu đen"                  , Normal_Price:1904000  , Normal_Price_id: "48a" , Promotional_Price:1519000  , Promotional_Price_id: "48b" , sl:1            , tt:1904000  },
	{ id: 49 , style_ItemID: "phukien_dongho"   , image: "image/A_phukien/dong_ho/dongho5_1.jpg"     , ida: "49-a" , imagea:"image/A_phukien/dong_ho/dongho5_1.jpg"     , idb: "49-b" , imageb:"image/A_phukien/dong_ho/dongho5_2.jpg"     , idc: "49-c" , imagec:" "                                         , Name:"ĐỒNG HỒ NAM CHÍNH HÃNG TEINTOP T7015-1"                                    , Normal_Price:1923000  , Normal_Price_id: "49a" , Promotional_Price:1250000  , Promotional_Price_id: "49b" , sl:1            , tt:1923000  },
	{ id: 50 , style_ItemID: "phukien_dongho"   , image: "image/A_phukien/dong_ho/dongho6_1.jpg"     , ida: "50-a" , imagea:"image/A_phukien/dong_ho/dongho6_1.jpg"     , idb: "50-b" , imageb:"image/A_phukien/dong_ho/dongho6_2.jpg"     , idc: "50-c" , imagec:" "                                         , Name:"Đồng hồ Jacques Lemans JL-1-1654.2ZD"                                      , Normal_Price:5500000  , Normal_Price_id: "50a" , Promotional_Price:" "      , Promotional_Price_id: "50b" , sl:1            , tt:5500000  },
	{ id: 51 , style_ItemID: "phukien_thatlung" , image: "image/A_phukien/thac_lung/thaclung1_1.jpg" , ida: "51-a" , imagea:"image/A_phukien/thac_lung/thaclung1_1.jpg" , idb: "51-b" , imageb:"image/A_phukien/thac_lung/thaclung1_2.jpg" , idc: "51-c" , imagec:"image/A_phukien/thac_lung/thaclung1_3.jpg" , Name:"THẮT LƯNG DA NAM CÔNG SỞ LS17"                                             , Normal_Price:500000   , Normal_Price_id: "51a" , Promotional_Price:" "      , Promotional_Price_id: "51b" , sl:1            , tt:500000   },
	{ id: 52 , style_ItemID: "phukien_thatlung" , image: "image/A_phukien/thac_lung/thaclung2_1.jpg" , ida: "52-a" , imagea:"image/A_phukien/thac_lung/thaclung2_1.jpg" , idb: "52-b" , imageb:"image/A_phukien/thac_lung/thaclung2_2.jpg" , idc: "52-c" , imagec:"image/A_phukien/thac_lung/thaclung2_3.jpg" , Name:"Thắt lưng nam da bò AT P134"                                               , Normal_Price:275000   , Normal_Price_id: "52a" , Promotional_Price:214500   , Promotional_Price_id: "52b" , sl:1            , tt:275000   },
	{ id: 53 , style_ItemID: "phukien_thatlung" , image: "image/A_phukien/thac_lung/thaclung3_1.jpg" , ida: "53-a" , imagea:"image/A_phukien/thac_lung/thaclung3_1.jpg" , idb: "53-b" , imageb:"image/A_phukien/thac_lung/thaclung3_2.jpg" , idc: "53-c" , imagec:"image/A_phukien/thac_lung/thaclung3_3.jpg" , Name:"Thắt Lưng Da Nam CARTELO Mẫu 26"                                           , Normal_Price:657000   , Normal_Price_id: "53a" , Promotional_Price:547000   , Promotional_Price_id: "53b" , sl:1            , tt:657000   },
	{ id: 54 , style_ItemID: "phukien_thatlung" , image: "image/A_phukien/thac_lung/thaclung4_1.jpg" , ida: "54-a" , imagea:"image/A_phukien/thac_lung/thaclung4_1.jpg" , idb: "54-b" , imageb:"image/A_phukien/thac_lung/thaclung4_2.jpg" , idc: "54-c" , imagec:"image/A_phukien/thac_lung/thaclung4_3.jpg" , Name:"Dây thắt lưng nam da bò (không khóa)"                                      , Normal_Price:180000   , Normal_Price_id: "54a" , Promotional_Price:" "      , Promotional_Price_id: "54b" , sl:1            , tt:180000   },
	{ id: 55 , style_ItemID: "phukien_vida"     , image: "image/A_phukien/vi_da/vida1_1.jpg"         , ida: "55-a" , imagea:"image/A_phukien/vi_da/vida1_1.jpg"         , idb: "55-b" , imageb:"image/A_phukien/vi_da/vida1_2.jpg"         , idc: "55-c" , imagec:"image/A_phukien/vi_da/vida1_3.jpg"         , Name:"Ví Da Bò Nam Dáng Đứng, Bóp Da Nam Mẫu Mới Nhất – OSP024"                  , Normal_Price:690000   , Normal_Price_id: "55a" , Promotional_Price:620000   , Promotional_Price_id: "55b" , sl:1            , tt:690000   },
	{ id: 56 , style_ItemID: "phukien_vida"     , image: "image/A_phukien/vi_da/vida2_1.jpg"         , ida: "56-a" , imagea:"image/A_phukien/vi_da/vida2_1.jpg"         , idb: "56-b" , imageb:"image/A_phukien/vi_da/vida2_2.jpg"         , idc: "56-c" , imagec:"image/A_phukien/vi_da/vida2_3.jpg"         , Name:"Ví Venus - Ngang"                                                          , Normal_Price:450000   , Normal_Price_id: "56a" , Promotional_Price:" "      , Promotional_Price_id: "56b" , sl:1            , tt:450000   },
	{ id: 57 , style_ItemID: "phukien_vida"     , image: "image/A_phukien/vi_da/vida3_1.jpg"         , ida: "57-a" , imagea:"image/A_phukien/vi_da/vida3_1.jpg"         , idb: "57-b" , imageb:"image/A_phukien/vi_da/vida3_2.jpg"         , idc: "57-c" , imagec:"image/A_phukien/vi_da/vida3_3.jpg"         , Name:"Ví Da Cá Sấu"                                                              , Normal_Price:1150000  , Normal_Price_id: "57a" , Promotional_Price:" "      , Promotional_Price_id: "57b" , sl:1            , tt:1150000  },
	{ id: 58 , style_ItemID: "phukien_vida"     , image: "image/A_phukien/vi_da/vida4_1.jpg"         , ida: "58-a" , imagea:"image/A_phukien/vi_da/vida4_1.jpg"         , idb: "58-b" , imageb:"image/A_phukien/vi_da/vida4_2.jpg"         , idc: "58-c" , imagec:"image/A_phukien/vi_da/vida4_3.jpg"         , Name:"Ví Da Nam Lata LVN44D"                                                     , Normal_Price:400000   , Normal_Price_id: "58a" , Promotional_Price:" "      , Promotional_Price_id: "58b" , sl:1            , tt:400000   },
	{ id: 59 , style_ItemID: "phukien_vida"     , image: "image/A_phukien/vi_da/vida5_1.jpg"         , ida: "59-a" , imagea:"image/A_phukien/vi_da/vida5_1.jpg"         , idb: "59-b" , imageb:"image/A_phukien/vi_da/vida5_2.jpg"         , idc: "59-c" , imagec:" "                                         , Name:"Ví da nam cao cấp - AT031"                                                 , Normal_Price:265000   , Normal_Price_id: "59a" , Promotional_Price:206700   , Promotional_Price_id: "59b" , sl:1            , tt:265000   },
	{ id: 60 , style_ItemID: "phukien_vida"     , image: "image/A_phukien/vi_da/vida6_1.jpg"         , ida: "60-a" , imagea:"image/A_phukien/vi_da/vida6_1.jpg"         , idb: "60-b" , imageb:"image/A_phukien/vi_da/vida6_2.jpg"         , idc: "60-c" , imagec:" "                                         , Name:"Ví Da Nam Hàn Quốc Nhiều Ngăn"                                             , Normal_Price:329000   , Normal_Price_id: "60a" , Promotional_Price:299000   , Promotional_Price_id: "60b" , sl:1            , tt:329000   },
];
function sanpham(id,style_ItemID,image,ida,imagea,idb,imageb,idc,imagec,Name,Normal_Price,Normal_Price_id,Promotional_Price_id,size)
{
	this.id=id;
	this.style_ItemID=style_ItemID;
	this.image=image;
	this.ida=ida;
	this.imagea=imagea;
	this.idb=idb;
	this.imageb=imageb;
	this.idc=idc;
	this.imagec=imagec;
	this.Name=Name;
	this.Normal_Price=Normal_Price;
	this.Normal_Price_id=Normal_Price_id;
	this.Promotional_Price=" ";
	this.Promotional_Price_id=Promotional_Price_id;
	this.sl=1;
	this.size=size;
	this.tt=Normal_Price;
}
function sanpham(id,style_ItemID,image,ida,imagea,idb,imageb,idc,imagec,Name,Normal_Price,Normal_Price_id,Promotional_Price_id)
{
	this.id=id;
	this.style_ItemID=style_ItemID;
	this.image=image;
	this.ida=ida;
	this.imagea=imagea;
	this.idb=idb;
	this.imageb=imageb;
	this.idc=idc;
	this.imagec=imagec;
	this.Name=Name;
	this.Normal_Price=Normal_Price;
	this.Normal_Price_id=Normal_Price_id;
	this.Promotional_Price=" ";
	this.Promotional_Price_id=Promotional_Price_id;
	this.sl=1;
	this.tt=Normal_Price;
}
function laySP()
{
	if(localStorage.getItem("mangSanPhamAdmin")!=null) item=JSON.parse(localStorage.getItem("mangSanPhamAdmin"));
		else if(localStorage.getItem("mangSanPhamUser")!=null) item=JSON.parse(localStorage.getItem("mangSanPhamUser"));
}
function xoadau(str) { /********/
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
} 

function Search1(){ // tìm kiếm sản phẩm   /********/
	var item_search= xoadau(document.getElementById("searchSP").value);
	var temp=[];
	for(let i=0;i<item.length;i++)
	{
		x=xoadau(item[i].Name);
		var search_string= x.search( item_search);
		if(search_string!=-1)
			temp.push(item[i])
	}
	var s='',qlsp='';
	var k1='<div class="itemlist">';
	var k2='<div style="float:left; width:5%"><p style=" margin-left:20px">';
	var k3='</p></div>';
	var k4='<div style="float:left; width:15%"><img src="';
	var k5='" width="50" height="50" style="margin-left:15px"/></div>';
	var k6='<div style="float:left; width:30%"><p style=" margin-left:12px">';
	var k7='</p></div>';
	var k8='<div style="float:left; width:20%"><p style=" margin-left:12px">';
	var k9='</p></div>';
	var k10='<div style="float:left; width:15%"><img src="image/2x/baseline_build_black_18dp.png" class="del" style="margin-left:50px" onclick="suasanpham(';
	var k11=');"/>';
	var k12='</div>';
	var k13='<div style="float:left; width:15%"><img src="image/del.jpg"  class="del" style="margin-left:50px" onclick="xoasanpham(';
	var k14=');"/>';
	var k15='</div></div>';
	qlsp+='<h2 style="margin-left:40%; padding-top:20px; font-family:Tahoma; font-size:26px">Quản Lí Sản Phẩm</h2>';
	qlsp+='<div class="contain_search">';
    qlsp+='<input id="searchSP" type="text" placeholder="Tìm Kiếm Của Bạn..."/>';
    qlsp+='<button onclick="Search1();"><img src="image/2x/baseline_search_black_18dp.png" /></button>';
    qlsp+='</div></br>';
	qlsp+='<div class="btnThemMoiSP" onclick="themsanpham();">Thêm Sản Phẩm</div>';
	qlsp+='<div style="margin-left: 10%;width:80%;height:40px;margin-top:15px"><div style="float:left; width:5%"><p style=" margin-left:12px"><b>STT</b></p></div>';
	qlsp+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Hình Ảnh</b></p></div>';
	qlsp+='<div style="float:left; width:30%"><p style=" margin-left:12px"><b>Tên Sản Phẩm</b></p></div>';
	qlsp+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Giá Tiền</b></p></div>';
	qlsp+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Sửa Sản Phẩm</b></p></div>';
	qlsp+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Xóa Sản Phẩm</b></p></div></div>';
	qlsp+='<div class="list1">';
	for(var i=0;i<temp.length;i++)
	{
		s+=k1+k2+(i+1)+k3+k4+temp[i].image+k5+k6+temp[i].Name+k7+k8+formatNumber(temp[i].Normal_Price)+k9+k10+temp[i].id+k11+k12+k13+temp[i].id+k14+k15;
	}
	document.getElementById("adminRight").innerHTML=qlsp + s + '</div>';
} 
function Search2(){ // tìm kiếm sản phẩm  /********/
	var item_search= xoadau(document.getElementById("searchUser").value);
	var temp=[];
	var user = JSON.parse(localStorage.getItem("user"));
	var admin = JSON.parse(localStorage.getItem("admin"));
	var adminlogin = JSON.parse(localStorage.getItem("adminlogin"));
	var mangTK=[];
	for(var i=1;i<user.length;i++)
	{
		mangTK.push(user[i]);
	}
	for(var i=1;i<admin.length;i++)
	{
		if(admin[i].username!=adminlogin.username) {mangTK.push(admin[i]);}
	}
	for(let i=0;i<mangTK.length;i++)
	{
		x=xoadau(mangTK[i].fullname);
		var search_string= x.search( item_search);
		if(search_string!=-1)
			temp.push(mangTK[i])
	}
	localStorage.setItem("searchTK", JSON.stringify(temp));
	var s='',qlnd='';
	var k1='<div class="itemlist">';
	var k2='<div style="float:left; width:10%"><p style=" margin-left:20px">';
	var k3='</p></div>';
	var k4='<div style="float:left; width:20%"><p style=" margin-left:10px;font-size:20px">';
	var k5='</p></div>';
	var k6='<div style="float:left; width:20%"><img src="image/2x/TTTK.png" class="del" style="margin-left:75px" onclick="thongtinTK1(';
	var k7=');"/>';
	var k8='</div>';
	var k9='<div style="float:left; width:15%"><p style=" margin-left:50px; font-size:24px">';
	var k10='</p></div>';
	var k11='<div style="float:left; width:20%"><img src="image/2x/quyen.png" class="del" style="margin-left:80px" onclick="capquyenTK(';
	var k12=');"/>';
	var k13='</div>';
	var k14='<div style="float:left; width:15%"><img src="image/del.jpg"  class="del" style="margin-left:60px" onclick="xoaTK(';
	var k15=');"/>';
	var k16='</div></div>';
	for(var i=0;i<temp.length;i++)
	{
		s+=k1+k2+(i+1)+k3+k4+temp[i].username+k5+k6+i+k7+k8+k9+temp[i].role+k10+k11+i+k12+k13+k14+i+k15+k16;
	}
	qlnd+='<h2 style="margin-left:40%; padding-top:30px; font-family:Tahoma; font-size:26px">Quản Lí Người Dùng</h2>';
	qlnd+='<div class="contain_search">';
    qlnd+='<input id="searchUser" type="text" placeholder="Tìm Kiếm Người Dùng Theo Tên..."/>';
    qlnd+='<button onclick="Search2();"><img src="image/2x/baseline_search_black_18dp.png" /></button>';
    qlnd+='</div></br>';
	qlnd+='<div style="margin-left:10%;width:80%;height:40px;margin-top:30px"><div style="float:left; width:10%"><p style=" margin-left:12px"><b>STT</b></p></div>';
	qlnd+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Tên Tài Khoản</b></p></div>';
	qlnd+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Thông Tin Tài Khoản</b></p></div>';
	qlnd+='<div style="float:left; width:15%"><p><b>Quyền Tài Khoản</b></p></div>';
	qlnd+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Cấp Quyền Tài Khoản</b></p></div>';
	qlnd+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Xóa Tài Khoản</b></p></div></div>';
	qlnd+='<div class="list1">';
	document.getElementById("adminRight").innerHTML=qlnd + s + '</div>';
} 
function hienthi()
{
	var url = window.location.href;
	var id = url.split('?');
	var t= id[1];
	var qlsp='',sp=''; /********/
	qlsp+='<h2 style="margin-left:40%; padding-top:20px; font-family:Tahoma; font-size:26px">Quản Lí Sản Phẩm</h2>';
	qlsp+='<div class="contain_search">';
    qlsp+='<input id="searchSP" type="text" placeholder="Tìm Kiếm Của Bạn..."/>';
    qlsp+='<button onclick="Search1();"><img src="image/2x/baseline_search_black_18dp.png" /></button>';
    qlsp+='</div></br>';
	qlsp+='<div class="btnThemMoiSP" onclick="themsanpham();">Thêm Sản Phẩm</div>';
	qlsp+='<div style="margin-left: 10%;width:80%;height:40px;margin-top:15px"><div style="float:left; width:5%"><p style=" margin-left:12px"><b>STT</b></p></div>';
	qlsp+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Hình Ảnh</b></p></div>';
	qlsp+='<div style="float:left; width:30%"><p style=" margin-left:12px"><b>Tên Sản Phẩm</b></p></div>';
	qlsp+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Giá Tiền</b></p></div>';
	qlsp+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Sửa Sản Phẩm</b></p></div>';
	qlsp+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Xóa Sản Phẩm</b></p></div></div>';
	qlsp+='<div class="list1">';
	
	var qlhd='';
	qlhd+='<h2 style="margin-left:40%; padding-top:30px; font-family:Tahoma; font-size:26px">Quản Lí Hóa Đơn</h2></br>';
	qlhd+='<div style="margin-left:10%;width:80%;height:40px;margin-top:30px"><div style="float:left; width:15%"><p style="margin-left:12px"><b>Mã Hóa Đơn</b></p></div>';
	qlhd+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Ngày Đặt Hàng</b></p></div>';
	qlhd+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Thành Tiền</b></p></div>';
	qlhd+='<div style="float:left; width:20%"><p><b>Trạng Thái Đơn Hàng</b></p></div>';
	qlhd+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Xử Lí Đơn Hàng</b></p></div>';
	qlhd+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Xóa Đơn Hàng</b></p></div></div>';
	qlhd+='<div class="list1">';
	
	var qlnd=''; /********/
	qlnd+='<h2 style="margin-left:40%; padding-top:30px; font-family:Tahoma; font-size:26px">Quản Lí Người Dùng</h2>';
	qlnd+='<div class="contain_search">';
    qlnd+='<input id="searchUser" type="text" placeholder="Tìm Kiếm Người Dùng Theo Tên..."/>';
    qlnd+='<button onclick="Search2();"><img src="image/2x/baseline_search_black_18dp.png" /></button>';
    qlnd+='</div></br>';
	qlnd+='<div style="margin-left:10%;width:80%;height:40px;margin-top:30px"><div style="float:left; width:10%"><p style=" margin-left:12px"><b>STT</b></p></div>';
	qlnd+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Tên Tài Khoản</b></p></div>';
	qlnd+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Thông Tin Tài Khoản</b></p></div>';
	qlnd+='<div style="float:left; width:15%"><p><b>Quyền Tài Khoản</b></p></div>';
	qlnd+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Cấp Quyền Tài Khoản</b></p></div>';
	qlnd+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Xóa Tài Khoản</b></p></div></div>';
	qlnd+='<div class="list1">';
	
	var tkdt=''; /********/
	tkdt+='<h2 style="margin-left:40%; padding-top:30px; font-family:Tahoma; font-size:26px">Thống Kê Doanh Thu</h2></br>';
    tkdt+='<p style="margin-left:10%; font-family:Tahoma">Xem doanh thu theo khoảng thời gian:</p>';
	tkdt+='<div style="margin-left:10%; margin-top:20px">';
	tkdt+='<p class="thongke">Từ</p>';
	tkdt+='<input type="date" class="thongke" id="dayFrom"/>';
	tkdt+='<p class="thongke">Đến</p>';
	tkdt+='<input type="date" class="thongke" id="dayTo" />';
	tkdt+='<input type="submit" class="thongke" style="width:60px" value="Lọc" onclick="locThongKe()"/>';
	tkdt+='</div></br>';
	tkdt+='<div style="margin-left:10%;width:80%;height:40px;margin-top:30px"><div style="float:left; width:10%"><p style=" margin-left:12px"><b>STT</b></p></div>';
	tkdt+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Mã Hóa Đơn</b></p></div>';
	tkdt+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Ngày Đặt Hàng</b></p></div>';
	tkdt+='<div style="float:left; width:25%"><p style=" margin-left:12px"><b>Thông Tin Đơn Hàng</b></p></div>';
	tkdt+='<div style="float:left; width:25%"><p style=" margin-left:12px"><b>Thành Tiền</b></p></div></div>';
	tkdt+='<div class="list1" id="locthongke">';
	
	if(t=='QuanLiSanPham'){
	document.getElementById("adminRight").innerHTML=qlsp + hienthiSP() + '</div>';
	}
	if(t=='QuanLiHoaDon'){
		if(localStorage.getItem("mangHoaDon")!=null) document.getElementById("adminRight").innerHTML=qlhd + hienthiHD() + '</div>';
		else document.getElementById("adminRight").innerHTML=qlhd +'</div>';
	}
	if(t=='QuanLiNguoiDung'){
		if(localStorage.getItem("user")!=null) {document.getElementById("adminRight").innerHTML=qlnd + hienthiND() + '</div>';}
		else {document.getElementById("adminRight").innerHTML=qlnd +'</div>';}
	}
	if(t=='ThongKeDoanhThu'){ /********/
		if(localStorage.getItem("mangHoaDon")!=null) document.getElementById("adminRight").innerHTML=tkdt + thongkeDT();
		else document.getElementById("adminRight").innerHTML=tkdt +'</div>';
	}
}
function locThongKe() /********/
{
	var mangHoaDon = JSON.parse(localStorage.getItem("mangHoaDon"));
	var stt=1;total=0,s='',t='';
	var k1='<div class="itemlist">';
	var k2='<div style="float:left; width:10%"><p style=" margin-left:20px">';
	var k3='</p></div>';
	var k4='<div style="float:left; width:20%"><p style=" margin-left:20px">';
	var k5='</p></div>';
	var k6='<div style="float:left; width:20%"><p style=" margin-left:15px">';
	var k7='</p></div>';
	var k8='<div style="float:left; width:25%"><img src="image/2x/handling.png" class="del" style="margin-left:80px" onclick="xulidonhang(';
	var k9=');"/>';
	var k10='</div>';
	var k11='<div style="float:left; width:25%"><p style=" margin-left:20px">';
	var k12='</p></div></div>';
	for(var i=0;i<mangHoaDon.length;i++)
	{
		if(mangHoaDon[i].orderStatus=='Đã xử lí' && xuliDDMMYY(mangHoaDon[i].dateOrder)==true) {
		s+=k1+k2+stt+k3+k4+mangHoaDon[i].idBill+k5+k6+mangHoaDon[i].dateOrder+k7+k8+i+k9+k10+k11+formatNumber(mangHoaDon[i].tongtien)+k12;
		stt++;
		total+=Number(mangHoaDon[i].tongtien);}
	}
	document.getElementById("locthongke").innerHTML=s;
	document.getElementById("total").innerHTML=formatNumber(total);
}
function xuliDDMMYY(date) /********/
{
	var dayFrom=document.getElementById("dayFrom").value;
	var dayTo=document.getElementById("dayTo").value;
	var From=dayFrom.split('-');
	var To=dayTo.split('-');
	var ddFrom=Number(From[2]);
	var mmFrom=Number(From[1]);
	var yyFrom=Number(From[0]);
	var ddTo=Number(To[2]);
	var mmTo=Number(To[1]);
	var yyTo=Number(To[0]);
	var day=date.split('-');
	
	if(day[2]<=yyTo && day[2]>=yyFrom && day[1]<=mmTo && day[1]>=mmFrom && day[0]<=ddTo && day[0]>=ddFrom) {
		return true;}
	else {
	return false;}
}
function hienthiSP()
{
	var s='';
	var k1='<div class="itemlist">';
	var k2='<div style="float:left; width:5%"><p style=" margin-left:20px">';
	var k3='</p></div>';
	var k4='<div style="float:left; width:15%"><img src="';
	var k5='" width="50" height="50" style="margin-left:15px"/></div>';
	var k6='<div style="float:left; width:30%"><p style=" margin-left:12px">';
	var k7='</p></div>';
	var k8='<div style="float:left; width:20%"><p style=" margin-left:12px">';
	var k9='</p></div>';
	var k10='<div style="float:left; width:15%"><img src="image/2x/baseline_build_black_18dp.png" class="del" style="margin-left:50px" onclick="suasanpham(';
	var k11=');"/>';
	var k12='</div>';
	var k13='<div style="float:left; width:15%"><img src="image/del.jpg"  class="del" style="margin-left:50px" onclick="xoasanpham(';
	var k14=');"/>';
	var k15='</div></div>';
	for(var i=0;i<item.length;i++)
	{
		s+=k1+k2+(i+1)+k3+k4+item[i].image+k5+k6+item[i].Name+k7+k8+formatNumber(item[i].Normal_Price)+k9+k10+item[i].id+k11+k12+k13+item[i].id+k14+k15;
	}
	return s;
}
function hienthiHD()
{
	var mangHoaDon = JSON.parse(localStorage.getItem("mangHoaDon"));
	var s='';
	var k1='<div class="itemlist">';
	var k2='<div style="float:left; width:15%"><p style=" margin-left:20px">';
	var k3='</p></div>';
	var k4='<div style="float:left; width:15%"><p style=" margin-left:20px">';
	var k5='</p></div>';
	var k6='<div style="float:left; width:20%"><p style=" margin-left:12px">';
	var k7='</p></div>';
	var k8='<div style="float:left; width:20%"><p style=" margin-left:12px">';
	var k9='</p></div>';
	var k10='<div style="float:left; width:15%"><img src="image/2x/handling.png" class="del" style="margin-left:50px" onclick="xulidonhang(';
	var k11=');"/>';
	var k12='</div>';
	var k13='<div style="float:left; width:15%"><img src="image/del.jpg"  class="del" style="margin-left:50px" onclick="xoadonhang(';
	var k14=');"/>';
	var k15='</div></div>';
	for(var i=0;i<mangHoaDon.length;i++)
	{
		s+=k1+k2+mangHoaDon[i].idBill+k3+k4+mangHoaDon[i].dateOrder+k5+k6+formatNumber(mangHoaDon[i].tongtien)+k7+k8+mangHoaDon[i].orderStatus+k9+k10+i+k11+k12+k13+i+k14+k15;
	}
	return s;
}
function thongkeDT() /********/	
{
	var mangHoaDon = JSON.parse(localStorage.getItem("mangHoaDon"));
	var s='';
	var stt=1;total=0;
	var k1='<div class="itemlist">';
	var k2='<div style="float:left; width:10%"><p style=" margin-left:20px">';
	var k3='</p></div>';
	var k4='<div style="float:left; width:20%"><p style=" margin-left:20px">';
	var k5='</p></div>';
	var k6='<div style="float:left; width:20%"><p style=" margin-left:15px">';
	var k7='</p></div>';
	var k8='<div style="float:left; width:25%"><img src="image/2x/handling.png" class="del" style="margin-left:80px" onclick="xulidonhang(';
	var k9=');"/>';
	var k10='</div>';
	var k11='<div style="float:left; width:25%"><p style=" margin-left:20px">';
	var k12='</p></div></div>';
	for(var i=0;i<mangHoaDon.length;i++)
	{
		if(mangHoaDon[i].orderStatus=='Đã xử lí') {
		s+=k1+k2+stt+k3+k4+mangHoaDon[i].idBill+k5+k6+mangHoaDon[i].dateOrder+k7+k8+i+k9+k10+k11+formatNumber(mangHoaDon[i].tongtien)+k12;
		stt++;
		total+=Number(mangHoaDon[i].tongtien);}
	}
	s+='</div>';
	s+='<div><p style="margin-left:20%; padding-top:10px; font-family:Tahoma; font-size:22px; color:red; float:left"><b><i>Tổng Doanh Thu: </b></i></p> ';
	s+='<p id="total">';
	s+=formatNumber(total);
	s+='</p></div>';
	return s;
}
function hienthiND()
{
	if(localStorage.getItem("adminlogin")!=null) {
	var user = JSON.parse(localStorage.getItem("user"));
	var admin = JSON.parse(localStorage.getItem("admin"));
	var adminlogin = JSON.parse(localStorage.getItem("adminlogin"));
	var mangTK=[];
	for(var i=1;i<user.length;i++)
	{
		mangTK.push(user[i]);
	}
	for(var i=1;i<admin.length;i++)
	{
		if(admin[i].username!=adminlogin.username) {mangTK.push(admin[i]);}
	}
	var s='';
	var k1='<div class="itemlist">';
	var k2='<div style="float:left; width:10%"><p style=" margin-left:20px">';
	var k3='</p></div>';
	var k4='<div style="float:left; width:20%"><p style=" margin-left:10px;font-size:20px">';
	var k5='</p></div>';
	var k6='<div style="float:left; width:20%"><img src="image/2x/TTTK.png" class="del" style="margin-left:75px" onclick="thongtinTK(';
	var k7=');"/>';
	var k8='</div>';
	var k9='<div style="float:left; width:15%"><p style=" margin-left:50px; font-size:24px">';
	var k10='</p></div>';
	var k11='<div style="float:left; width:20%"><img src="image/2x/quyen.png" class="del" style="margin-left:80px" onclick="capquyenTK(';
	var k12=');"/>';
	var k13='</div>';
	var k14='<div style="float:left; width:15%"><img src="image/del.jpg"  class="del" style="margin-left:60px" onclick="xoaTK(';
	var k15=');"/>';
	var k16='</div></div>';
	for(var i=0;i<mangTK.length;i++)
	{
		s+=k1+k2+(i+1)+k3+k4+mangTK[i].username+k5+k6+i+k7+k8+k9+mangTK[i].role+k10+k11+i+k12+k13+k14+i+k15+k16;
	}
	return s;}
}
function capquyenTK(a)
{
	var adminlogin = JSON.parse(localStorage.getItem("adminlogin"));
	if(adminlogin.username=="admin") { 
	var t=DSTaiKhoan();
	if(t[a].role=="user") {
	var s='';
	s+='<p style="width:100%;text-align:center;font-family:Tahoma;font-size:20px;margin-top:20px;">Bạn có chắc cấp quyền cho tài khoản này không?</p>';
	s+='<div class="btnxoaSP" onclick="capquyenTK2(';
	s+=a;
	s+=');">Có</div>';
	s+='<div class="btnxoaSP" onclick="capquyenTK1();">Không</div>';
	document.getElementById("xoasanpham").innerHTML=s;
	document.getElementById("xoaSP").style.zIndex='21';
	document.getElementById("xoaSP").style.display='block';
	document.getElementById("xoasanpham").style.display='block';}
	else alert("Không thể tiếp tục cấp quyền cho tài khoản Admin");
	}
	else alert("Tài Khoản Này Không Thể Cấp Quyền");
}
function capquyenTK1()
{
	document.getElementById("xoaSP").style.zIndex='10';
	document.getElementById("xoaSP").style.display='none';
	document.getElementById("xoasanpham").style.display='none';
}
function capquyenTK2(a)
{
	var user = JSON.parse(localStorage.getItem("user"));
	var admin = JSON.parse(localStorage.getItem("admin"));
	var t=DSTaiKhoan();
	for(var i=0;i<user.length;i++)
	{	
		if(user[i].username==t[a].username) {
		var ad= new User(user[i].fullname,user[i].phone,user[i].address,user[i].username,user[i].password,user[i].datesignup,"admin");
		user.splice(i,1);
		break;}
	}
	admin.push(ad);
	localStorage.setItem("admin", JSON.stringify(admin));
	localStorage.setItem("user", JSON.stringify(user));
	alert("Cấp Quyền Admin Thành Công!");
	document.getElementById("xoaSP").style.zIndex='10';
	document.getElementById("xoaSP").style.display='none';
	document.getElementById("xoasanpham").style.display='none';
	hienthi();
}
function DSTaiKhoan()
{
	var user = JSON.parse(localStorage.getItem("user"));
	var admin = JSON.parse(localStorage.getItem("admin"));
	var adminlogin = JSON.parse(localStorage.getItem("adminlogin"));
	var mangTK=[];
	for(var i=1;i<user.length;i++)
	{
		mangTK.push(user[i]);
	}
	for(var i=1;i<admin.length;i++)
	{
		if(admin[i].username!=adminlogin.username) {mangTK.push(admin[i]);}
	}
	return mangTK;
}
function xoaTK(a)
{
	var adminlogin = JSON.parse(localStorage.getItem("adminlogin"));
	if(adminlogin.username=="admin") { 
	var s='';
	s+='<p style="width:100%;text-align:center;font-family:Tahoma;font-size:20px;margin-top:20px;">Bạn có chắc chắn xóa tài khoản này không?</p>';
	s+='<div class="btnxoaSP" onclick="xoaTK2(';
	s+=a;
	s+=');">Có</div>';
	s+='<div class="btnxoaSP" onclick="xoaTK1();">Không</div>';
	document.getElementById("xoasanpham").innerHTML=s;
	document.getElementById("xoaSP").style.zIndex='21';
	document.getElementById("xoaSP").style.display='block';
	document.getElementById("xoasanpham").style.display='block';}
	else { var t=DSTaiKhoan();
	if(t[a].role!="admin") {
	var s='';
	s+='<p style="width:100%;text-align:center;font-family:Tahoma;font-size:20px;margin-top:20px;">Bạn có chắc muốn xóa tài khoản này không?</p>';
	s+='<div class="btnxoaSP" onclick="xoaTK2(';
	s+=a;
	s+=');">Có</div>';
	s+='<div class="btnxoaSP" onclick="xoaTK1();">Không</div>';
	document.getElementById("xoasanpham").innerHTML=s;
	document.getElementById("xoaSP").style.zIndex='21';
	document.getElementById("xoaSP").style.display='block';
	document.getElementById("xoasanpham").style.display='block';
	}
	else alert("Tài khoản này không thể xóa tài khoản Admin khác");
	}
}
function xoaTK1()
{
	document.getElementById("xoaSP").style.zIndex='10';
	document.getElementById("xoaSP").style.display='none';
	document.getElementById("xoasanpham").style.display='none';
}
function xoaTK2(a)
{
	var t=DSTaiKhoan(); 
	var admin = JSON.parse(localStorage.getItem("admin"));
	var user = JSON.parse(localStorage.getItem("user"));
	if(t[a].role=="user") {
	for(var i=0;i<user.length;i++)
	{
		if(t[a].username==user[i].username) {user.splice(i,1);
		break;}
	}
	localStorage.setItem("user", JSON.stringify(user));}
	else {
	for(var i=0;i<admin.length;i++)
	{
		if(t[a].username==admin[i].username) {admin.splice(i,1);
		break;}
	}
	localStorage.setItem("admin", JSON.stringify(admin));
	}
	alert("Xóa Tài Khoản Thành Công!");
	document.getElementById("xoaSP").style.zIndex='10';
	document.getElementById("xoaSP").style.display='none';
	document.getElementById("xoasanpham").style.display='none';
	hienthi();
}
function thongtinTK(a)
{
	var user = DSTaiKhoan(); 
	var s='';
	s+='<div class="close" style="margin-left:92%" onclick="dongxemTK()"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';
    s+='</div>';
	s+='<p style="font-family:Tahoma;font-size:22px;margin-left:33%;color:#FF0000;">Thông Tin Tài Khoản</p>';
	s+='<p class="thongtin1">Họ Và Tên Người Dùng:</p>';
    s+='<p class="thongtin1" style="color:#FF0000">';
	s+=user[a].fullname;
	s+='</p>';
	s+='<p class="thongtin1">Địa Chỉ:</p>';
    s+='<p class="thongtin1" style="color:#FF0000">';
	s+=user[a].address;
	s+='</p>';
	s+='<p class="thongtin1">Số Điện Thoại:</p>';
    s+='<p class="thongtin1" style="color:#FF0000">';
	s+=user[a].phone;
	s+='</p>';
	s+='<p class="thongtin1">Tài Khoản:</p>';
    s+='<p class="thongtin1" style="color:#FF0000">';
	s+=user[a].username;
	s+='</p>';
	s+='<p class="thongtin1">Mật Khẩu:</p>';
    s+='<p class="thongtin1" style="color:#FF0000">';
	s+=user[a].password;
	s+='</p>';
	s+='<p class="thongtin1">Ngày Đăng Kí Tài Khoản:</p>';
    s+='<p class="thongtin1" style="color:#FF0000">';
	s+=user[a].datesignup;
	s+='</p>';
	document.getElementById("xemTK").innerHTML=s;
	document.getElementById("xemTTTK").style.zIndex='21';
	document.getElementById("xemTTTK").style.display='block';
	document.getElementById("xemTK").style.display='block';
}
function thongtinTK1(a)
{
	var user = JSON.parse(localStorage.getItem("searchTK"));
	var s='';
	s+='<div class="close" style="margin-left:92%" onclick="dongxemTK()"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';
    s+='</div>';
	s+='<p style="font-family:Tahoma;font-size:22px;margin-left:33%;color:#FF0000;">Thông Tin Tài Khoản</p>';
	s+='<p class="thongtin1">Họ Và Tên Người Dùng:</p>';
    s+='<p class="thongtin1" style="color:#FF0000">';
	s+=user[a].fullname;
	s+='</p>';
	s+='<p class="thongtin1">Địa Chỉ:</p>';
    s+='<p class="thongtin1" style="color:#FF0000">';
	s+=user[a].address;
	s+='</p>';
	s+='<p class="thongtin1">Số Điện Thoại:</p>';
    s+='<p class="thongtin1" style="color:#FF0000">';
	s+=user[a].phone;
	s+='</p>';
	s+='<p class="thongtin1">Tài Khoản:</p>';
    s+='<p class="thongtin1" style="color:#FF0000">';
	s+=user[a].username;
	s+='</p>';
	s+='<p class="thongtin1">Mật Khẩu:</p>';
    s+='<p class="thongtin1" style="color:#FF0000">';
	s+=user[a].password;
	s+='</p>';
	s+='<p class="thongtin1">Ngày Đăng Kí Tài Khoản:</p>';
    s+='<p class="thongtin1" style="color:#FF0000">';
	s+=user[a].datesignup;
	s+='</p>';
	document.getElementById("xemTK").innerHTML=s;
	document.getElementById("xemTTTK").style.zIndex='21';
	document.getElementById("xemTTTK").style.display='block';
	document.getElementById("xemTK").style.display='block';
}
function dongxemTK()
{
	document.getElementById("xemTTTK").style.zIndex='10';
	document.getElementById("xemTTTK").style.display='none';
	document.getElementById("xemTK").style.display='none';
}
function dongthemSP()
{
	document.getElementById("addSP").style.zIndex='10';
	document.getElementById("add").style.display='none';
	document.getElementById("addSP").style.display='none';
	document.getElementById('NameSP').value='';
	document.getElementById('price').value='';
	document.getElementById('theloai').value='---Loại---';
	document.getElementById('displayImg').innerHTML="";
	document.getElementById('displayImg1').innerHTML="";
	document.getElementById('displayImg2').innerHTML="";
	document.getElementById('upload').value='';
	document.getElementById('upload1').value='';
	document.getElementById('upload2').value='';
}
function dongsuaSP()
{
	document.getElementById("fixSP").style.zIndex='10';
	document.getElementById("fixSP").style.display='none';
	document.getElementById("fix").style.display='none';
	document.getElementById("xemSP").style.display='none';
	document.getElementById("xemTTSP").style.display='none';
	document.getElementById('fixName').value='';
	document.getElementById('fixPrice').value='';
	document.getElementById('fixPriceSale').value='';
	document.getElementById('fixdisplayImg').innerHTML="";
	document.getElementById('fixdisplayImg1').innerHTML="";
	document.getElementById('fixdisplayImg2').innerHTML="";
	document.getElementById('fixupload').value='';
	document.getElementById('fixupload1').value='';
	document.getElementById('fixupload2').value='';
}
function dongxuliDH()
{
	document.getElementById("fixSP").style.zIndex='10';
	document.getElementById("fixSP").style.display='none';
	document.getElementById("fix").style.display='none';
}
function themsanpham()
{
	document.getElementById("addSP").style.zIndex='21';
	document.getElementById("addSP").style.display='block';
	document.getElementById("add").style.display='block';
}
function xoaSP1()
{
	document.getElementById("xoaSP").style.zIndex='10';
	document.getElementById("xoaSP").style.display='none';
	document.getElementById("xoasanpham").style.display='none';
}
function xoaSP2(a)
{
	for(var i=0;i<item.length;i++)
	{
		if(item[i].id==a) { item.splice(i,1);
		break;
		}
	}
	localStorage.setItem("mangSanPhamAdmin", JSON.stringify(item));
	alert("Xóa Sản Phẩm Thành Công!");
	document.getElementById("xoaSP").style.zIndex='10';
	document.getElementById("xoaSP").style.display='none';
	document.getElementById("xoasanpham").style.display='none';
	hienthi();
}
function xulidonhang(a)
{
	var mangHoaDon = JSON.parse(localStorage.getItem("mangHoaDon"));
	var user=JSON.parse(localStorage.getItem("user"));
	var hoadon = mangHoaDon[a];
	for(var i=0;i<user.length;i++)
	{
		if(user[i].username==hoadon.user) { var name=user[i].fullname;
		var address=user[i].address;
		var phone=user[i].phone;
		break;}
	}
	var s='';
		s+='<div class="close" style="margin-left:95%" onclick="dongxuliDH()"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';
        s+='</div>';
		s+='<p style="font-family:Tahoma;font-size:22px;margin-left:40%;color:#FF0000;">Thông Tin Đơn Hàng</p>';
        s+='<div style="float:left; width:50%">';
  			s+='<p class="thongtin">Người Đặt Hàng:</p>';
        	s+='<p class="thongtin" style="color:#FF0000">';
			s+=name;
			s+='</p>';
        	s+='<p class="thongtin">Địa Chỉ:</p>';
        	s+='<p class="thongtin" style="color:#FF0000">';
			s+=address;
			s+='</p>';
         	s+='<p class="thongtin">Số Điện Thoại:</p>';
         	s+='<p class="thongtin" style="color:#FF0000">';
			s+=phone;
			s+='</p>';
        s+='</div>';
        s+='<div style="float:right; width:50%">';
            s+='<p class="thongtin">Mã Đơn Hàng:</p>';
        	s+='<p class="thongtin" style="color:#FF0000">';
			s+=hoadon.idBill;
			s+='</p>';
			s+='<p class="thongtin">Ngày Đặt Hàng:</p>';
        	s+='<p class="thongtin" style="color:#FF0000">';
			s+=hoadon.dateOrder;
			s+='</p>';
			s+='<p class="thongtin">Tổng Tiền:</p>';
        	s+='<p class="thongtin" style="color:#FF0000">';
			s+=formatNumber(hoadon.tongtien);
			s+='</p>';   
        s+='</div>';
		s+='<div style="margin-left: 10%;width:80%;height:20px; margin-top:190px">';
			s+='<div style="float:left; width:15%"><p style=" margin-left:10px"><b>Hình Ảnh</b></p></div>';
			s+='<div style="float:left; width:25%"><p style=" margin-left:12px"><b>Tên Sản Phẩm</b></p></div>';
			s+='<div style="float:left; width:10%"><p style=" margin-left:12px"><b>Size</b></p></div>';
			s+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Giá</b></p></div>';
			s+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Số Lượng</b></p></div>';
			s+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Tổng</b></p></div>';
		s+='</div>';
		s+='</div>';
		s+='<div class="list2">';
		s+=chitietDH(a);
		s+='</div>';
		if(hoadon.orderStatus=="Chưa xử lí") {
		s+='<div class="btnThemMoiSP" style="margin-left:40%; margin-top:10px" onclick="xuli(';
		s+=a;
		s+=');">Xử Lí Đơn Hàng</div>';
		}
		else {s+='<p style="font-family:Tahoma;font-size:20px;margin-left:40%;color:#FF0000;margin-top:20px"><i>Đơn Hàng Đã Được Xử Lí</i></p>';}
	document.getElementById("fix").innerHTML=s;
	document.getElementById("fixSP").style.display='block';
	document.getElementById("fixSP").style.zIndex='21';
	document.getElementById("fix").style.display='block';
}
function xoadonhang(a)
{
	var mangHoaDon = JSON.parse(localStorage.getItem("mangHoaDon"));
	if(mangHoaDon[a].orderStatus!="Chưa xử lí") {
	mangHoaDon.splice(a,1);
	localStorage.setItem("mangHoaDon", JSON.stringify(mangHoaDon));
	hienthi();
	}
	else alert("Không thể xóa đơn hàng vì đơn hàng này chưa được xử lí");
}
function xuli(a)
{
	var mangHoaDon = JSON.parse(localStorage.getItem("mangHoaDon"));
	var user=JSON.parse(localStorage.getItem("user"));
	mangHoaDon[a].orderStatus="Đã xử lí";
	for(var i=0;i<user.length;i++)
	{
		if(user[i].username==mangHoaDon[a].user) { var hoadon=user[i].hoadon;
		break;}
	}
	for(var i=0;i<hoadon.length;i++)
	{
		if(hoadon[i].idBill==mangHoaDon[a].idBill) { hoadon[i].orderStatus="Đã xử lí";
		break;}
	}
	for(var i=0;i<user.length;i++)
	{
		if(user[i].username==mangHoaDon[a].user) { user[i].hoadon=hoadon;
		break;}
	}
	localStorage.setItem("user", JSON.stringify(user));
	localStorage.setItem("mangHoaDon", JSON.stringify(mangHoaDon));
	document.getElementById("fixSP").style.zIndex='10';
	document.getElementById("fixSP").style.display='none';
	document.getElementById("fix").style.display='none';
	alert("Đơn Hàng Đã Được Xử Lí");
	hienthi();
}
function formatNumber(num) { // định dạng giá tiền
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +'₫';
}
function formatNumberb(num) { // định dạng giá tiền
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
function chitietDH(a)
{
	var mangHoaDon = JSON.parse(localStorage.getItem("mangHoaDon"));
	var cacSP=[];
	cacSP=mangHoaDon[a].sanpham;
	var s='';
	var k1='<div class="itemlist">';
	var k2='<div style="float:left; width:15%"><img src="';
	var k3='" width="50" height="50" style="margin-left:15px"/></div>';
	var k4='<div style="float:left; width:25%"><p>';
	var k5='</p></div>';
	var k6='<div style="float:left; width:10%"><p style=" margin-left:20px">';
	var k7='</p></div>';
	var k8='<div style="float:left; width:15%"><p style=" margin-left:5px">';
	var k9='</p></div>';
	var k10='<div style="float:left; width:15%"><p style=" margin-left:40px">';
	var k11='</p></div>';
	var k12='<div style="float:left; width:20%"><p style=" margin-left:12px">';
	var k13='</p></div></div>';
	for(var i=0;i<cacSP.length;i++)
	{
		if(cacSP[i].size!=null && cacSP[i].Promotional_Price!=" ") 
		{s+=k1+k2+cacSP[i].image+k3+k4+cacSP[i].Name+k5+k6+cacSP[i].size+k7+k8+formatNumber(cacSP[i].Promotional_Price)+k9+k10+cacSP[i].sl+k11+k12+formatNumber(cacSP[i].tt)+k13;}
		else if(cacSP[i].size!=null && cacSP[i].Promotional_Price==" ") 
		{s+=k1+k2+cacSP[i].image+k3+k4+cacSP[i].Name+k5+k6+cacSP[i].size+k7+k8+formatNumber(cacSP[i].Normal_Price)+k9+k10+cacSP[i].sl+k11+k12+formatNumber(cacSP[i].tt)+k13;}
		else if(cacSP[i].size==null && cacSP[i].Promotional_Price!=" ") 
	    {s+=k1+k2+cacSP[i].image+k3+k4+cacSP[i].Name+k5+k6+'#'+k7+k8+formatNumber(cacSP[i].Promotional_Price)+k9+k10+cacSP[i].sl+k11+k12+formatNumber(cacSP[i].tt)+k13;}
		else if(cacSP[i].size==null && cacSP[i].Promotional_Price==" ") 
		{s+=k1+k2+cacSP[i].image+k3+k4+cacSP[i].Name+k5+k6+'#'+k7+k8+formatNumber(cacSP[i].Normal_Price)+k9+k10+cacSP[i].sl+k11+k12+formatNumber(cacSP[i].tt)+k13;}
	}
	return s;
}
function xoasanpham(a)
{
	var s='';
	s+='<p style="width:100%;text-align:center;font-family:Tahoma;font-size:20px;margin-top:20px;">Bạn có chắc chắn xóa sản phẩm này không?</p>';
	s+='<div class="btnxoaSP" onclick="xoaSP2(';
	s+=a;
	s+=');">Có</div>';
	s+='<div class="btnxoaSP" onclick="xoaSP1();">Không</div>';
	document.getElementById("xoasanpham").innerHTML=s;
	document.getElementById("xoaSP").style.zIndex='21';
	document.getElementById("xoaSP").style.display='block';
	document.getElementById("xoasanpham").style.display='block';
}

function suasanpham(a)
{
	var s='';
		s+='<div class="close" style="margin-left:95%" onclick="dongsuaSP()"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';
        s+='</div>';
        s+='<div style="float:left; width:50%">';
  			s+='<p class="regisAD">Sửa Giá Tiền</p>';
        	s+='<input type="text" id="fixPrice" class="inputAD" />';
        	s+='<p class="regisAD">Thêm Giá Khuyến Mãi</p>';
        	s+='<input type="text" id="fixPriceSale" class="inputAD" />';
         	s+='<p class="regisAD">Sửa Ảnh Chính:</p>';
         	s+='<input type="file" id="fixupload" name="fixupload" onchange="ImagesFileAsURL(this);" style="margin-left:30px; margin-top:5px">';
         	s+='<div id="fixdisplayImg" style="margin-left:30px; margin-top:5px">';
         	s+='</div>';
			s+='<select class="inputAD" style="width:30%" id="xoaImage"><option>Giữ Ảnh Chính</option><option>Xóa Ảnh Chính</option></select>';
        s+='</div>';
        s+='<div style="float:right; width:50%">';
            s+='<p class="regisAD">Sửa Tên Sản Phẩm</p>';
        	s+='<input type="text" id="fixName" class="inputAD" />';
            s+='<div style="float:left; width:50%">';
                 s+='<p class="regisAD">Sửa Ảnh Phụ 1</p>';
                 s+='<input type="file" id="fixupload1" name="fixupload1" onchange="ImagesFileAsURL(this);" style="margin-left:30px; margin-top:5px">';
                 s+='<div id="fixdisplayImg1" style="margin-left:30px; margin-top:5px">';
                 s+='</div>';
         	s+='</div>';
           	s+='<div style="float:right; width:50%">';
                 s+='<p class="regisAD">Sửa Ảnh Phụ 2</p>';
                 s+='<input type="file" id="fixupload2" name="fixupload2" onchange="ImagesFileAsURL(this);" style="margin-left:30px; margin-top:5px">';
                 s+='<div id="fixdisplayImg2" style="margin-left:30px; margin-top:5px">';
                 s+='</div>';
         	s+='</div>';
			s+='<div style="float:left; width:50%; clear:both">';
				s+='<select class="inputAD" style="width:60%" id="xoaImage1"><option>Giữ Ảnh Phụ 1</option><option>Xóa Ảnh Phụ 1</option></select>';
			s+='</div>';
			s+='<div style="float:right; width:50%">';
				s+='<select class="inputAD" style="width:60%" id="xoaImage2"><option>Giữ Ảnh Phụ 2</option><option>Xóa Ảnh Phụ 2</option></select>';
			s+='</div>';
        s+='</div>';
        s+='<div class="btnThemMoiSP1" onclick="fixSP(';
		s+=a;
		s+=');">Lưu Thay Đổi</div>';
		s+='<div class="btnxemTT" onclick="xemTT(';
		s+=a;
		s+=');">Xem Thông Tin</div>';
	document.getElementById("fix").innerHTML=s;
	document.getElementById("fixSP").style.display='block';
	document.getElementById("fixSP").style.zIndex='21';
	document.getElementById("fix").style.display='block';
}
function xemTT(a)
{
	for(var i=0;i<item.length;i++)
	{
		if(item[i].id==a) { var name =item[i].Name;
		var price= item[i].Normal_Price;
		var pricesale= item[i].Promotional_Price;
		var src=item[i].image;
		var src1=item[i].imageb;
		var src2=item[i].imagec;
		}
	}
	document.getElementById("fix").style.display='none';
	var s='';
		s+='<div class="close" style="margin-left:95%" onclick="dongsuaSP()"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';
        s+='</div>';
		s+='<div style="float:left; width:50%">';
		s+='<p class="regisAD">Ảnh Chính</p>';
		s+='<img src="';
		s+=src;
		s+='" height="250" width="250" style="margin-left:30px; margin-top:5px">';
		s+='<div>';
			s+='<div style="float:left; width:50%">';
                 s+='<p class="regisAD">Ảnh Phụ 1</p>';
				 s+='<img src="';
				 s+=src1;
			     s+='" height="100" width="100" style="margin-left:30px; margin-top:5px">';
         	s+='</div>';
           	s+='<div style="float:right; width:50%">';
                 s+='<p class="regisAD">Ảnh Phụ 2</p>';
				 s+='<img src="';
				 s+=src2;
			     s+='" height="100" width="100" style="margin-left:30px; margin-top:5px">';
         	s+='</div>';
		s+='</div>';
		s+='</div>';
		s+='<div style="float:right; width:50%">';
		s+='<p class="regisAD">Tên Sản Phẩm:</p>';
		s+='<p class="regisAD" style="color:#FF0000">';
		s+=name;
		s+='</p>';
		s+='<p class="regisAD">Giá Tiền:</p>';
		s+='<p class="regisAD" style="color:#FF0000">';
		s+=price;
		s+='</p>';
		s+='<p class="regisAD">Giá Khuyến Mãi:</p>';
		s+='<p class="regisAD" style="color:#FF0000">';
		s+=pricesale;
		s+='</p>';
		s+='</div>';
		s+='<div class="btnThemMoiSP1" style="left:40%" onclick="quaylai();">Quay Lại</div>';
	document.getElementById("xemSP").innerHTML=s;
	document.getElementById("xemTTSP").style.display='block';
	document.getElementById("xemTTSP").style.zIndex='21';
	document.getElementById("xemSP").style.display='block';
}
function quaylai()
{
	document.getElementById("fix").style.display='block';
	document.getElementById("xemTTSP").style.display='none';
	document.getElementById("xemTTSP").style.zIndex='10';
	document.getElementById("xemSP").style.display='none';
}
function ImagesFileAsURL(obj)
{
	var id=obj.id;
	var fileSelected = document.getElementById(id).files;
	if(fileSelected.length>0)
	{
		var fileToLoad = fileSelected[0];
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoaderEvent){
			var srcData = fileLoaderEvent.target.result;
			var newImage = document.createElement('img');
			newImage.src= srcData;
			var s=newImage.outerHTML;
			var str = s.split('"');
			str.pop();
			if(id=='upload') {var t=' width="200" height="200">';}
				else {var t=' width="100" height="100">';}
			str.push(t);
			var photo=str[0]+'"'+str[1]+'"'+str[2];
			if(id=='upload') document.getElementById('displayImg').innerHTML= photo;
				else if(id=='upload1') document.getElementById('displayImg1').innerHTML= photo;
					else if(id=='upload2') document.getElementById('displayImg2').innerHTML= photo;
						else if(id=='fixupload') document.getElementById('fixdisplayImg').innerHTML= photo;	
							else if(id=='fixupload1') document.getElementById('fixdisplayImg1').innerHTML= photo;
								else if(id=='fixupload2') document.getElementById('fixdisplayImg2').innerHTML= photo;
	}
	}
	fileReader.readAsDataURL(fileToLoad);
}
function capnhatSP()
{
	document.getElementById("addSP").style.display='none';
	var name=document.getElementById('NameSP').value;
	var price=document.getElementById('price').value;
	var image=document.getElementById('upload').value;
	var image1=document.getElementById('upload1').value;
	var image2=document.getElementById('upload2').value;
	var theloai=document.getElementById('theloai').value;
	if (name == "") {
		alert('Bạn Chưa Nhập Tên Sản Phẩm');
		return false
	}
	if (price == "") {
		alert('Bạn Chưa Nhập Giá Sản Phẩm');
		return false
	}
	if (isNaN(price) == true ) {
		alert('Vui lòng nhập số');
		return false
	}
	price=parseInt(price);
	var id=item.length+1;
	var itemID,idimage1='',idimage2='',idimage3='',priceid1='',priceid2='',size,src,src1=" ",src2=" ";
	idimage1+=id+'-a';
	idimage2+=id+'-b';
	idimage3+=id+'-c';
	priceid1+=id+'a';
	priceid2+=id+'b';
	if(theloai=='Áo Khoác') {itemID='ao_khoac';size='S';src='image/A_ao/Ao_khoac/';}
	if(theloai=='Áo Thun') {itemID='ao_thun';size='S';src='image/A_ao/Ao_thun/';}
	if(theloai=='Áo Sơ Mi') {itemID='ao_somi';size='S';src='image/A_ao/Ao_somi/';}
	if(theloai=='Giày Adidas') {itemID='giay_adidas';size=36;src='image/A_giay/';}
	if(theloai=='Giày Nike') {itemID='giay_nike';size=36;src='image/A_giay/';}
	if(theloai=='Giày Gucci') {itemID='giay_gucci';size=36;src='image/A_giay/';}
	if(theloai=='Quần Jean') {itemID='quan_jean';size=36;src='image/A_quan/';}
	if(theloai=='Quần Tây') {itemID='quan_tay';size=36;src='image/A_quan/';}
	if(theloai=='Quần Jogger') {itemID='quan_jogger';size=36;src='image/A_quan/';}
	if(theloai=='Quần Kaki') {itemID='quan_kaki';size=36;src='image/A_quan/';}
	if(theloai=='Ví Da') {itemID='phukien_vida';size='';src='image/A_phukien/vi_da/';}
	if(theloai=='Thắt Lưng') {itemID='phukien_thatlung';size='';src='image/A_phukien/thac_lung/';}
	if(theloai=='Đồng Hồ') {itemID='phukien_dongho';size='';src='image/A_phukien/dong_ho/';}
	var photo;
	if(image1!='') {photo=image1.split('\\'); src1=src+photo[2];}
	if(image2!='') {photo=image2.split('\\'); src2=src+photo[2];}
	photo=image.split('\\');
	src+=photo[2];
	if(itemID=='phukien_vida'||itemID=='phukien_thatlung'||itemID=='phukien_dongho')
	{var SP=new sanpham(id,itemID,src,idimage1,src,idimage2,src1,idimage3,src2,name,price,priceid1,priceid2);}
	else {var SP=new sanpham(id,itemID,src,idimage1,src,idimage2,src1,idimage3,src2,name,price,priceid1,priceid2,size);}
	item.push(SP);
	localStorage.setItem("mangSanPhamAdmin", JSON.stringify(item));
	alert("Thêm Sản Phẩm Thành Công!");
	dongthemSP();
	hienthi();
	return true;
}
function fixSP(a)
{
	var name=document.getElementById('fixName').value;
	var price=document.getElementById('fixPrice').value;
	var pricesale=document.getElementById('fixPriceSale').value;
	var image=document.getElementById('fixupload').value;
	var image1=document.getElementById('fixupload1').value;
	var image2=document.getElementById('fixupload2').value;
	var xoaImage=document.getElementById('xoaImage').value;
	var xoaImage1=document.getElementById('xoaImage1').value;
	var xoaImage2=document.getElementById('xoaImage2').value;
	if (isNaN(price) == true || price.charAt(0)==' ' ||  price.charAt(price.length-1)==' '	) {
		alert('Vui lòng nhập số');
		return false
	}
	if (isNaN(pricesale) == true || pricesale.charAt(0)==' ' || pricesale.charAt(pricesale.length-1)==' ' ) {
		alert('Vui lòng nhập số');
		return false
	}
	var src='';
	for(var i=0;i<item.length;i++)
	{
		if(item[i].id==a)
		{
			if(item[i].style_ItemID=='ao_khoac') {src='image/A_ao/Ao_khoac/';}
			if(item[i].style_ItemID=='ao_thun') {src='image/A_ao/Ao_thun/';}
			if(item[i].style_ItemID=='ao_somi') {src='image/A_ao/Ao_somi/';}
			if(item[i].style_ItemID=='giay_adidas'||item[i].style_ItemID=='giay_nike'||item[i].style_ItemID=='giay_gucci') {src='image/A_giay/';}
			if(item[i].style_ItemID=='quan_jean'||item[i].style_ItemID=='quan_tay'||item[i].style_ItemID=='quan_jogger'||item[i].style_ItemID=='quan_kaki')
			{src='image/A_quan/';}
			if(item[i].style_ItemID=='phukien_vida') {src='image/A_phukien/vi_da/';}
			if(item[i].style_ItemID=='phukien_thatlung') {src='image/A_phukien/thac_lung/';}
			if(item[i].style_ItemID=='phukien_dongho') {src='image/A_phukien/dong_ho/';}
			if(name!="") {item[i].Name=name;}
			if(price!="") {item[i].Normal_Price=parseInt(price);item[i].tt=parseInt(price);}
			if(pricesale!="") {item[i].Promotional_Price=parseInt(pricesale);item[i].tt=parseInt(pricesale);}
			if(image!="") { var t=image.split('\\');
				item[i].image=src+t[2];
				item[i].imagea=src+t[2];
			}
			if(image1!="") {var t1=image1.split('\\');item[i].imageb=src+t1[2];}
			if(image2!="") {var t2=image2.split('\\');item[i].imagec=src+t2[2];}
			if(xoaImage=='Xóa Ảnh Chính') {item[i].image=" ";item[i].imagea=" ";}
			if(xoaImage1=='Xóa Ảnh Phụ 1') {item[i].imageb=" ";}
			if(xoaImage2=='Xóa Ảnh Phụ 2') {item[i].imagec=" ";}
			break;
		}
	}
	localStorage.setItem("mangSanPhamAdmin", JSON.stringify(item));
	alert("Sửa Sản Phẩm Thành Công!");
	dongsuaSP();
	hienthi();
	return true;
}

