// JavaScript Document
var index = 1;
changeImage = function () {
	var imgs = ["image/image_SP/QC1.png", "image/image_SP/QC2.png", "image/image_SP/QC3.png", "image/image_SP/QC4.png","image/image_SP/QC5.jpg"];
	document.getElementById("img").src = imgs[index];
	index++;
	if (index == 5) {
		index = 0;
	}
}
setInterval(changeImage, 2000);

function login1(){
	document.getElementById("login").style.display = 'block';
	document.getElementById("registration").style.display = 'none';
	document.getElementById("frame_login").style.display = 'block';
}

function login2(){
	document.getElementById("login").style.display = 'none';
	document.getElementById("registration").style.display = 'none';
	document.getElementById("frame_login").style.display = 'none';
}

document.getElementById("close_login").onclick = function () {
	document.getElementById("login").style.display = 'none';
	document.getElementById("frame_login").style.display = 'none';
	document.getElementById("registration").style.display = 'none';	
};

document.getElementById("click_login").onclick = function () {
	document.getElementById("login").style.display = 'block';
	document.getElementById("frame_login").style.display = 'block';
	document.getElementById("registration").style.display = 'none';
};

document.getElementById("close_signup").onclick = function () {
	document.getElementById("login").style.display = 'none';
	document.getElementById("frame_login").style.display = 'none';
	document.getElementById("registration").style.display = 'none';
};


document.getElementById("DK").onclick = function () {
	document.getElementById("frame_login").style.display = 'none';
	document.getElementById("registration").style.display = 'block';
};
document.getElementById("return_login").onclick = function () {
	document.getElementById("registration").style.display = 'none';
	document.getElementById("frame_login").style.display = 'block';
};

var	fullname = document.getElementById("name");
var phone = document.getElementById("phone");
var address = document.getElementById("address");
var user_name = document.getElementById("user_name");
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

  function userNameValidator(value) {
	if (value === '') {
		return{
			field: 'user_name',
			message: 'Bạn chưa nhập tên đăng nhập'
		}
	}
	check = 0;
		var manguser= JSON.parse(localStorage.getItem("user"));
		manguser.forEach(function(item) {
			if(item.username == value) { 
				check = 1;
			}
		})
		if (check == 1) {
			return{
				field: 'user_name',
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
	var dangnhapUs=0;
	var valueMK = 0;
	var valueTK = 0;
	var  arrAcc = DSTaiKhoan();

	var manguser= JSON.parse(localStorage.getItem("user"));
	var arrAdmin= JSON.parse(localStorage.getItem("admin"));
	//user
	for(var i=0;i<manguser.length;i++)
	{
		if(manguser[i].username==value1 && manguser[i].password==value2) 
		{
			var name= manguser[i].fullname;
			localStorage.setItem("userlogin", JSON.stringify(manguser[i]));
			var accLogin= new Login(manguser[i].username, manguser[i].password,[]);
			var accLogin=[accLogin];
			localStorage.setItem("accLogin", JSON.stringify(accLogin));
	
			dangnhapUs = 1; 
			valueMK = 1;
			valueTK = 1;	
			break;
		}
		if (manguser[i].username == value1 &&  manguser[i].passwords !== value2) {
			valueTK = 1;
		}
		if (manguser[i].username == value1 && manguser[i].passwords == value2) {
			valueMK = 1;
			break;
		}
	}

	
	if(dangnhapUs == 1) {
	return false
	} else if(dangnhapUs == 0) {
	//admin
	for(var i=0;i<arrAdmin.length;i++)
	{
		if(arrAdmin[i].username==value1 && arrAdmin[i].password==value2) 
		{
			var name= arrAdmin[i].fullname;
			localStorage.setItem("userlogin", JSON.stringify(arrAdmin[i]));
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

	if(dangnhapAd == 1)
	return false
}
}

function resetDom() {
	fullname.classList.remove('form__invalid');
	phone.classList.remove('form__invalid');
	address.classList.remove('form__invalid');
	user_name.classList.remove('form__invalid');
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
	case 'user_name':
		user_name.classList.add('form__invalid');
		user_name.insertAdjacentElement('afterend', element);
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
	user_name.value = '';
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
		userNameValidator(user_name.value),
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
			userName: user_name.value,
			password: password.value,
			confirmPassword: re_password.value
		});
		


		customAlert('Bạn đã đăng ký thành công!','success');
		document.getElementById("registration").style.display = 'none';
		document.getElementById("frame_login").style.display = 'block';
		var today = new Date();
		var datesignup= today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
		var user= new User(fullname.value,phone.value,address.value,user_name.value,password.value,datesignup,"user",[]);
		console.log(user);
		var manguser= JSON.parse(localStorage.getItem("user"));
		manguser.push(user);
		localStorage.setItem("user", JSON.stringify(manguser));
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
	
	document.getElementById("login").style.display = 'none';

	document.getElementById("click_login").innerHTML='<img src="image/2x/baseline_perm_identity_black_18dp.png" style="float:left; margin-top:25px"/>'+'<div class="username">'+name+'<div class="logout" onclick="logout();">Logout</div></div>';

	resetInput();
	return true;
	}
	
})




function DSTaiKhoan()
{
	var user = JSON.parse(localStorage.getItem("user"));
	var admin = JSON.parse(localStorage.getItem("admin"));
	// var adminlogin = JSON.parse(localStorage.getItem("adminlogin"));
	var mangTK=[];
	for(var i=1;i<user.length;i++)
	{
		mangTK.push(user[i]);
	}
	for(var i=0;i<admin.length;i++)
	{
		mangTK.push(admin[i]);
	}
	return mangTK;
}

function checkTrangThai() {
	// addArr()
	// var arrAdmin = JSON.parse(localStorage.getItem("admin"));
	// var arrUser = JSON.parse(localStorage.getItem("user"));

	// var userlogin = JSON.parse(localStorage.getItem("userlogin"));
	
	var accLogin = JSON.parse(localStorage.getItem("accLogin"));
	
	var  arrAcc = DSTaiKhoan();
	console.log(arrAcc);

	
	var checkTT;
	// var checkTT1 ;
	
	

	for (var i = 0; i < arrAcc.length; i++) {

		if(accLogin[0].username == arrAcc[i].username  && accLogin[0].password == arrAcc[i].password && arrAcc[i].role == "admin") {
			checkTT = 1;
			// checkTT1 = 1;
			// alert(arrAdmin[i].username + arrAdmin[i].password)
			break;
		}  
}
	
	
if (checkTT == 1) {
	
	trangthaiDangNhapAd();
	
		// localStorage.removeItem("accLogin");

}
	else {
		trangthaiDangNhapUs();
	}
// if (checkTT == 0) {
// 	trangthaiDangNhapUs();
// 		// localStorage.removeItem("accLogin");

// }
// 	else if(checkTT == 1) {
// 		trangthaiDangNhapAd();
// 	}

	 
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
function User(fullname,phone,address,username,password,datesignup,role,hoadon)
{
	this.fullname=fullname;
	this.phone=phone;
	this.address=address;
	this.username=username;
	this.password=password;
	this.datesignup=datesignup;
	this.role=role;
	this.hoadon=hoadon;
}

function Login(username, password) {
	this.username = username;
	this.password = password;
}


function publicUser()	
{
	if(localStorage.getItem("user")==null){
	var admin= new User("Nguyễn Thiện Trí","0931853843","273 An Dương Vương, P3, Quận 5, TPHCM","tri","admin","16-11-2020","user");
	var user=[admin];
	localStorage.setItem("user", JSON.stringify(user));}
}

function publicAdmin()	
{
	if(localStorage.getItem("admin")==null){
	var ad= new User("Nguyễn Thiện Trí","0931853843","273 An Dương Vương, P3, Quận 5, TPHCM","admin","admin","16-11-2020","admin");
	var admin=[ad];
	localStorage.setItem("admin", JSON.stringify(admin));}
}

function publicAccLogin()	
{
	if(localStorage.getItem("accLogin")==null){
	var acc = new Login("username","password")
	var accLogin = [acc]
	localStorage.setItem("accLogin", JSON.stringify(accLogin));}
}

// function publicUsLogin()	
// {
// 	if(localStorage.getItem("userlogin")==null){
// 	var us = new User("Nguyễn Thiện Trí","0931853843","273 An Dương Vương, P3, Quận 5, TPHCM","admin","admin","16-11-2020","admin");
// 	var usLogin = [us]
// 	localStorage.setItem("userlogin", JSON.stringify(usLogin));}
// }


function trangthaiDangNhapAd()
{
	if(localStorage.getItem("userlogin")!=null) {
			var user= JSON.parse(localStorage.getItem("userlogin"));	
			var name= user.fullname;
			document.getElementById("asd").innerHTML='<a id="click_login" onclick="login2();"><img src="image/2x/baseline_perm_identity_black_18dp.png" />Đăng Nhập</a> '
			var s='<img src="image/2x/baseline_perm_identity_black_18dp.png" style="float:left; margin-top:25px"/>'+
					'<div >'+
						'<div class="function_bot_user">'+
							'<ul class="userName"  id = "admin" style = "display: block; font-size: 17px;">'+
								'<li style = "font-size: 17px; font-family:Tahoma;">'+name+
									'<ul class="dropdown_user">'+
										'<li><a href="Admin.html">Admin</a></li>'+
										// '<li><a href="index_test.html">Người Dùng</a></li>'+
										'<li><a href="index_test.html" onclick="logoutAd();" style="cursor:pointer;">Đăng Xuất</a></li>'+
									'</ul>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</div>';
			document.getElementById("click_login").innerHTML=s;

	} else  document.getElementById("asd").innerHTML='<a id="click_login" onclick="login1();"><img src="image/2x/baseline_perm_identity_black_18dp.png" />Đăng Nhập</a> ';
}

function trangthaiDangNhapUs()
{
	if(localStorage.getItem("userlogin")!=null) {
			var user= JSON.parse(localStorage.getItem("userlogin"));	
			var name= user.fullname;
			document.getElementById("asd").innerHTML='<a id="click_login" onclick="login2();"><img src="image/2x/baseline_perm_identity_black_18dp.png" />Đăng Nhập</a> '

			var a ='<img src="image/2x/baseline_perm_identity_black_18dp.png" style="float:left; margin-top:25px"/>'+
					'<div >'+
						'<div class="function_bot_user">'+
							'<ul class="userName" id = "user" style = "display: block; font-size: 17px;">'+
								'<li style = "font-size: 17px;font-family:Tahoma;">'+name+
									'<ul class="dropdown_user">'+
										'<li><a href="index_test.html" onclick="logoutUs();" style="cursor:pointer;">Đăng Xuất</a></li>'+
									'</ul>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</div>';
			document.getElementById("click_login").innerHTML = a;
	} else  document.getElementById("asd").innerHTML='<a id="click_login" onclick="login1();"><img src="image/2x/baseline_perm_identity_black_18dp.png" />Đăng Nhập</a> ';

}


function logoutAd(){
	localStorage.removeItem("userlogin");
	localStorage.removeItem("xuatDSdonhang");
	localStorage.removeItem("accLogin");
	 trangthaiDangNhapAd();
	 hienthi();
}

function logoutUs(){
	localStorage.removeItem("userlogin");
	localStorage.removeItem("xuatDSdonhang");
	localStorage.removeItem("accLogin");
	 trangthaiDangNhapUs();
	 hienthi();
}


function laySP()
{
	if(localStorage.getItem("mangSanPhamAdmin")!=null) item=JSON.parse(localStorage.getItem("mangSanPhamAdmin"));
	localStorage.setItem("mangSanPhamUser", JSON.stringify(item));
}

var item = [
	{ id: 1  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac1_1.jpg"        , ida: "1-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac1_1.jpg"        , idb: "1-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac1_2.jpg"        , idc: "1-c"  , imagec:"image/A_ao/Ao_khoac/aokhoac1_3.jpg"        , Name:"Áo Khoác Vải Đơn Giản E06"                                                 , Normal_Price:425000   , Normal_Price_id: "1a"  , Promotional_Price:271001     , Promotional_Price_id: "1b"  , sl:1 , size:"S" , tt:425000   },
	{ id: 2  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac2_1.jpg"        , ida: "2-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac2_1.jpg"        , idb: "2-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac2_2.jpg"        , idc: "2-c"  , imagec:" "                                         , Name:"Áo Khoác Thun Đơn Giản C01"                                                , Normal_Price:349000   , Normal_Price_id: "2a"  , Promotional_Price:" "      , Promotional_Price_id: "2b"  , sl:1 , size:"S" , tt:349000   },
	{ id: 3  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac3_1.jpg"        , ida: "3-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac3_1.jpg"        , idb: "3-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac3_2.jpg"        , idc: "3-c"  , imagec:" "                                         , Name:"Áo Khoác Vải Đơn Giản L02"                                                 , Normal_Price:399000   , Normal_Price_id: "3a"  , Promotional_Price:" "      , Promotional_Price_id: "3b"  , sl:1 , size:"S" , tt:399000   },
	{ id: 4  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac4_1.jpg"        , ida: "4-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac4_1.jpg"        , idb: "4-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac4_2.jpg"        , idc: "4-c"  , imagec:"image/A_ao/Ao_khoac/aokhoac4_3.jpg"        , Name:"Áo Khoác Nỉ Có Nón AKN0175"                                                , Normal_Price:245000   , Normal_Price_id: "4a"  , Promotional_Price:" "      , Promotional_Price_id: "4b"  , sl:1 , size:"S" , tt:245000   },
	{ id: 5  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac5_1.jpg"        , ida: "5-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac5_1.jpg"        , idb: "5-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac5_2.jpg"        , idc: "5-c"  , imagec:" "                                         , Name:"Áo Khoác Dù Đơn Giản F03"                                                  , Normal_Price:299000   , Normal_Price_id: "5a"  , Promotional_Price:" "      , Promotional_Price_id: "5b"  , sl:1 , size:"S" , tt:299000   },
	{ id: 6  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac6_1.jpg"        , ida: "6-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac6_1.jpg"        , idb: "6-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac6_2.jpg"        , idc: "6-c"  , imagec:" "                                         , Name:"Áo Khoác Dù Just Men"                                                      , Normal_Price:600000   , Normal_Price_id: "6a"  , Promotional_Price:" "      , Promotional_Price_id: "6b"  , sl:1 , size:"S" , tt:600000   },
	{ id: 7  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac7_1.jpg"        , ida: "7-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac7_1.jpg"        , idb: "7-b"  , imageb:"image/A_ao/Ao_khoac/aokhoac7_2.jpg"        , idc: "7-c"  , imagec:" "                                         , Name:"Áo Khoác Dù Thời Trang Windbreaker Neochic"                                , Normal_Price:489000   , Normal_Price_id: "7a"  , Promotional_Price:299000   , Promotional_Price_id: "7b"  , sl:1 , size:"S" , tt:299000  },
	{ id: 8  , style_ItemID: "ao_khoac"         , image: "image/A_ao/Ao_khoac/aokhoac8_1.jpg"        , ida: "8-a"  , imagea:"image/A_ao/Ao_khoac/aokhoac8_1.jpg"        , idb: "8-b"  , imageb:" "                                         , idc: "8-c"  , imagec:" "                                         , Name:"ÁO KHOÁC DÙ 2 LỚP BIG SIZE BS1624"                                         , Normal_Price:565000   , Normal_Price_id: "8a"  , Promotional_Price:" "      , Promotional_Price_id: "8b"  , sl:1 , size:"S" , tt:565000   },
	{ id: 9  , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi1_1.jpg"          , ida: "9-a"  , imagea:"image/A_ao/Ao_somi/aosomi1_1.jpg"          , idb: "9-b"  , imageb:"image/A_ao/Ao_somi/aosomi1_2.jpg"          , idc: "9-c"  , imagec:"image/A_ao/Ao_somi/aosomi1_3.jpg"          , Name:"Áo Sơ Mi Nam Trắng Trơn TRANGBE99 (Trắng Bẻ)"                              , Normal_Price:220000   , Normal_Price_id: "9a"  , Promotional_Price:160000    , Promotional_Price_id: "9b"  , sl:1 , size:"S" , tt:160000   },
	{ id: 10 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi2_1.jpg"          , ida: "10-a" , imagea:"image/A_ao/Ao_somi/aosomi2_1.jpg"          , idb: "10-b" , imageb:"image/A_ao/Ao_somi/aosomi2_2.jpg"          , idc: "10-c" , imagec:" "                                         , Name:"Áo sơ mi nam hàng hiệu cao cấp ARMANI"                                     , Normal_Price:6084000  , Normal_Price_id: "10a" , Promotional_Price:3285360  , Promotional_Price_id: "10b" , sl:1 , size:"S" , tt:3285360  },
	{ id: 11 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi3_1.jpg"          , ida: "11-a" , imagea:"image/A_ao/Ao_somi/aosomi3_1.jpg"          , idb: "11-b" , imageb:"image/A_ao/Ao_somi/aosomi3_2.jpg"          , idc: "11-c" , imagec:"image/A_ao/Ao_somi/aosomi3_3.jpg"          , Name:"Áo sơ mi SOO Thiết Kế B1KM19"                                              , Normal_Price:285000   , Normal_Price_id: "11a" , Promotional_Price:142500   , Promotional_Price_id: "11b" , sl:1 , size:"S" , tt:142500    },
	{ id: 12 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi4_1.jpg"          , ida: "12-a" , imagea:"image/A_ao/Ao_somi/aosomi4_1.jpg"          , idb: "12-b" , imageb:"image/A_ao/Ao_somi/aosomi4_2.jpg"          , idc: "12-c" , imagec:" "                                         , Name:"Áo sơ mi du lịch nam caro cao cấp (AXH-146)"                               , Normal_Price:285000   , Normal_Price_id: "12a" , Promotional_Price:265000   , Promotional_Price_id: "12b" , sl:1 , size:"S" , tt:265000   },
	{ id: 13 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi5_1.jpg"          , ida: "13-a" , imagea:"image/A_ao/Ao_somi/aosomi5_1.jpg"          , idb: "13-b" , imageb:"image/A_ao/Ao_somi/aosomi5_2.jpg"          , idc: "13-c" , imagec:"image/A_ao/Ao_somi/aosomi5_3.jpg"          , Name:"Áo SM JustMen Trơn Tay Dài"                                                , Normal_Price:380000   , Normal_Price_id: "13a" , Promotional_Price:" "      , Promotional_Price_id: "13b" , sl:1 , size:"S" , tt:380000   },
	{ id: 14 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi6_1.jpg"          , ida: "14-a" , imagea:"image/A_ao/Ao_somi/aosomi6_1.jpg"          , idb: "14-b" , imageb:"image/A_ao/Ao_somi/aosomi6_2.jpg"          , idc: "14-c" , imagec:" "                                         , Name:"Áo Sơ Mi Nam Dài Tay KOJIBA - Màu Đen Trơn"                                , Normal_Price:179000   , Normal_Price_id: "14a" , Promotional_Price:" "      , Promotional_Price_id: "14b" , sl:1 , size:"S" , tt:179000   },
	{ id: 15 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi7_1.jpg"          , ida: "15-a" , imagea:"image/A_ao/Ao_somi/aosomi7_1.jpg"          , idb: "15-b" , imageb:" "                                         , idc: "15-c" , imagec:" "                                         , Name:"Áo Sơ Mi Đen Trụ SMD0008"                                                  , Normal_Price:175000   , Normal_Price_id: "15a" , Promotional_Price:135000   , Promotional_Price_id: "15b" , sl:1 , size:"S" , tt:135000    },
	{ id: 16 , style_ItemID: "ao_somi"          , image: "image/A_ao/Ao_somi/aosomi8_1.jpg"          , ida: "16-a" , imagea:"image/A_ao/Ao_somi/aosomi8_1.jpg"          , idb: "16-b" , imageb:"image/A_ao/Ao_somi/aosomi8_2.jpg"          , idc: "16-c" , imagec:" "                                         , Name:"Áo Sơ Mi Đơn Giản B1KM12"                                                  , Normal_Price:286000   , Normal_Price_id: "16a" , Promotional_Price:" "      , Promotional_Price_id: "16b" , sl:1 , size:"S" , tt:286000   },
	{ id: 17 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun1_1.jpg"          , ida: "17-a" , imagea:"image/A_ao/Ao_thun/aothun1_1.jpg"          , idb: "17-b" , imageb:"image/A_ao/Ao_thun/aothun1_2.jpg"          , idc: "17-c" , imagec:"image/A_ao/Ao_thun/aothun1_3.jpg"          , Name:"Áo Thun Đơn Giản BF01"                                                     , Normal_Price:150000   , Normal_Price_id: "17a" , Promotional_Price:" "      , Promotional_Price_id: "17b" , sl:1 , size:"S" , tt:150000   },
	{ id: 18 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun2_1.jpg"          , ida: "18-a" , imagea:"image/A_ao/Ao_thun/aothun2_1.jpg"          , idb: "18-b" , imageb:"image/A_ao/Ao_thun/aothun2_2.jpg"          , idc: "18-c" , imagec:"image/A_ao/Ao_thun/aothun2_3.jpg"          , Name:"Áo thun nam hàng hiệu cao cấp SAINT LAURENT"                               , Normal_Price:10257000 , Normal_Price_id: "18a" , Promotional_Price:5538780  , Promotional_Price_id: "18b" , sl:1 , size:"S" , tt:5538780 },
	{ id: 19 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun3_1.jpg"          , ida: "19-a" , imagea:"image/A_ao/Ao_thun/aothun3_1.jpg"          , idb: "19-b" , imageb:"image/A_ao/Ao_thun/aothun3_2.jpg"          , idc: "19-c" , imagec:"image/A_ao/Ao_thun/aothun3_3.jpg"          , Name:"Áo Thun Đơn Giản BE01"                                                     , Normal_Price:150000   , Normal_Price_id: "19a" , Promotional_Price:" "      , Promotional_Price_id: "19b" , sl:1 , size:"S" , tt:150000   },
	{ id: 20 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun4_1.jpg"          , ida: "20-a" , imagea:"image/A_ao/Ao_thun/aothun4_1.jpg"          , idb: "20-b" , imageb:"image/A_ao/Ao_thun/aothun4_2.jpg"          , idc: "20-c" , imagec:"image/A_ao/Ao_thun/aothun4_3.jpg"          , Name:"Áo Thun Đơn Giản J01"                                                      , Normal_Price:185000   , Normal_Price_id: "20a" , Promotional_Price:" "      , Promotional_Price_id: "20b" , sl:1 , size:"S" , tt:185000   },
	{ id: 21 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun5_1.jpg"          , ida: "21-a" , imagea:"image/A_ao/Ao_thun/aothun5_1.jpg"          , idb: "21-b" , imageb:"image/A_ao/Ao_thun/aothun5_2.jpg"          , idc: "21-c" , imagec:" "                                         , Name:"Áo Thun Nam Unisex thiết kế hình trơn"                                     , Normal_Price:249000   , Normal_Price_id: "21a" , Promotional_Price:150000    , Promotional_Price_id: "21b" , sl:1 , size:"S" , tt:150000   },
	{ id: 22 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun6_1.jpg"          , ida: "22-a" , imagea:"image/A_ao/Ao_thun/aothun6_1.jpg"          , idb: "22-b" , imageb:"image/A_ao/Ao_thun/aothun6_2.jpg"          , idc: "22-c" , imagec:" "                                         , Name:"Áo Thun Đơn Giản E13"                                                      , Normal_Price:150000   , Normal_Price_id: "22a" , Promotional_Price:" "      , Promotional_Price_id: "22b" , sl:1 , size:"S" , tt:150000   },
	{ id: 23 , style_ItemID: "ao_thun"          , image: "image/A_ao/Ao_thun/aothun7_1.jpg"          , ida: "23-a" , imagea:"image/A_ao/Ao_thun/aothun7_1.jpg"          , idb: "23-b" , imageb:" "                                         , idc: "23-c" , imagec:" "                                         , Name:"Áo Thun ValKnut Ver1"                                                      , Normal_Price:99000    , Normal_Price_id: "23a" , Promotional_Price:" "      , Promotional_Price_id: "23b" , sl:1 , size:"S" , tt:99000    },
	{ id: 24 , style_ItemID: "giay_adidas"      , image: "image/A_giay/giay1_1.jpg"                  , ida: "24-a" , imagea:"image/A_giay/giay1_1.jpg"                  , idb: "24-b" , imageb:"image/A_giay/giay1_2.jpg"                  , idc: "24-c" , imagec:"image/A_giay/giay1_3.jpg"                  , Name:"Giày adidas Supperstar"                                                    , Normal_Price:2400000  , Normal_Price_id: "24a" , Promotional_Price:" "      , Promotional_Price_id: "24b" , sl:1 , size:36  , tt:2400000  },
	{ id: 25 , style_ItemID: "giay_adidas"      , image: "image/A_giay/giay2_1.jpg"                  , ida: "25-a" , imagea:"image/A_giay/giay2_1.jpg"                  , idb: "25-b" , imageb:"image/A_giay/giay2_2.jpg"                  , idc: "25-c" , imagec:"image/A_giay/giay2_3.jpg"                  , Name:"Giày adidas Duramo SL"                                                     , Normal_Price:1500000  , Normal_Price_id: "25a" , Promotional_Price:" "      , Promotional_Price_id: "25b" , sl:1 , size:36  , tt:1500000  },
	{ id: 26 , style_ItemID: "giay_adidas"      , image: "image/A_giay/giay3_1.jpg"                  , ida: "26-a" , imagea:"image/A_giay/giay3_1.jpg"                  , idb: "26-b" , imageb:"image/A_giay/giay3_2.jpg"                  , idc: "26-c" , imagec:"image/A_giay/giay3_3.jpg"                  , Name:"Giày adidas Ultraboost"                                                    , Normal_Price:4200000  , Normal_Price_id: "26a" , Promotional_Price:" "      , Promotional_Price_id: "26b" , sl:1 , size:36  , tt:4200000  },
	{ id: 27 , style_ItemID: "giay_adidas"      , image: "image/A_giay/giay4_1.jpg"                  , ida: "27-a" , imagea:"image/A_giay/giay4_1.jpg"                  , idb: "27-b" , imageb:"image/A_giay/giay4_2.jpg"                  , idc: "27-c" , imagec:"image/A_giay/giay4_3.jpg"                  , Name:"Giày adidas Stan Smith"                                                    , Normal_Price:2300000  , Normal_Price_id: "27a" , Promotional_Price:" "      , Promotional_Price_id: "27b" , sl:1 , size:36  , tt:2300000  },
	{ id: 28 , style_ItemID: "giay_nike"        , image: "image/A_giay/giay5_1.jpg"                  , ida: "28-a" , imagea:"image/A_giay/giay5_1.jpg"                  , idb: "28-b" , imageb:"image/A_giay/giay5_2.jpg"                  , idc: "28-c" , imagec:"image/A_giay/giay5_3.jpg"                  , Name:"Giày NIKE AIR FORCE 1 (314192-117)"                                        , Normal_Price:2500000  , Normal_Price_id: "28a" , Promotional_Price:1770000  , Promotional_Price_id: "28b" , sl:1 , size:36  , tt:1770000  },
	{ id: 29 , style_ItemID: "giay_nike"        , image: "image/A_giay/giay6_1.jpg"                  , ida: "29-a" , imagea:"image/A_giay/giay6_1.jpg"                  , idb: "29-b" , imageb:"image/A_giay/giay6_2.jpg"                  , idc: "29-c" , imagec:"image/A_giay/giay6_3.jpg"                  , Name:"Giày Nike Air Force 1 Shadow Kim Cương REP 1:1"                            , Normal_Price:1500000  , Normal_Price_id: "29a" , Promotional_Price:" "      , Promotional_Price_id: "29b" , sl:1 , size:36  , tt:1500000  },
	{ id: 30 , style_ItemID: "giay_nike"        , image: "image/A_giay/giay7_1.jpg"                  , ida: "30-a" , imagea:"image/A_giay/giay7_1.jpg"                  , idb: "30-b" , imageb:"image/A_giay/giay7_2.jpg"                  , idc: "30-c" , imagec:"image/A_giay/giay7_3.jpg"                  , Name:"GIÀY Nike AIR JORDAN 1 LOW (NOTHING BUT NET)"                              , Normal_Price:4900000  , Normal_Price_id: "30a" , Promotional_Price:4000000  , Promotional_Price_id: "30b" , sl:1 , size:36  , tt:4000000  },
	{ id: 31 , style_ItemID: "giay_nike"        , image: "image/A_giay/giay8_1.jpg"                  , ida: "31-a" , imagea:"image/A_giay/giay8_1.jpg"                  , idb: "31-b" , imageb:"image/A_giay/giay8_2.jpg"                  , idc: "31-c" , imagec:"image/A_giay/giay8_3.jpg"                  , Name:"Giày Nike  golf nam FI Impact 3 (W)"                                       , Normal_Price:3700000  , Normal_Price_id: "31a" , Promotional_Price:3500000  , Promotional_Price_id: "31b" , sl:1 , size:36  , tt:3500000  },
	{ id: 32 , style_ItemID: "giay_gucci"       , image: "image/A_giay/giay9_1.jpg"                  , ida: "32-a" , imagea:"image/A_giay/giay9_1.jpg"                  , idb: "32-b" , imageb:"image/A_giay/giay9_2.jpg"                  , idc: "32-c" , imagec:"image/A_giay/giay9_3.jpg"                  , Name:"Giày Gucci Men's Ace Embroidered Sneaker White Leather With Bee Màu Trắng" , Normal_Price:15600000 , Normal_Price_id: "32a" , Promotional_Price:13600000 , Promotional_Price_id: "32b" , sl:1 , size:36  , tt:13600000 },
	{ id: 33 , style_ItemID: "giay_gucci"       , image: "image/A_giay/giay10_1.jpg"                 , ida: "33-a" , imagea:"image/A_giay/giay10_1.jpg"                 , idb: "33-b" , imageb:"image/A_giay/giay10_2.jpg"                 , idc: "33-c" , imagec:"image/A_giay/giay11_3.jpg"                 , Name:"Giày Gucci Ace Sneaker Leather Sneaker"                                    , Normal_Price:12500000 , Normal_Price_id: "33a" , Promotional_Price:" "      , Promotional_Price_id: "33b" , sl:1 , size:36  , tt:12500000 },
	{ id: 34 , style_ItemID: "giay_gucci"       , image: "image/A_giay/giay11_1.jpg"                 , ida: "34-a" , imagea:"image/A_giay/giay11_1.jpg"                 , idb: "34-b" , imageb:"image/A_giay/giay11_2.jpg"                 , idc: "34-c" , imagec:"image/A_giay/giay10_3.jpg"                 , Name:"Giày Gucci ACE Triple Black"                                               , Normal_Price:2300000  , Normal_Price_id: "34a" , Promotional_Price:" "      , Promotional_Price_id: "34b" , sl:1 , size:36  , tt:2300000  },
	{ id: 35 , style_ItemID: "giay_gucci"       , image: "image/A_giay/giay12_1.jpg"                 , ida: "35-a" , imagea:"image/A_giay/giay12_1.jpg"                 , idb: "35-b" , imageb:"image/A_giay/giay12_2.jpg"                 , idc: "35-c" , imagec:" "                                         , Name:"Giày Gucci MLB Boston"                                                     , Normal_Price:2400000  , Normal_Price_id: "35a" , Promotional_Price:" "      , Promotional_Price_id: "35b" , sl:1 , size:36  , tt:2400000  },
	{ id: 36 , style_ItemID: "quan_tay"         , image: "image/A_quan/quan1_1.jpg"                  , ida: "36-a" , imagea:"image/A_quan/quan1_1.jpg"                  , idb: "36-b" , imageb:"image/A_quan/quan1_2.jpg"                  , idc: "36-c" , imagec:"image/A_quan/quan1_3.jpg"                  , Name:"Quần Tây Đơn Giản B2FL02"                                                  , Normal_Price:425000   , Normal_Price_id: "36a" , Promotional_Price:" "      , Promotional_Price_id: "36b" , sl:1 , size:36  , tt:425000   },
	{ id: 37 , style_ItemID: "quan_jogger"      , image: "image/A_quan/quan2_1.jpg"                  , ida: "37-a" , imagea:"image/A_quan/quan2_1.jpg"                  , idb: "37-b" , imageb:"image/A_quan/quan2_2.jpg"                  , idc: "37-c" , imagec:"image/A_quan/quan2_3.jpg"                  , Name:"QUẦN THỂ THAO SST"                                                         , Normal_Price:1000000  , Normal_Price_id: "37a" , Promotional_Price:" "      , Promotional_Price_id: "37b" , sl:1 , size:36  , tt:1000000  },
	{ id: 38 , style_ItemID: "quan_kaki"        , image: "image/A_quan/quan3_1.jpg"                  , ida: "38-a" , imagea:"image/A_quan/quan3_1.jpg"                  , idb: "38-b" , imageb:"image/A_quan/quan3_2.jpg"                  , idc: "38-c" , imagec:"image/A_quan/quan3_3.jpg"                  , Name:"Quần kaki baggy nam nữ cực chất"                                           , Normal_Price:180000   , Normal_Price_id: "38a" , Promotional_Price:119000   , Promotional_Price_id: "38b" , sl:1 , size:36  , tt:119000   },
	{ id: 39 , style_ItemID: "quan_jogger"      , image: "image/A_quan/quan4_1.jpg"                  , ida: "39-a" , imagea:"image/A_quan/quan4_1.jpg"                  , idb: "39-b" , imageb:"image/A_quan/quan4_2.jpg"                  , idc: "39-c" , imagec:"image/A_quan/quan4_3.jpg"                  , Name:"Quần Jogger Nam Ống Bó Thời Trang Hàn Quốc JOGGER04"                       , Normal_Price:179000   , Normal_Price_id: "39a" , Promotional_Price:120000    , Promotional_Price_id: "39b" , sl:1 , size:36  , tt:120000   },
	{ id: 40 , style_ItemID: "quan_jogger"      , image: "image/A_quan/quan5_1.jpg"                  , ida: "40-a" , imagea:"image/A_quan/quan5_1.jpg"                  , idb: "40-b" , imageb:"image/A_quan/quan5_2.jpg"                  , idc: "40-c" , imagec:"image/A_quan/quan5_3.jpg"                  , Name:"Quần Jogger Thun Đen Trơn DC QTD0001"                                      , Normal_Price:180000   , Normal_Price_id: "40a" , Promotional_Price:" "      , Promotional_Price_id: "40b" , sl:1 , size:36  , tt:180000   },
	{ id: 41 , style_ItemID: "quan_jean"         , image: "image/A_quan/quan6_1.jpg"                  , ida: "41-a" , imagea:"image/A_quan/quan6_1.jpg"                  , idb: "41-b" , imageb:"image/A_quan/quan6_2.jpg"                  , idc: "41-c" , imagec:"image/A_quan/quan6_3.jpg"                  , Name:"Quần jeans nam VNXK Form 511 suông"                                        , Normal_Price:350000   , Normal_Price_id: "41a" , Promotional_Price:280000   , Promotional_Price_id: "41b" , sl:1 , size:36  , tt:280000   },
	{ id: 42 , style_ItemID: "quan_kaki"        , image: "image/A_quan/quan7_1.jpg"                  , ida: "42-a" , imagea:"image/A_quan/quan7_1.jpg"                  , idb: "42-b" , imageb:"image/A_quan/quan7_2.jpg"                  , idc: "42-c" , imagec:"image/A_quan/quan7_3.jpg"                  , Name:"Quần Kaki Dài Nam QKK0016"                                                 , Normal_Price:320000   , Normal_Price_id: "42a" , Promotional_Price:" "      , Promotional_Price_id: "42b" , sl:1 , size:36  , tt:320000   },
	{ id: 43 , style_ItemID: "quan_tay"         , image: "image/A_quan/quan8_1.jpg"                  , ida: "43-a" , imagea:"image/A_quan/quan8_1.jpg"                  , idb: "43-b" , imageb:"image/A_quan/quan8_2.jpg"                  , idc: "43-c" , imagec:" "                                         , Name:"Quần Tây Âu Màu Trơn Cho Nam"                                              , Normal_Price:250000   , Normal_Price_id: "43a" , Promotional_Price:193000   , Promotional_Price_id: "43b" , sl:1 , size:36  , tt:193000   },
	{ id: 44 , style_ItemID: "quan_jean"        , image: "image/A_quan/quan9_1.jpg"                  , ida: "44-a" , imagea:"image/A_quan/quan9_1.jpg"                  , idb: "44-b" , imageb:"image/A_quan/quan9_2.jpg"                  , idc: "44-c" , imagec:" "                                         , Name:"Quần jean nam hàng hiệu Merriman MJ001"                                    , Normal_Price:680000   , Normal_Price_id: "44a" , Promotional_Price:" "      , Promotional_Price_id: "44b" , sl:1 , size:36  , tt:680000   },
	{ id: 45 , style_ItemID: "phukien_dongho"   , image: "image/A_phukien/dong_ho/dongho1_1.jpg"     , ida: "45-a" , imagea:"image/A_phukien/dong_ho/dongho1_1.jpg"     , idb: "45-b" , imageb:"image/A_phukien/dong_ho/dongho1_2.jpg"     , idc: "45-c" , imagec:"image/A_phukien/dong_ho/dongho1_3.jpg"     , Name:"Đồng hồ Jacques Lemans JL-1-1654ZD"                                        , Normal_Price:5500000  , Normal_Price_id: "45a" , Promotional_Price:" "      , Promotional_Price_id: "45b" , sl:1            , tt:5500000  },
	{ id: 46 , style_ItemID: "phukien_dongho"   , image: "image/A_phukien/dong_ho/dongho2_1.jpg"     , ida: "46-a" , imagea:"image/A_phukien/dong_ho/dongho2_1.jpg"     , idb: "46-b" , imageb:"image/A_phukien/dong_ho/dongho2_2.jpg"     , idc: "46-c" , imagec:"image/A_phukien/dong_ho/dongho2_3.jpg"     , Name:"Đồng hồ nam chính hãng Teintop T7015-1"                                    , Normal_Price:1923000  , Normal_Price_id: "46a" , Promotional_Price:1250000  , Promotional_Price_id: "46b" , sl:1            , tt:1250000 },
	{ id: 47 , style_ItemID: "phukien_dongho"   , image: "image/A_phukien/dong_ho/dongho3_1.jpg"     , ida: "47-a" , imagea:"image/A_phukien/dong_ho/dongho3_1.jpg"     , idb: "47-b" , imageb:"image/A_phukien/dong_ho/dongho3_2.jpg"     , idc: "47-c" , imagec:"image/A_phukien/dong_ho/dongho3_3.jpg"     , Name:"Đồng hồ nam DIZIZID mặt mỏng chạy FULL kim DZKG001"                        , Normal_Price:650000   , Normal_Price_id: "47a" , Promotional_Price:450000   , Promotional_Price_id: "47b" , sl:1            , tt:450000   },
	{ id: 48 , style_ItemID: "phukien_dongho"   , image: "image/A_phukien/dong_ho/dongho4_1.jpg"     , ida: "48-a" , imagea:"image/A_phukien/dong_ho/dongho4_1.jpg"     , idb: "48-b" , imageb:"image/A_phukien/dong_ho/dongho4_2.jpg"     , idc: "48-c" , imagec:"image/A_phukien/dong_ho/dongho4_3.jpg"     , Name:"Đồng hồ nam Casio MTP-1374L-1AVDF 6 Kim - Dây da màu đen"                  , Normal_Price:1904000  , Normal_Price_id: "48a" , Promotional_Price:1519000  , Promotional_Price_id: "48b" , sl:1            , tt:1519000  },
	{ id: 49 , style_ItemID: "phukien_dongho"   , image: "image/A_phukien/dong_ho/dongho5_1.jpg"     , ida: "49-a" , imagea:"image/A_phukien/dong_ho/dongho5_1.jpg"     , idb: "49-b" , imageb:"image/A_phukien/dong_ho/dongho5_2.jpg"     , idc: "49-c" , imagec:" "                                         , Name:"ĐỒNG HỒ NAM CHÍNH HÃNG TEINTOP T7015-1"                                    , Normal_Price:1923000  , Normal_Price_id: "49a" , Promotional_Price:1250000  , Promotional_Price_id: "49b" , sl:1            , tt:1250000  },
	{ id: 50 , style_ItemID: "phukien_dongho"   , image: "image/A_phukien/dong_ho/dongho6_1.jpg"     , ida: "50-a" , imagea:"image/A_phukien/dong_ho/dongho6_1.jpg"     , idb: "50-b" , imageb:"image/A_phukien/dong_ho/dongho6_2.jpg"     , idc: "50-c" , imagec:" "                                         , Name:"Đồng hồ Jacques Lemans JL-1-1654.2ZD"                                      , Normal_Price:5500000  , Normal_Price_id: "50a" , Promotional_Price:" "      , Promotional_Price_id: "50b" , sl:1            , tt:5500000  },
	{ id: 51 , style_ItemID: "phukien_thatlung" , image: "image/A_phukien/thac_lung/thaclung1_1.jpg" , ida: "51-a" , imagea:"image/A_phukien/thac_lung/thaclung1_1.jpg" , idb: "51-b" , imageb:"image/A_phukien/thac_lung/thaclung1_2.jpg" , idc: "51-c" , imagec:"image/A_phukien/thac_lung/thaclung1_3.jpg" , Name:"THẮT LƯNG DA NAM CÔNG SỞ LS17"                                             , Normal_Price:500000   , Normal_Price_id: "51a" , Promotional_Price:" "      , Promotional_Price_id: "51b" , sl:1            , tt:500000   },
	{ id: 52 , style_ItemID: "phukien_thatlung" , image: "image/A_phukien/thac_lung/thaclung2_1.jpg" , ida: "52-a" , imagea:"image/A_phukien/thac_lung/thaclung2_1.jpg" , idb: "52-b" , imageb:"image/A_phukien/thac_lung/thaclung2_2.jpg" , idc: "52-c" , imagec:"image/A_phukien/thac_lung/thaclung2_3.jpg" , Name:"Thắt lưng nam da bò AT P134"                                               , Normal_Price:275000   , Normal_Price_id: "52a" , Promotional_Price:214500   , Promotional_Price_id: "52b" , sl:1            , tt:214500   },
	{ id: 53 , style_ItemID: "phukien_thatlung" , image: "image/A_phukien/thac_lung/thaclung3_1.jpg" , ida: "53-a" , imagea:"image/A_phukien/thac_lung/thaclung3_1.jpg" , idb: "53-b" , imageb:"image/A_phukien/thac_lung/thaclung3_2.jpg" , idc: "53-c" , imagec:"image/A_phukien/thac_lung/thaclung3_3.jpg" , Name:"Thắt Lưng Da Nam CARTELO Mẫu 26"                                           , Normal_Price:657000   , Normal_Price_id: "53a" , Promotional_Price:547000   , Promotional_Price_id: "53b" , sl:1            , tt:547000  },
	{ id: 54 , style_ItemID: "phukien_thatlung" , image: "image/A_phukien/thac_lung/thaclung4_1.jpg" , ida: "54-a" , imagea:"image/A_phukien/thac_lung/thaclung4_1.jpg" , idb: "54-b" , imageb:"image/A_phukien/thac_lung/thaclung4_2.jpg" , idc: "54-c" , imagec:"image/A_phukien/thac_lung/thaclung4_3.jpg" , Name:"Dây thắt lưng nam da bò (không khóa)"                                      , Normal_Price:180000   , Normal_Price_id: "54a" , Promotional_Price:" "      , Promotional_Price_id: "54b" , sl:1            , tt:180000   },
	{ id: 55 , style_ItemID: "phukien_vida"     , image: "image/A_phukien/vi_da/vida1_1.jpg"         , ida: "55-a" , imagea:"image/A_phukien/vi_da/vida1_1.jpg"         , idb: "55-b" , imageb:"image/A_phukien/vi_da/vida1_2.jpg"         , idc: "55-c" , imagec:"image/A_phukien/vi_da/vida1_3.jpg"         , Name:"Ví Da Bò Nam Dáng Đứng, Bóp Da Nam Mẫu Mới Nhất – OSP024"                  , Normal_Price:690000   , Normal_Price_id: "55a" , Promotional_Price:620000   , Promotional_Price_id: "55b" , sl:1            , tt:620000  },
	{ id: 56 , style_ItemID: "phukien_vida"     , image: "image/A_phukien/vi_da/vida2_1.jpg"         , ida: "56-a" , imagea:"image/A_phukien/vi_da/vida2_1.jpg"         , idb: "56-b" , imageb:"image/A_phukien/vi_da/vida2_2.jpg"         , idc: "56-c" , imagec:"image/A_phukien/vi_da/vida2_3.jpg"         , Name:"Ví Venus - Ngang"                                                          , Normal_Price:450000   , Normal_Price_id: "56a" , Promotional_Price:" "      , Promotional_Price_id: "56b" , sl:1            , tt:450000   },
	{ id: 57 , style_ItemID: "phukien_vida"     , image: "image/A_phukien/vi_da/vida3_1.jpg"         , ida: "57-a" , imagea:"image/A_phukien/vi_da/vida3_1.jpg"         , idb: "57-b" , imageb:"image/A_phukien/vi_da/vida3_2.jpg"         , idc: "57-c" , imagec:"image/A_phukien/vi_da/vida3_3.jpg"         , Name:"Ví Da Cá Sấu"                                                              , Normal_Price:1150000  , Normal_Price_id: "57a" , Promotional_Price:" "      , Promotional_Price_id: "57b" , sl:1            , tt:1150000  },
	{ id: 58 , style_ItemID: "phukien_vida"     , image: "image/A_phukien/vi_da/vida4_1.jpg"         , ida: "58-a" , imagea:"image/A_phukien/vi_da/vida4_1.jpg"         , idb: "58-b" , imageb:"image/A_phukien/vi_da/vida4_2.jpg"         , idc: "58-c" , imagec:"image/A_phukien/vi_da/vida4_3.jpg"         , Name:"Ví Da Nam Lata LVN44D"                                                     , Normal_Price:400000   , Normal_Price_id: "58a" , Promotional_Price:" "      , Promotional_Price_id: "58b" , sl:1            , tt:400000   },
	{ id: 59 , style_ItemID: "phukien_vida"     , image: "image/A_phukien/vi_da/vida5_1.jpg"         , ida: "59-a" , imagea:"image/A_phukien/vi_da/vida5_1.jpg"         , idb: "59-b" , imageb:"image/A_phukien/vi_da/vida5_2.jpg"         , idc: "59-c" , imagec:" "                                         , Name:"Ví da nam cao cấp - AT031"                                                 , Normal_Price:265000   , Normal_Price_id: "59a" , Promotional_Price:206700   , Promotional_Price_id: "59b" , sl:1            , tt:206700   },
	{ id: 60 , style_ItemID: "phukien_vida"     , image: "image/A_phukien/vi_da/vida6_1.jpg"         , ida: "60-a" , imagea:"image/A_phukien/vi_da/vida6_1.jpg"         , idb: "60-b" , imageb:"image/A_phukien/vi_da/vida6_2.jpg"         , idc: "60-c" , imagec:" "                                         , Name:"Ví Da Nam Hàn Quốc Nhiều Ngăn"                                             , Normal_Price:329000   , Normal_Price_id: "60a" , Promotional_Price:299000   , Promotional_Price_id: "60b" , sl:1            , tt:299000   },
];

let longitem = item.length;
let itemArr=[];
itemArr=item;
let perPage = 12;
let currentPage = 1;
let start = 0;
let end = perPage;
const maxpage = Math.ceil(item.length / perPage);

function totalPage(item_array){ // tính tổng số trang của mảng item_array
	var Total = Math.ceil(item_array.length / perPage);
	return Total;
}
function getCurrentPage(currentPage){
	start = (currentPage - 1) * perPage;
	end = currentPage * perPage;
}

function listPage (Total_pages){ // xuất ra số trang
	let html ='';
	html += '<button id="nextLeft"><</button>';
	for (let i = 1; i<= Total_pages;i++){
		html += `<div id="page${i}">${i}</div>`
	}
	html += '<button id="nextRight">></button>';
	document.getElementById('page').innerHTML = html;
}
listPage(totalPage(item));


function clickNextRight1(){
	document.getElementById('nextRight').style.borderColor = 'gray';
	document.getElementById('nextRight').style.backgroundColor = 'whitesmoke';
	document.getElementById('nextRight').style.color = 'gray';
}
function clickNextRight2(){
	document.getElementById('nextRight').style.borderColor = 'black';
	document.getElementById('nextRight').style.backgroundColor = 'white';
	document.getElementById('nextRight').style.color = 'black';
}
function clickNextLeft1(){
	document.getElementById('nextLeft').style.borderColor = 'gray';
	document.getElementById('nextLeft').style.backgroundColor = 'whitesmoke';
	document.getElementById('nextLeft').style.color = 'gray';
}
function clickNextLeft2(){
	document.getElementById('nextLeft').style.borderColor = 'black';
	document.getElementById('nextLeft').style.backgroundColor = 'white';
	document.getElementById('nextLeft').style.color = 'black';
}



// function Next(index)




function quaylaidautrang(){
            var chieucaoht = self.pageYOffset;
            // lấy chiều cao hiện tại của trang
            var set = chieucaoht;
            var run = setInterval(function(){
                chieucaoht = chieucaoht - 1*set;
                window.scrollTo(0,chieucaoht);    
                if(chieucaoht <= 0){
                    clearInterval(run);
                }        
            },15)
		
}


document.getElementById('page1').style.backgroundColor = 'darkorange';
document.getElementById('page1').style.color = 'white';
document.getElementById('page1').style.borderColor = 'darkorange';
clickNextLeft1();



function formatNumber(num) { // định dạng giá tiền
	
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +'₫';
}

function formatNumberb(num) { // định dạng giá tiền
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function sanpham(this_array) { // phân trang
	html = '';
	const contens = this_array.map((item, index) => {
	if(index >= start && index < end){
	html += '<div class="item">';
		html += '<div class="item_top">';
			html += '<button type="button" id="'+item.id+'" class="btn_item" onclick="chitietsp(this);">Chi Tiết</button>';
			html += '<img src= ' + item.image + ' id="select'+ item.id +'">'; // ảnh chính trên div
		html += '</div>';
		html += '<div id="item_bot">';

		if(item.imagea != " " && item.ida != " ")
			html += '<img src=" ' + item.imagea +'" onclick="changeImgItem2(this)" id= '+ item.ida +'>'; // ảnh nhỏ 1
			// console.log(''+item.imagea+'');

		if(item.imageb != " " && item.idb != " ")
			html += '<img  src=" ' + item.imageb +'" onclick="changeImgItem2(this)" id= '+ item.idb +'>';// ảnh nhỏ 2

		if(item.imagec != " " && item.idc != " ")
			html += '<img  src= "' + item.imagec +'" onclick="changeImgItem2(this)" id= '+ item.idc +'>';// ảnh nhỏ 3

		html += '</div>';
		html+='<div class="text">';	// giá và tên sản phẩm
			html+='<div class="text_title">'+item.Name+'</div>';
			html+='<div class="text_price">';
			var Normal_Price=formatNumber(item.Normal_Price);
			var Promotional_Price=formatNumber(item.Promotional_Price);
			if(item.Promotional_Price==" ") // khi sản phẩm không khuyến mãi
			{
				var Promotional_Price=formatNumberb(item.Promotional_Price);
			}
				html+='<div id="'+ item.Normal_Price_id +'" class="Normal_price"><p>'+Normal_Price+'</p></div>'; // giá thường
				html+='<div id="'+ item.Promotional_Price_id +'" class="Promotional_price"><p>'+Promotional_Price+'</p></div>'; //giá khuyến mãi
			html+='</div>';
		html+='</div>';
	html += '</div>';
	return html;
	}
	});
	document.getElementById('product').innerHTML = html;
	if(end<=this_array.length)
	{
		for(var i=start;i<end;i++)
		{
			if(this_array[i].Promotional_Price==" ")
			{
				document.getElementById(''+this_array[i].Normal_Price_id+'').style.textDecoration='None';
				document.getElementById(''+this_array[i].Normal_Price_id+'').style.fontSize='25px';
				document.getElementById(''+this_array[i].Normal_Price_id+'').style.color='red';
				document.getElementById(''+this_array[i].Normal_Price_id+'').style.float='left';
				document.getElementById(''+this_array[i].Promotional_Price_id+'').style.float='right';
				document.getElementById(''+this_array[i].Normal_Price_id+'').style.width='40%';
				
			}
		}
	}
	else
	{
		for(var i=start;i<this_array.length;i++)
		{
			if(this_array[i].Promotional_Price==" ")
			{
				document.getElementById(''+this_array[i].Normal_Price_id+'').style.textDecoration='None';
				document.getElementById(''+this_array[i].Normal_Price_id+'').style.fontSize='25px';
				document.getElementById(''+this_array[i].Normal_Price_id+'').style.color='red';
				document.getElementById(''+this_array[i].Normal_Price_id+'').style.float='left';
				document.getElementById(''+this_array[i].Promotional_Price_id+'').style.float='right';
				document.getElementById(''+this_array[i].Normal_Price_id+'').style.width='40%';
				
			}
		}
	}
	getCurrentPage(1);
}



function changeImgItem2(main) // thay đổ ảnh chính vs ảnh nhỏ khi onclick
{	
	var a='';
	i=0;
	while(main.id[i]!='-')
	{
		a+=main.id[i];
		i++;
	}
	document.getElementById("select" +a).src=main.src;
};

function ChangePage(item_array){ // đổi trang
	const numberPage = document.querySelectorAll('#page div');
	const nextRight = document.getElementById('nextRight'); // thay đổi id theo mảng item_array
	const nextLeft = document.getElementById('nextLeft'); // thay đổi id theo mảng item_array
	for(let i=0; i<numberPage.length; i++){
		numberPage[i].addEventListener('click' , ()=>{
			document.getElementById(`page${i+1}`).style.backgroundColor = 'darkorange';
			document.getElementById(`page${i+1}`).style.color = 'white';
			document.getElementById(`page${i+1}`).style.borderColor = 'darkorange';
			for(let j=0;j<numberPage.length;j++){
				if(j!=i){
					document.getElementById(`page${j+1}`).style.backgroundColor = 'white';
					document.getElementById(`page${j+1}`).style.color = 'black';
					document.getElementById(`page${j+1}`).style.borderColor = 'black';
				}
			}
			if(i==(numberPage.length-1)){
				clickNextLeft2();
				clickNextRight1();
			}
			else{
				if(i==0){
					clickNextLeft1();
					clickNextRight2();
				}
				else{
					clickNextLeft2();
					clickNextRight2();
				}
			}
			const value = i + 1;
			currentPage=value;
			getCurrentPage(currentPage);
			sanpham(item_array);
			quaylaidautrang();
			
		})
	}


	nextRight.addEventListener('click', ()=> {
		clickNextLeft2();
		currentPage++;
		if(currentPage<=totalPage(item_array)){
			quaylaidautrang();
		}
		if(currentPage > totalPage(item_array)){
			currentPage = totalPage(item_array);
		}
		if(currentPage == totalPage(item_array)){
			clickNextRight1();
		}
		getCurrentPage(currentPage);
		sanpham(item_array);
		for(let i=1;i<=currentPage;i++){
			if(i==currentPage){
				document.getElementById(`page${i}`).style.backgroundColor = 'darkorange';
				document.getElementById(`page${i}`).style.borderColor = 'darkorange';
				document.getElementById(`page${i}`).style.color = 'white';
			}
			for(let j=1;j<=i;j++){
				if(j<i){
					document.getElementById(`page${j}`).style.backgroundColor = 'white';
					document.getElementById(`page${j}`).style.borderColor = 'black';
					document.getElementById(`page${j}`).style.color = 'black';
				}
			}
		}
	
	})

	nextLeft.addEventListener('click', ()=> {
		clickNextRight2();
		currentPage--;
		if(currentPage>=1){
			quaylaidautrang();
		}
		if(currentPage <= 1){
			currentPage = 1;
		}
		if(currentPage == 1){
			clickNextLeft1();

		}
		getCurrentPage(currentPage);
		sanpham(item_array);
		for(let i=totalPage(item_array);i>=currentPage;i--){
			if(i==currentPage){
				document.getElementById(`page${i}`).style.backgroundColor = 'darkorange';
				document.getElementById(`page${i}`).style.borderColor = 'darkorange';
				document.getElementById(`page${i}`).style.color = 'white';
			}
			for(let j=totalPage(item_array);j>=i;j--){
				if(j>i){
					document.getElementById(`page${j}`).style.backgroundColor = 'white';
					document.getElementById(`page${j}`).style.borderColor = 'black';
					document.getElementById(`page${j}`).style.color = 'black';
				}
			}
		}
	})	
}

sanpham(item);
ChangePage(item);




function csbh(){
	var men = "Men'fashian"
	html = '';
	html += '<img style="width: 100%; height:100%" src="image/footer/BaoHanh.PNG">';
	
	document.getElementById('cacchinhsach').innerHTML = html;
	return html;
}









document.getElementById('csbh').onclick = function(){
	document.getElementById('product').style = 'none';
	document.getElementById('cacchinhsach').style.display = 'block';


}


function xoadau(str) {
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

function Search(){ // tìm kiếm sản phẩm
	var item_search= xoadau(document.getElementById("search_item").value);
	var temp=[];
	var SapXep=JSON.parse(localStorage.getItem("SapXep")); 
	if(localStorage.getItem("Price_from")!="" && localStorage.getItem("Price_to")!="") {
		var Price_from=Number(JSON.parse(localStorage.getItem("Price_from")));
		var Price_to=Number(JSON.parse(localStorage.getItem("Price_to")));}
		else {
			var Price_from=0;
			var Price_to=0;
		}
	for(let i=0;i<item.length;i++)
	{
		x=xoadau(item[i].Name);
		var search_string= x.search( item_search);
		if(search_string!=-1)
		{
			if(Price_to>0)
			{
				if(item[i].Normal_Price<Price_to && item[i].Normal_Price>Price_from)
				temp.push(item[i]);
			}
			else
			{
				if(item[i].Normal_Price>Price_from)
				temp.push(item[i]);
			}
		}
			
	}
	var x=temp.length;
	
	if(x>0)
	{
		if(x>perPage)
		{
			SapXepMang(temp,SapXep);
			sanpham(temp);
			listPage(totalPage(temp));
			ChangePage(temp);
			clickNextLeft1();// thực hiện ngay khi load trang
			if(x<=perPage){
				clickNextRight1();
			}
			document.getElementById(`page${1}`).style.backgroundColor = 'darkorange';// thực hiện ngay khi load trang
			quaylaidautrang();
		}
		else{
			SapXepMang(temp,SapXep);
			sanpham(temp);
			listPage(totalPage(temp));
			ChangePage(temp);
			document.getElementById('page').innerHTML='';
			quaylaidautrang();
		}	
	}
	else {
		alert('Không tìm thấy sản phẩm đang tìm kiếm.');
		document.getElementById('product').innerHTML='<div class="item1"><img src="image/anhbuon.jpg"></div>';
		document.getElementById('page').innerHTML='';
		document.getElementById('product').style.backgroundColor='#ffffff';
		quaylaidautrang();
	}
} 

function doigia1()
{
	var Price_from= document.getElementById('pricefrom').value;
	localStorage.setItem("Price_from", JSON.stringify(Price_from)); 
	
}
function doigia2()
{
	 var Price_to= document.getElementById('priceto').value;
	localStorage.setItem("Price_to", JSON.stringify(Price_to)); 

}
function doigia0()
{
	if(localStorage.getItem("Price_from") == null && localStorage.getItem("Price_to") == null){
	localStorage.setItem("Price_from", ""); 
	localStorage.setItem("Price_to", ""); }
	if(localStorage.getItem("Price_from")!="" && localStorage.getItem("Price_to")!="") {
	document.getElementById('pricefrom').value=JSON.parse(localStorage.getItem("Price_from"));
	document.getElementById('priceto').value=JSON.parse(localStorage.getItem("Price_to"));}

	n=localStorage.getItem("SapXep");
	if(n == null)
	{
		localStorage.setItem("SapXep", "0");
		document.getElementById('select_price').value="0";
	}
	else if(n =="0")
	{
		document.getElementById('select_price').value="0";
	}
	else if(n =="1")
	{
		document.getElementById('select_price').value="1";
	}
	else
	{
		document.getElementById('select_price').value="2";
	}

}

function Insertionsort1(this_array, n) // tăng dần tính cả giá khuyến mãi
{
    for(var j=1;j<n;j++)
    {
        var key=this_array[j];
		var i=j-1;
		var a=0;
		var b=0;

		if(key.Promotional_Price==" ")
		{
			b=key.Normal_Price;
		}
		else
		{
			b=key.Promotional_Price;
		}
		if(this_array[i].Promotional_Price==" ")
		{
			a=this_array[i].Normal_Price;
		}
		else
		{
			a=this_array[i].Promotional_Price;
		}

        while(i>=0 && a > b)
        {
            this_array[i+1]=this_array[i];
			i=i-1;
			if(i>=0)
			{
				if(this_array[i].Promotional_Price==" ")
				{
					a=this_array[i].Normal_Price;
				}
				else
				{
					a=this_array[i].Promotional_Price;
				}
			}
        }
        this_array[i+1]=key;
	}
	return this_array;
}

function Insertionsort2(this_array, n) // giảm dần tính cả giá khuyến mãi
{
    for(var j=1;j<n;j++)
    {
        var key=this_array[j];
		var i=j-1;
		var a=0;
		var b=0;

		if(key.Promotional_Price==" ")
		{
			b=key.Normal_Price;
		}
		else
		{
			b=key.Promotional_Price;
		}
		if(this_array[i].Promotional_Price==" ")
		{
			a=this_array[i].Normal_Price;
		}
		else
		{
			a=this_array[i].Promotional_Price;
		}

        while(i>=0 && a < b)
        {
            this_array[i+1]=this_array[i];
			i=i-1;
			if(i>=0)
			{
				if(this_array[i].Promotional_Price==" ")
				{
					a=this_array[i].Normal_Price;
				}
				else
				{
					a=this_array[i].Promotional_Price;
				}
			}
        }
        this_array[i+1]=key;
	}
	return this_array;
}


function Insertionsort3(this_array, n) // tăng dần không tính giá khuyến mãi
{
    for(var j=1;j<n;j++)
    {
        var key=this_array[j];
		var i=j-1;

        while(i>=0 && this_array[i].Normal_Price > key.Normal_Price)
        {
            this_array[i+1]=this_array[i];
            i=i-1;
        }
        this_array[i+1]=key;
	}
	return this_array;
}

function Insertionsort4(this_array, n) // giảm dần không tính giá khuyến mãi
{
    for(var j=1;j<n;j++)
    {
        var key=this_array[j];
		var i=j-1;

        while(i>=0 && this_array[i].Normal_Price < key.Normal_Price)
        {
            this_array[i+1]=this_array[i];
            i=i-1;
        }
        this_array[i+1]=key;
	}
	return this_array;
}


function SapXep(obj) // lấy value của select gán lên localStorage
{
	var options = obj.children;
		for (var i = 0; i < options.length; i++){
			if (options[i].selected){
				a=options[i].value;
				localStorage.setItem("SapXep", a);
			}
		}
}



function SapXepMang(array, x)
{
	if(x=="1")
	{
		Insertionsort1(array,array.length);
	}
	else if(x=="2")
	{
		Insertionsort2(array,array.length);

	}
	else return array ;
}


function filter(object){ // lọc sản phẩm 
	var filter_item =object;
	var SapXep=JSON.parse(localStorage.getItem("SapXep"));
	if(localStorage.getItem("Price_from")!="" && localStorage.getItem("Price_to")!="") {
	var Price_from=JSON.parse(localStorage.getItem("Price_from"));
	var Price_to=JSON.parse(localStorage.getItem("Price_to"));}
	else {
		var Price_from='';
		var Price_to='';
	}
	var temp=[];
	var test=0;
	
	if( Price_from=='' && Price_to=='')
	{
		if(filter_item=="all")
		{
			test=1;
			var temp2=item;
			SapXepMang(temp2,SapXep);
			sanpham(temp2);
			listPage(totalPage(temp2));
			document.getElementById(`page${1}`).style.backgroundColor = 'darkorange';// thực hiện ngay khi load trang
			document.getElementById(`page${1}`).style.color = 'white';
			document.getElementById(`page${1}`).style.borderColor = 'darkorange';
			clickNextLeft1();// thực hiện ngay khi load trang
			ChangePage(temp2);
			quaylaidautrang();
		}
		else
		{
			for(let i=0;i<item.length;i++)
				{
					var string_search=item[i].style_ItemID.search(filter_item);
					if(string_search!= -1)
						temp.push(item[i]);
				}
		}
	}
	else if(Price_from!='' && Price_to=='')	
	{
		var PriceNumber_from=Number(Price_from);
		if(filter_item=="all")
			for( let i=0;i<item.length;i++)
			{
				if(item[i].Promotional_Price!=" ")
				{
					var x=item[i].Promotional_Price;
				}
				else{
					var x=item[i].Normal_Price;
				}
				if(x>=PriceNumber_from)
					temp.push(item[i]);
			}
		else
		{
			for(let i=0;i<item.length;i++)
			{
				if(item[i].Promotional_Price!=" ")
				{
					var x=item[i].Promotional_Price;
				}
				else{
					var x=item[i].Normal_Price;
				}
				var string_search=item[i].style_ItemID.search(filter_item);
				if(string_search!= -1 && x>=PriceNumber_from)
					temp.push(item[i]);
			}
		}
	}
	else if(Price_from=='' && Price_to!='')	
	{
		var PriceNumber_to=Number(Price_to);
		if(filter_item=="all")
			for( let i=0;i<item.length;i++)
			{
				if(item[i].Promotional_Price!=" ")
				{
					var x=item[i].Promotional_Price;
				}
				else{
					var x=item[i].Normal_Price;
				}
				if(x<=PriceNumber_to)
					temp.push(item[i]);
			}
		else
		{
			for(let i=0;i<item.length;i++)
			{
				if(item[i].Promotional_Price!=" ")
				{
					var x=item[i].Promotional_Price;
				}
				else{
					var x=item[i].Normal_Price;
				}
				var string_search=item[i].style_ItemID.search(filter_item);
				if(string_search!= -1 && x<=PriceNumber_to)
					temp.push(item[i]);
			}
		}
	}
	else
	{
		var PriceNumber_to=Number(Price_to);
		var PriceNumber_from=Number(Price_from);
		if(filter_item=="all")
			for( let i=0;i<item.length;i++)
			{
				if(item[i].Promotional_Price!=" ")
				{
					var x=item[i].Promotional_Price;
				}
				else{
					var x=item[i].Normal_Price;
				}
				if(x>=PriceNumber_from && x<=PriceNumber_to)
					temp.push(item[i]);
			}
		else
		{
			for(let i=0;i<item.length;i++)
			{
				if(item[i].Promotional_Price!=" ")
				{
					var x=item[i].Promotional_Price;
				}
				else{
					var x=item[i].Normal_Price;
				}
				var string_search=item[i].style_ItemID.search(filter_item);
				if(string_search!= -1 && x>=PriceNumber_from && x<=PriceNumber_to )
					temp.push(item[i]);
			}
		}
	}
	
	if(test!=1)
	{
		if(temp.length>0)
		{
			if(temp.length>perPage)
			{
				SapXepMang(temp,SapXep);
				sanpham(temp);
				listPage(totalPage(temp));
				ChangePage(temp);
				document.getElementById(`page${1}`).style.backgroundColor = 'darkorange'; // thực hiện ngay khi load trang
				document.getElementById(`page${1}`).style.color = 'white';
				document.getElementById(`page${1}`).style.borderColor = 'darkorange';
				if(x<=perPage){
					clickNextRight1();
				}
				clickNextLeft1();// thực hiện ngay khi load trang
				quaylaidautrang();
			}
			else
			{
				SapXepMang(temp,SapXep);
				sanpham(temp);
				listPage(totalPage(temp));
				ChangePage(temp);
				document.getElementById('page').innerHTML='';
				quaylaidautrang();
			}
		}
		else
		{
			document.getElementById('product').innerHTML='<div class="none"><p>Không tìm thấy sản phẩm cần lọc	.</p></div>';
			document.getElementById('page').innerHTML='';
			quaylaidautrang();
		}
	}	

}

function Price1(){
	if(document.getElementById('Price_filter').style.display=='none')
	{
		document.getElementById('Price_filter').style.display='block';
	}
	else
	{
		document.getElementById('Price_filter').style.display='none';
	}
}

function Price2(){
	if(document.getElementById('Price_filter').style.display=='none')
	{
		document.getElementById('Price_filter').style.display='block';
	}
	else
	{
		document.getElementById('Price_filter').style.display='none';
	}
}


function hienthi()
{
	var url = window.location.href;
		var id = url.split('?');
		var t= id[1];
		hienthidonhang();
		var dsdonhang='<div style="height:700px;clear: both; width:420%"><h2 style="margin-left:10%; padding-top:30px; font-family:Tahoma; font-size:22px">Danh Sách Các Đơn Đặt Hàng</h2></br></br>';
		dsdonhang+='<div style="margin-left: 10%;width:80%;height:40px"><div style="float:left; width:5%"><p style=" margin-left:12px"><b>STT</b></p></div>';
		dsdonhang+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Ngày đặt hàng</b></p></div>';
		dsdonhang+='<div style="float:left; width:16%"><p style=" margin-left:12px"><b>Số tiền</b></p></div>';
		dsdonhang+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Trạng thái đơn hàng</b></p></div>';
		dsdonhang+='<div style="float:left; width:12%"><p style=" margin-left:12px"><b>Hủy đơn hàng</b></p></div>';
		dsdonhang+='<div style="float:left; width:12%"><p style=" margin-left:12px"><b>Xóa đơn hàng</b></p></div></div>';
		dsdonhang+='<div class="list1">';
		var tieudegh='';
		tieudegh+='<div style="height:700px;clear: both; width:420%">';
			tieudegh+='<h2 style="margin-left:30%; padding-top:30px; font-family:Tahoma; font-size:30px">Giỏ Hàng</h2></br></br></br>'; //hiển thị chữ giỏ hàng
			tieudegh+='<div style="margin-left: 5%;width:90%;height:40px">';
				tieudegh+='<div style="float:left; width:5%">';
					tieudegh+='<p style=" margin-left:12px"><b>Chọn</b></p>';
				tieudegh+='</div>';
				tieudegh+='<div style="float:left; width:12%">';
					tieudegh+='<p style=" margin-left:35px"><b>Hình Ảnh</b></p>';
				tieudegh+='</div>';
				tieudegh+='<div style="float:left; width:30%">';
					tieudegh+='<p style=" margin-left:50px"><b>Tên Sản Phẩm</b></p>';
				tieudegh+='</div>';
				tieudegh+='<div style="float:left; width:8%">';
					tieudegh+='<p style=" margin-left:3px"><b>Size</b></p>';
				tieudegh+='</div>';
				tieudegh+='<div style="float:left; width:14%">';
					tieudegh+='<p style=" margin-left:20px"><b>Giá</b></p>';
				tieudegh+='</div>';
				tieudegh+='<div style="float:left; width:10%">';
					tieudegh+='<p><b>Số Lượng</b></p>';
				tieudegh+='</div>';
				tieudegh+='<div style="float:left; width:15%">';
					tieudegh+='<p style="margin-left:30px"><b>Tổng</b></p>';
				tieudegh+='</div>';
				tieudegh+='<div style="float:left; width:5%">';
					tieudegh+='<p style=""><b>Xóa</b></p>';
				tieudegh+='</div>';
			tieudegh+='</div>';
			var gh='<div class="list">';
			var muahang='</div><p class="muahang" style="margin-left:15%"><b><i>Tổng Cộng:&nbsp;</i></b></p><p class="muahang" id="tongcong"><p>';
			var donhang='<a href="index_test.html?DS_DonHang"><div class="dsdonhang"><i>Xem danh sách các đơn đặt hàng</i></div></a>';
		var iconthanhtoan='<div class="thanhtoan" onclick="thanhtoan();">Thanh Toán</div></div>';
		if(t=='Gio-Hang')
			{
					document.getElementById("product").style.height='700px';
					if(localStorage.getItem("xuatsp")==null||localStorage.getItem("xuatsp")==''){
						if(localStorage.getItem("userlogin")!=null) document.getElementById("product").innerHTML=tieudegh + gh + '<p><i>Bạn chưa thêm sản phẩm nào vào giỏ hàng!</i></p>' + '</div>' +donhang;
						else document.getElementById("product").innerHTML=tieudegh + gh + '<p><i>Bạn chưa thêm sản phẩm nào vào giỏ hàng!</i></p>' + '</div>';
						}
					else{
						if(localStorage.getItem("userlogin")!=null) document.getElementById("product").innerHTML=tieudegh + gh + localStorage.getItem("xuatsp") + muahang + donhang + iconthanhtoan;
						 else document.getElementById("product").innerHTML=tieudegh + gh + localStorage.getItem("xuatsp") + muahang + iconthanhtoan;
						}
					document.getElementById("page").style.display='none';
					document.getElementById("footer").style.marginTop='1000px';
					document.title="Giỏ Hàng";		
			}
		else if(t=='DS_DonHang')
		{
					document.getElementById("product").style.height='700px';
					document.getElementById("product").innerHTML=dsdonhang + localStorage.getItem("xuatDSdonhang") + '</div></div>';
					document.getElementById("page").style.display='none';
					document.getElementById("footer").style.marginTop='1000px';
					document.title="Danh Sách Đơn Hàng";		
		}
		else filter(t);
}
function hienthidonhang()
{
	localStorage.setItem("tc","0");
	var t=[]
	var t = JSON.parse(localStorage.getItem("thanhtoan")) || [];
	if(t.length>0) {t.splice(0,t.length);}
	localStorage.setItem("thanhtoan", JSON.stringify(t));
}
function hienthigiohang()
{
	var gh=[],k1='',k2='',k3='',k4='',k5='',k6='',k7='',k8='',k9='',k10='',k11='',k12='',k13='';k14='';k15='';k16='',k17='';/********/
	gh=JSON.parse(localStorage.getItem("manggh")); 
	k1+='<div class="itemlist">';
		k1+='<input type="checkbox" value="1" id="chon'; //hiển thị ô chọn trong gh
		k2+='" style="float:left; height:30px; width:5%; margin-top:18px; margin-left:5px" onclick="chonsp(';
		k3+=');"/>';
		k3+='<div style="float:left; margin-top:5px; height:60px; width:12%; ">';//hiển thị ô hình ảnh trong gh
			k3+='<img src="'; 
			k4+='" height="60" width="60" style="margin-left:30px"/>';
		k4+='</div>';
		k4+='<div style="float:left; width:30%; font-size:15px">'; //hiển thị tên sp trong gh
			k4+='<p style="width:80%; margin-top:23px; margin-left:30px">'; 
			k5+='</p>';
		k5+='</div>';
		k5+='<div style="float:left; width:8%; font-size:15px;margin-top:23px">'; //hiển thị ô size trong gh
			k5+='<select id="changeSize'; 
			k6+='" onchange="changeSize(';
			k7+=');">';
			k8+='</select>';
		k8+='</div>';
		k8+='<div style="float:left; width:14%; font-size:15px">'; //hiển thị ô giá trong gh
			k8+='<p style="width:75%; margin-top:23px; margin-left:10px">'; 
			k9+='</p>';
		k9+='</div>';
		k9+='<div style="float:left; width:10%; font-size:15px; position:relative; margin-top:6px">'; //hiển thị ô số lượng trong gh
			k9+='<input type="text" onchange="changeSL('; /********/
			k17+=');" id="input'; //ô hiển thị số lượng sp  /********/
			k10+='" value="';
			k11+='" size="5" style="margin-top:10px; width:30px; height:30px; border: solid 1px; margin-left:7px"/>';
			k11+='<div style="top:10px" class="sl" onclick="tangsoluongsp('; //ô tăng số lượng sp
			k12+=');"><b>+</b></div>';
			k12+='<div style="top:26px" class="sl" onclick="giamsoluongsp('; //ô giảm số lượng sp
			k13+=');"><b>-</b></div>';
		k13+='</div>'; 
		k14+=' <div style="float:left;width:15%; font-size:15px">'; //ô tổng tiền
			k14+='<p style="width:75%; margin-top:23px; margin-left:25px">'; 
			k15+='</p>';
		k15+='</div>';
		k15+='<div style="float:left;height:60px; width:5%">'; //ô xóa sp trong gh
			k15+='<img src="image/del.jpg" class="del" onclick="xoaspgh(';
			k16+=');" style=" margin-top:20px; margin-left:2px"/>';
		k16+='</div>';
	k16+='</div>';
	var size='';
	var s='';
	for(var i=0;i<gh.length;i++)
	{
		if(gh[i].style_ItemID=="giay_adidas"||gh[i].style_ItemID=="giay_nike"||gh[i].style_ItemID=="giay_gucci"||gh[i].style_ItemID=="quan_tay"||gh[i].style_ItemID=="quan_jogger"||gh[i].style_ItemID=="quan_kaki"||gh[i].style_ItemID=="quan_jean")
			{
				for(var j=36;j<=45;j++)
				{
					if(j==gh[i].size) size+='<option selected="selected">'+j+'</option>';
					else size+='<option>'+j+'</option>';
				}
			}
			else if(gh[i].style_ItemID=="ao_khoac"||gh[i].style_ItemID=="ao_somi"||gh[i].style_ItemID=="ao_thun")
			{
				if(gh[i].size=="S") size+='<option selected="selected">S</option><option>M</option><option>L</option><option>XL</option>';
				else if(gh[i].size=="M") size+='<option>S</option><option selected="selected">M</option><option>L</option><option>XL</option>';
				else if(gh[i].size=="L") size+='<option>S</option><option>M</option><option selected="selected">L</option><option>XL</option>';
				else if(gh[i].size=="XL") size+='<option>S</option><option>M</option><option>L</option><option selected="selected">XL</option>';
			}
		if(gh[i].Promotional_Price!=" ") { 
			s+=k1+gh[i].id+k2+gh[i].id+k3+gh[i].image+k4+gh[i].Name+k5+gh[i].id+k6+gh[i].id+k7+size+k8+formatNumber(gh[i].Promotional_Price)+k9+gh[i].id+k17+gh[i].id+k10+gh[i].sl+k11+gh[i].id+k12+gh[i].id+k13+k14+formatNumber(gh[i].Promotional_Price)+k15+gh[i].id+k16;
		}/********/
		
		else{
			 s+=k1+gh[i].id+k2+gh[i].id+k3+gh[i].image+k4+gh[i].Name+k5+gh[i].id+k6+gh[i].id+k7+size+k8+formatNumber(gh[i].Normal_Price)+k9+gh[i].id+k17+gh[i].id+k10+gh[i].sl+k11+gh[i].id+k12+gh[i].id+k13+k14+formatNumber(gh[i].Normal_Price)+k15+gh[i].id+k16;}/********/
		size='';
	}
	localStorage.setItem("xuatsp",s);
}
function giohang(a)
{	
	var manggh = JSON.parse(localStorage.getItem("manggh")) || []; 
	for(var i=0;i<manggh.length;i++)
	{
		if(a==manggh[i].id) { alert("Sản phẩm này đã có trong giỏ hàng");
		exit();
		}
	}
	 var gh=[]; 
	for(var i=0;i<item.length;i++)
	{
		if(item[i].id==a) {if(item[i].size!=null) {item[i].size=document.getElementById("size").value;}
		manggh.push(item[i]);
		break;}
	}
	localStorage.setItem("manggh", JSON.stringify(manggh)); 
	hienthigiohang();
	dongctsp();
	for(var i=0;i<item.length;i++)
	{
		if(item[i].id==a)
		{
			item[i].sl=1;
			break;
		}
	}
}
function xoaspgh(a) 
{
	var gh=[];
	gh=JSON.parse(localStorage.getItem("manggh")); 
	for(var i=0;i<gh.length;i++)
	{
		if(gh[i].id==a) {gh.splice(i,1); 
		break;}
	}
	localStorage.setItem("manggh", JSON.stringify(gh)); 
	hienthigiohang();
	hienthidonhang();
	hienthi();
}
function tangsoluongsp(a)
{
	var sl = document.getElementById("input" + a).value;
	sl++;
	document.getElementById("input" + a).value=sl;
	var gh=[];
	gh=JSON.parse(localStorage.getItem("manggh")); 
	for(var i=0;i<gh.length;i++)
	{
		if(gh[i].id==a){gh[i].sl=sl;
		if(gh[i].Promotional_Price!=" ") {gh[i].tt=gh[i].Promotional_Price*sl;}
		else {gh[i].tt=gh[i].Normal_Price*sl;}
		break;}
	}
	localStorage.setItem("manggh", JSON.stringify(gh));
	hienthigiohang();
	hienthidonhang();
	hienthi();
}
function changeSL(a)/********/
{
	var sl = document.getElementById("input" + a).value;
	if (isNaN(sl) == true || sl.charAt(0)==' ' || sl.charAt(sl.length-1)==' ' ) {
		alert('Vui lòng nhập số');
		return false;
	}
	var gh=[];
	gh=JSON.parse(localStorage.getItem("manggh")); 
	for(var i=0;i<gh.length;i++)
	{
		if(gh[i].id==a){gh[i].sl=sl;
		if(gh[i].Promotional_Price!=" ") {gh[i].tt=gh[i].Promotional_Price*sl;}
		else {gh[i].tt=gh[i].Normal_Price*sl;}
		break;}
	}
	localStorage.setItem("manggh", JSON.stringify(gh));
	hienthigiohang();
	hienthidonhang();
	hienthi();
}
function giamsoluongsp(a)
{
	var sl = document.getElementById("input" + a).value;
	if(sl>1) {sl--;}
	document.getElementById("input" + a).value=sl;
	var gh=[];
	gh=JSON.parse(localStorage.getItem("manggh")); 
	for(var i=0;i<gh.length;i++)
	{
		if(gh[i].id==a){gh[i].sl=sl;
		if(gh[i].Promotional_Price!=" ") {gh[i].tt=gh[i].Promotional_Price*sl;}
		else 	{gh[i].tt=gh[i].Normal_Price*sl;}
		break;}
	}
	localStorage.setItem("manggh", JSON.stringify(gh));
	hienthigiohang();
	hienthidonhang();
	hienthi();
}
function chitietsp(object)
{
	a=object.id;
	var k1='',k2='',k3='',k4='',k5='',k6='',k7='',k8='',k9='',k10='',k11='';
	var k12='</b></span><span style="font-family:Tahoma; text-decoration: line-through rgb(39, 35, 35); ;font-size:10px; margin-left:50px"><b>';
	k1+='<div class="close" onclick="dongctsp()">'; //đóng ô ctsp
		k1+='<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';//CSS tạo hình dấu X
	k1+='</div>';
	k1+='<div class="magnify"><div class="large"></div>'; //phần bên trái ô ctsp
		k1+='<img src="'; //hình sp
		k2+='" class="small"/>';
	k2+='</div>';
	k2+='<div style="float:right; width:45%; height:550px">';//phần bên phải ô ctsp
		k2+='<p style="font-family:Tahoma; font-size:25px; margin-left:30px"><b>'; //tên sp
		k3+='</b></p>';
		k3+='<hr style="width:90px; height:7px; background:#FF0000; margin-left:30px; margin-top:15px" />'; //đường gạch chân đỏ
		k3+='<span class="chitietitem"><b>Giá:</b></span><span class="chitietitem1"><b> '; //giá sp
		k4+=' </b></span>';
		k4+='<div style="float:left; width:50%;height:120px">';
			k4+='<p class="chitietitem" id="sizesp"><b>Size</b></p>';	//size sp
	for(var i=0;i<item.length;i++)
	{
		if(item[i].id==a)
		{
			if(item[i].style_ItemID=="giay_adidas"||item[i].style_ItemID=="giay_nike"||item[i].style_ItemID=="giay_gucci"||item[i].style_ItemID=="quan_tay"||item[i].style_ItemID=="quan_jogger"||item[i].style_ItemID=="quan_kaki"||item[i].style_ItemID=="quan_jean")
			{
				k5+='<select style="width:100px; border:solid 2px;font-family:Tahoma; font-size:25px; margin-left:30px;margin-top:5px" id="size">';
				for(var j=36;j<=45;j++)
				{
					k5+='<option>'+j+'</option>'; //ô chọn size sp nếu sp là giày hoặc quần
				}
			}
			else if(item[i].style_ItemID=="ao_khoac"||item[i].style_ItemID=="ao_somi"||item[i].style_ItemID=="ao_thun")
			{
				k5+='<select style="width:100px; border:solid 2px;font-family:Tahoma; font-size:25px; margin-left:30px;margin-top:5px" id="size"><option>S</option><option>M</option><option>L</option><option>XL</option>'; //ô chọn size sp nếu sp là áo
			}
			else  k4='</b></span><div style="float:left; width:0%;height:120px"><p class="chitietitem" id="sizesp"><b></b></p>';//ngược lại nếu sp là phụ kiện thì ko có size
			break;
		}
	}
			k6+=' </select>';
		k6+='</div>';
		k6+='<div style="float:left; width:50%; height:120px">';
			k6+='<p class="chitietitem"><b>Màu</b></p>'; //màu sp
			k6+='<select style="width:100px; border:solid 2px;font-family:Tahoma; font-size:25px; margin-left:30px;margin-top:5px"><option>Đen</option><option>Trắng</option><option>Xanh</option></select>'; //ô chọn màu sp
		k6+='</div>';
		k6+='<p class="chitietitem" style="clear:both"><b>Số Lượng</b></p>';//số lượng sp
		k6+='<div class="chitietitem" style=" height:30px; width:200px; border: solid 2px; margin-top:5px">';
			k6+='<div style="border-left:none; width:29%; float:left" class="tanggiamsl" onclick="giamslsp('; /*ô giảm số lượng sp*/																																																																																																																																			    		k7+=');">-</div>';
			k7+='<div style="float: left; width:39%;text-align:center" id="sl'; /*ô ở giữa hiển thị số lượng sp*/
			k8+='">';
			k9='</div>';
			k9+='<div style="border-right:none; width:28.8%; float:right" class="tanggiamsl" onclick="tangslsp('; /*ô tăng số lượng sp*/		
			k10+=');">+</div>';
		k10+='</div>';
		k10+='<div class="btthemvaogh" onclick="giohang('; //nút thêm vào gh
		k11+=');">Thêm Vào Giỏ</div>';
	k11+='</div>';
	var s='';
	for(var i=0;i<item.length;i++)
	{
		if(item[i].id==a) {
			if(item[i].Promotional_Price==" ")
			{
				var gia=item[i].Normal_Price;
				s+=k1+document.getElementById("select" +a).src+k2+item[i].Name+k3+formatNumber(gia)+k4+k5+k6+item[i].id+k7+item[i].id+k8+item[i].sl+k9+item[i].id+k10+item[i].id+k11;
				break;
			}
			else{
				var gia=item[i].Promotional_Price;
				s+=k1+document.getElementById("select" +a).src+k2+item[i].Name+k3+formatNumber(gia)+k12+formatNumber(item[i].Normal_Price)+k4+k5+k6+item[i].id+k7+item[i].id+k8+item[i].sl+k9+item[i].id+k10+item[i].id+k11;
				break;
			}
			}
	}
	document.getElementById("ctsp").innerHTML=s;
	abc();
	document.getElementById("xemCTSP").style.display='block';
	document.getElementById("ctsp").style.display='block';
}
function abc(){
$(document).ready(function(){
 
    var native_width = 0;
    var native_height = 0;
 
    //Now the mousemove function
    $(".magnify").mousemove(function(e){
        //When the user hovers on the image, the script will first calculate
        //the native dimensions if they don't exist. Only after the native dimensions
        //are available, the script will show the zoomed version.
        if(!native_width && !native_height)
        {
            //This will create a new image object with the same image as that in .small
            //We cannot directly get the dimensions from .small because of the
            //width specified to 200px in the html. To get the actual dimensions we have
            //created this image object.
            var image_object = new Image();
            image_object.src = $(".small").attr("src");
			var t=image_object.src,index,a='';
			var m=t.split("/");
			for(var i=0;i<m.length;i++)
			{
				if(m[i]=='image') {index=i;
				break;}
			}
			for(var i=index;i<m.length;i++)
			{
				if(i==m.length-1) a+=m[i];
				else a+=m[i]+'/';
			}
			var q='url('+a+') no-repeat';

			$('.large').css('background',q);
             
            //This code is wrapped in the .load function which is important.
            //width and height of the object would return 0 if accessed before
            //the image gets loaded.
            native_width = image_object.width;
            native_height = image_object.height;
        }
        else
        {
            //x/y coordinates of the mouse
            //This is the position of .magnify with respect to the document.
            var magnify_offset = $(this).offset();
            //We will deduct the positions of .magnify from the mouse positions with
            //respect to the document to get the mouse positions with respect to the
            //container(.magnify)
            var mx = e.pageX - magnify_offset.left;
            var my = e.pageY - magnify_offset.top;
             
            //Finally the code to fade out the glass if the mouse is outside the container
            if(mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0)
            {
                $(".large").fadeIn(100);
            }
            else
            {
                $(".large").fadeOut(100);
            }
            if($(".large").is(":visible"))
            {
                //The background position of .large will be changed according to the position
                //of the mouse over the .small image. So we will get the ratio of the pixel
                //under the mouse pointer with respect to the image and use that to position the
                //large image inside the magnifying glass
                var rx = Math.round(mx/$(".small").width()*native_width - $(".large").width()/2)*-1;
                var ry = Math.round(my/$(".small").height()*native_height - $(".large").height()/2)*-1;
                var bgp = rx + "px " + ry + "px";
                 
                //Time to move the magnifying glass with the mouse
                var px = mx - $(".large").width()/2;
                var py = my - $(".large").height()/2;
                //Now the glass moves with the mouse
                //The logic is to deduct half of the glass's width and height from the
                //mouse coordinates to place it with its center at the mouse coordinates
                 
                //If you hover on the image now, you should see the magnifying glass in action
                $(".large").css({left: px, top: py, backgroundPosition: bgp});
            }
        }
    })
})
}
function dongctsp()
{
	document.getElementById("ctsp").style.display='none';
	document.getElementById("xemCTSP").style.display='none';
}
function tangslsp(a)
{
	for(var i=0;i<item.length;i++)
	{
		if(item[i].id==a)
		{
			var s=item[i].sl+1;
			if(item[i].Promotional_Price!=" ") {var tt=item[i].Promotional_Price*s;}
			else {var tt=item[i].Normal_Price*s;}
			item[i].sl=s;
			item[i].tt=tt;
			document.getElementById("sl" + a).innerHTML=item[i].sl;
			break;
		}
	}
}
function giamslsp(a)
{
	for(var i=0;i<item.length;i++)
	{
		if(item[i].id==a)
		{
			if(item[i].sl>1) {
			var s=item[i].sl-1;
			if(item[i].Promotional_Price!=" ") {var tt=item[i].Promotional_Price*s;}
			else {var tt=item[i].Normal_Price*s;}
			item[i].sl=s;
			item[i].tt=tt;
			document.getElementById("sl" + a).innerHTML=item[i].sl;
			}
			break;
		}
	}
}
function changeSize(a)
{
	var size=document.getElementById("changeSize" + a).value;
	var gh=[];
	gh=JSON.parse(localStorage.getItem("manggh"));
	for(var i=0;i<gh.length;i++)
	{
		if(gh[i].id==a) {gh[i].size=size;
		break;}
	}
	localStorage.setItem("manggh", JSON.stringify(gh));
	hienthigiohang();
	hienthidonhang();
	hienthi();
}
function chonsp(a)
{
	var thanhtoan = JSON.parse(localStorage.getItem("thanhtoan")) || [];
	var tc= localStorage.getItem("tc") || 0;
	if(typeof(tc)=="string") tc=Number(tc);
	var s=document.getElementById("chon" + a).value;
	var t=[];
	t=JSON.parse(localStorage.getItem("manggh"));
	if(s=="1") {
		for(var i=0;i<t.length;i++)
		{
			if(t[i].id==a) {
				if(t[i].Promotional_Price!=" ")
				{
					tc+=t[i].Promotional_Price;
				}
				else
				{
					tc+=t[i].Normal_Price;
				}
				thanhtoan.push(t[i]);
				break;
		}
		}
		document.getElementById("chon" + a).value="0";
	}
	else {
		for(var i=0;i<t.length;i++)
		{
			if(t[i].id==a) {tc-=t[i].tt;
			for(var j=0;j<thanhtoan.length;j++)
			{ 
				if(thanhtoan[j].id==a) {thanhtoan.splice(j,1);
					break;}
			}
			break;}
		}
		document.getElementById("chon" + a).value="1";
	}
	
	document.getElementById("tongcong").innerHTML=formatNumber(tc);
		localStorage.setItem("thanhtoan", JSON.stringify(thanhtoan));
		localStorage.setItem("tc", JSON.stringify(tc));
}
function hoadon(tongtien, sanpham, dateOrder, user)
{
	this.tongtien=tongtien;
	this.sanpham=sanpham;
	this.dateOrder=dateOrder;
	this.orderStatus="Chưa xử lí";
	this.user=user;
	var x = Math.floor((Math.random() * 10000000) + 10000000);
	this.idBill=x;
}
function thanhtoan()
{
	if(localStorage.getItem("userlogin")==null) {
	document.getElementById("login").style.display = 'block';
	document.getElementById("registration").style.display = 'none';
	document.getElementById("frame_login").style.display = 'block';
	}
	else {
	var userlogin=JSON.parse(localStorage.getItem("userlogin"));
	if(userlogin.role!="admin") {
		var tc=localStorage.getItem("tc");
		if(tc!=0) {
		var sp=JSON.parse(localStorage.getItem("thanhtoan"));
		var today = new Date();
		var date= today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
		var t1=JSON.parse(localStorage.getItem("manggh"));
		var t2=t1;
		for(var i=0;i<sp.length;i++)
			{
				for(var j=0;j<t1.length;j++)
				{
					if(sp[i].id==t1[j].id) {t2.splice(j,1);
					break;}
				}
			}
		localStorage.setItem("manggh", JSON.stringify(t2));
		var userlogin=JSON.parse(localStorage.getItem("userlogin"));
		var user=JSON.parse(localStorage.getItem("user"));
		var Hoadon =new hoadon(tc,sp,date,userlogin.username);
		for(var i=0;i<user.length;i++)
		{
			if(user[i].username==userlogin.username) {user[i].hoadon.push(Hoadon);
			break;}
		}
		localStorage.setItem("user", JSON.stringify(user));
		var mangHoaDon = JSON.parse(localStorage.getItem("mangHoaDon")) || []; 
		mangHoaDon.push(Hoadon);
		localStorage.setItem("mangHoaDon", JSON.stringify(mangHoaDon));
		dsdonhang();
		hienthigiohang();
		hienthi();
		alert("Đơn Đặt Hàng Của Bạn Đã Được Gửi Đi!");}
		else alert("Bạn Chưa Chọn Sản Phẩm Thanh Toán");}
		else alert("Không thể mua hàng bằng tài khoản này");
	}
}
function hienthiDSdonhang()
{
	var DSdonhang = JSON.parse(localStorage.getItem("DSdonhang"));
	var s ='';
	var k1='<div class="itemlist">';
	var k2='<div style="float:left; width:5%"><p style=" margin-left:20px">';
	var k3='</p></div>';
	var k4='<div style="float:left; width:20%"><p style=" margin-left:12px">';
	var k5='</p></div>';
	var k6='<div style="float:left; width:16%"><p style=" margin-left:12px">';
	var k7='</p></div>';
	var k8='<div style="float:left; width:20%"><p style=" margin-left:12px">';
	var k9='</p></div>';
	var k10='<div style="float:left; width:12%"><img src="image/2x/cancel.png" class="del" style="margin-left:50px" onclick="huydonhang(';
	var k11=');" /></div>';
	var k12='<div style="float:left; width:12%"><img src="image/del.jpg" class="del" style="margin-left:50px" onclick="xoadonhang(';
	var k13=');" /></div>';	
	var k14='<div style="float:left; width:15%"><p class="chitietdonhang" onclick="chitietDH(';
	var k15=');"><i>Chi tiết đơn hàng</i></p></div></div>';
	var t='<div style="float:left; width:12%"><p style="margin-left:60px">#</p></div>';
	for(var i=0;i<DSdonhang.length;i++)
	{
		if(DSdonhang[i].orderStatus=="Đã xử lí")
	 	{s+=k1+k2+(i+1)+k3+k4+DSdonhang[i].dateOrder+k5+k6+formatNumber(DSdonhang[i].tongtien)+k7+k8+DSdonhang[i].orderStatus+k9+k10+i+k11+k12+i+k13+k14+i+k15;}
		else {s+=k1+k2+(i+1)+k3+k4+DSdonhang[i].dateOrder+k5+k6+formatNumber(DSdonhang[i].tongtien)+k7+k8+DSdonhang[i].orderStatus+k9+k10+i+k11+t+k14+i+k15;}
	}
	localStorage.setItem("xuatDSdonhang",s);
}
function dsdonhang()
{	
	if(localStorage.getItem("userlogin")!=null) {
	var DSdonhang = [];
	var userlogin=JSON.parse(localStorage.getItem("userlogin"));
	var user=JSON.parse(localStorage.getItem("user"));
	for(var i=0;i<user.length;i++)
	{
		if(user[i].username==userlogin.username) {DSdonhang=user[i].hoadon;
		break;}
	}
	localStorage.setItem("DSdonhang", JSON.stringify(DSdonhang));
	hienthiDSdonhang();
	}
}
function huydonhang(a)
{
	var DSdonhang = JSON.parse(localStorage.getItem("DSdonhang"));
	if(DSdonhang[a].orderStatus=='Chưa xử lí') {
	var s='';
	s+='<p style="width:100%;text-align:center;font-family:Tahoma;font-size:20px;margin-top:20px;">Bạn có chắc chắn hủy đơn hàng này không?</p>';
	s+='<div class="btnxoaSP" onclick="XacNhanHuyDH1(';
	s+=a;
	s+=');">Có</div>';
	s+='<div class="btnxoaSP" onclick="XacNhanHuyDH2();">Không</div>';
	document.getElementById("xoasanpham").innerHTML=s;
	document.getElementById("huyDonHang").style.display='block';
	document.getElementById("xoasanpham").style.display='block';	
	}
	else alert("Không thể hủy đơn hàng vì đơn hàng này đã được xử lí");
}
function XacNhanHuyDH1(a)
{
	var DSdonhang = JSON.parse(localStorage.getItem("DSdonhang"));
	var huyDonHang=DSdonhang[a];
	DSdonhang.splice(a,1);
	localStorage.setItem("DSdonhang", JSON.stringify(DSdonhang));
	var userlogin=JSON.parse(localStorage.getItem("userlogin"));
	var user=JSON.parse(localStorage.getItem("user"));
	for(var i=0;i<user.length;i++)
	{
		if(user[i].username==userlogin.username) {user[i].hoadon=DSdonhang;
		break;}
	}
	localStorage.setItem("user", JSON.stringify(user));
	UpdateMangHoaDon(huyDonHang);
	XacNhanHuyDH2();
	alert("Hủy đơn hàng thành công");
	hienthiDSdonhang();
	hienthi();
}
function XacNhanHuyDH2()
{
	document.getElementById("huyDonHang").style.display='none';
	document.getElementById("xoasanpham").style.display='none';
}
function xoadonhang(a)
{
	var DSdonhang = JSON.parse(localStorage.getItem("DSdonhang"));
	if(DSdonhang[a].orderStatus!='Chưa xử lí') {
	DSdonhang.splice(a,1);
	localStorage.setItem("DSdonhang", JSON.stringify(DSdonhang));
	var userlogin=JSON.parse(localStorage.getItem("userlogin"));
	var user=JSON.parse(localStorage.getItem("user"));
	for(var i=0;i<user.length;i++)
	{
		if(user[i].username==userlogin.username) {user[i].hoadon=DSdonhang;
		break;}
	}
	localStorage.setItem("user", JSON.stringify(user));
	hienthiDSdonhang();
	hienthi();
	}
	else alert("Không thể xóa đơn hàng vì đơn hàng này chưa được xử lí");
}
function UpdateMangHoaDon(obj)
{
	var mangHoaDon = JSON.parse(localStorage.getItem("mangHoaDon"));
	for(var i=0;i<mangHoaDon.length;i++)
	{
		if(mangHoaDon[i].dateOrder==obj.dateOrder && mangHoaDon[i].orderStatus==obj.orderStatus && mangHoaDon[i].tongtien==obj.tongtien && mangHoaDon[i].user==obj.user && mangHoaDon[i].idBill==obj.idBill) { mangHoaDon.splice(i,1); 
		break;}
	}
	localStorage.setItem("mangHoaDon", JSON.stringify(mangHoaDon));
}
function chitietDH(a)
{
	var DSdonhang = JSON.parse(localStorage.getItem("DSdonhang"));
	var cacSP=[];
	cacSP=DSdonhang[a].sanpham;
	var s=hienthichitietDH();
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
	document.getElementById("ctsp").innerHTML=s + '</div>';
	document.getElementById("xemCTSP").style.display='block';
	document.getElementById("ctsp").style.display='block';
}
function hienthichitietDH()
{
	var s='';
	s+='<div class="close" onclick="dongctsp()">'; //đóng ô ctsp
	s+='<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';//CSS tạo hình dấu X
	s+='</div>';
	s+='<h2 style="margin-left:10%; padding-top:10px; font-family:Tahoma; font-size:22px">Chi Tiết Đơn Hàng</h2></br>';
	s+='<div style="margin-left: 10%;width:80%;height:40px"><div style="float:left; width:15%"><p style=" margin-left:10px"><b>Hình Ảnh</b></p></div>';
	s+='<div style="float:left; width:25%"><p style=" margin-left:12px"><b>Tên Sản Phẩm</b></p></div>';
	s+='<div style="float:left; width:10%"><p style=" margin-left:12px"><b>Size</b></p></div>';
	s+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Giá</b></p></div>';
	s+='<div style="float:left; width:15%"><p style=" margin-left:12px"><b>Số Lượng</b></p></div>';
	s+='<div style="float:left; width:20%"><p style=" margin-left:12px"><b>Tổng</b></p></div></div>';
	s+='<div class="list1">';
	return s;
}
