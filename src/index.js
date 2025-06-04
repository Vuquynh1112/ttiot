// Toast function
function toast({ title = "", message = "", type = "info", duration = 2000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
            main.removeChild(toast);
            clearTimeout(autoRemoveId);
        }
        };

        const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                        <div class="toast__icon">
                            <i class="${icon}"></i>
                        </div>
                        <div class="toast__body">
                            <h3 class="toast__title">${title}</h3>
                            <p class="toast__msg">${message}</p>
                        </div>
                        <div class="toast__close">
                            <i class="fas fa-times"></i>
                        </div>
                    `;
        main.appendChild(toast);
    }
    }

    function showToast() {
        toast({
        title: "Xin lỗi!",
        message: "Chức năng này vẫn còn đang xây dựng.",
        });
    }

    //current day, month
    const dayMonth = document.querySelector('.weather__currentday')
    var date = new Date()
    dayMonth.innerHTML = `${date.getDate()} THÁNG ${date.getMonth() + 1}`

    //timing
    let section = document.querySelector("section"),
  icons = document.querySelector(".icons");
  icons.onclick = ()=>{
    section.classList.toggle("dark");
  }
  // creating a function and calling it in every seconds
  setInterval(()=>{
    let date = new Date(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
    let d;
    d = hour < 12 ? "AM" : "PM"; //if hour is smaller than 12, than its value will be AM else its value will be pm
    hour = hour > 12 ? hour - 12 : hour; //if hour value is greater than 12 than 12 will subtracted ( by doing this we will get value till 12 not 13,14 or 24 )
    hour = hour == 0 ? hour = 12 : hour; // if hour value is  0 than it value will be 12
    // adding 0 to the front of all the value if they will less than 10
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    document.querySelector(".hour_num").innerText = hour;
    document.querySelector(".min_num").innerText = min;
    document.querySelector(".sec_num").innerText = sec;
    document.querySelector(".am_pm").innerText = d;
  }, 1000); // 1000 milliseconds = 1s


    //tab ui 
        const $ = document.querySelector.bind(document)
        const $$ = document.querySelectorAll.bind(document)

        const tabs = $$('.page-control')
        const panes = $$('.content')

        tabs.forEach((tab, index) => {
            const pane = panes[index]

            tab.onclick = function() {

            $('.page-control.active').classList.remove('active')
            $('.content.active').classList.remove('active')

            this.classList.add('active')
            pane.classList.add('active')
            }
        })

        //toggle button LIVING
        let toggles = document.querySelectorAll('.toggle');
        let toggleBtn = document.querySelectorAll('.toggle-btn');
        let wrapperBtn = document.querySelectorAll('.devices-wrapper');
        
        let deviceKeys = ["LIGHT1", "WIFI", "TV"]; // tên thiết bị
        
        toggleBtn.forEach((toggle, index) => {
            toggle.onclick = function () {
                toggles[index].classList.toggle('active');
                wrapperBtn[index].classList.toggle('active');
        
                let isActive = toggles[index].classList.contains('active');
        
                firebase.database().ref("/TT_IoT/LIVING").update({
                    [deviceKeys[index]]: isActive ? "ON" : "OFF"
                });
        
                if (deviceKeys[index] === "LIGHT1") {
                    const lampImg = document.querySelector('.den1-img');
                    lampImg.src = isActive
                        ? "./assets/img/den1_on.gif"
                        : "./assets/img/den1_off.gif";
                }
                if (deviceKeys[index] === "WIFI") {
                    const lampImg = document.querySelector('.wifi1-img');
                    lampImg.src = isActive
                        ? "./assets/img/wifi_on.gif"
                        : "./assets/img/wifi_off.png";
                }
                if (deviceKeys[index] === "TV") {
                    const lampImg = document.querySelector('.tv1-img');
                    lampImg.src = isActive
                        ? "./assets/img/tv1_on.gif"
                        : "./assets/img/tv_off.png";
                }
            };
        });
        //TOGGLE BUTTON KITCHEN
        let kitchenToggles = document.querySelectorAll('.kitchen-toggle');
        let kitchenToggleBtn = document.querySelectorAll('.kitchen-toggle-btn');
        let kitchenWrapperBtn = document.querySelectorAll('.kitchen-devices-wrapper');
        
        let kitchenDeviceKeys = ["LIGHT2", "WIFI2", "KITCHEN HOOD"]; // thiết bị trong khu vực KITCHEN
        
        kitchenToggleBtn.forEach((toggle, index) => {
            toggle.onclick = function () {
                kitchenToggles[index].classList.toggle('active');
                kitchenWrapperBtn[index].classList.toggle('active');
        
                let isActive = kitchenToggles[index].classList.contains('active');
        
                // Cập nhật trạng thái vào /TT_IoT/KITCHEN
                firebase.database().ref("/TT_IoT/KITCHEN").update({
                    [kitchenDeviceKeys[index]]: isActive ? "ON" : "OFF"
                });
                if (kitchenDeviceKeys[index] === "LIGHT2") {
                    const lampImg = document.querySelector('.den-img');
                    lampImg.src = isActive
                        ? "./assets/img/denon1.gif"
                        : "./assets/img/den1.png";
                }
                if (kitchenDeviceKeys[index] === "WIFI2") {
                    const lampImg = document.querySelector('.wifi-img');
                    lampImg.src = isActive
                        ? "./assets/img/wifi_on.png"
                        : "./assets/img/wifi_off.png";
                }
                if (kitchenDeviceKeys[index] === "KITCHEN HOOD") {
                    const lampImg = document.querySelector('.kitchenhood-img');
                    lampImg.src = isActive
                        ? "./assets/img/cooker_on.png"
                        : "./assets/img/cooker_off.png";
                }
            };
        });
    
        //TOGGLE BUTTON BEDROOM
        let bedroomToggles = document.querySelectorAll('.bedroom-toggle');
        let bedroomToggleBtn = document.querySelectorAll('.bedroom-toggle-btn');
        let bedroomWrapperBtn = document.querySelectorAll('.bedroom-devices-wrapper');
        
        let bedroomDeviceKeys = ["LIGHT3", "FAN", "TV3"]; // thiết bị trong khu vực BEDROOM
        
        bedroomToggleBtn.forEach((toggle, index) => {
            toggle.onclick = function () {
                bedroomToggles[index].classList.toggle('active');
                bedroomWrapperBtn[index].classList.toggle('active');
        
                let isActive = bedroomToggles[index].classList.contains('active');
        
                // Cập nhật trạng thái vào /TT_IoT/BEDROOM
                firebase.database().ref("/TT_IoT/BEDROOM").update({
                    [bedroomDeviceKeys[index]]: isActive ? "ON" : "OFF"
                });
                if (bedroomDeviceKeys[index] === "LIGHT3") {
                    const lampImg = document.querySelector('.lamp-img');
                    lampImg.src = isActive
                        ? "./assets/img/lamp_on.png"
                        : "./assets/img/lamp_off.png";
                }
                if (bedroomDeviceKeys[index] === "FAN") {
                    const fanImg = document.querySelector('.fan-img');
                    fanImg.src = isActive
                        ? "./assets/img/fan_on.png"
                        : "./assets/img/fan_off.png";
                }
                if (bedroomDeviceKeys[index] === "TV3") {
                    const fanImg = document.querySelector('.tv-img');
                    fanImg.src = isActive
                        ? "./assets/img/tv_on.png"
                        : "./assets/img/tv_off.png";
                }
            };
        });
        
//firebase

const firebaseConfig = {
    apiKey: "AIzaSyBuff4EY59tz9E0Zp8yD6otE5GtvTmOIDs",
    authDomain: "dht11-42c5b.firebaseapp.com",
    databaseURL: "https://dht11-42c5b-default-rtdb.firebaseio.com",
    projectId: "dht11-42c5b",
    storageBucket: "dht11-42c5b.firebasestorage.app",
    messagingSenderId: "824977824916",
    appId: "1:824977824916:web:ed93b3b1eb52e2d93e6881",
    measurementId: "G-W6VKDEHEM5"
  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

// Auto load Temperature-------------------------
firebase.database().ref("/TT_IoT/LIVING").on("value", function(snapshot) {
    var data = snapshot.val();
    document.getElementById("Distance").innerHTML = data["Distance"];
    console.log(data);
});

firebase.database().ref("/Sensor4").on("value", function(snapshot) {
    var nd = snapshot.val();  
    document.getElementById("Temperature4").innerHTML = nd["Temperature4"];
    console.log(nd);
});

firebase.database().ref("/Sensor4").on("value", function(snapshot) {
    var nd1 = snapshot.val();  
    document.getElementById("Temperature1").innerHTML = nd1["Temperature1"];
    console.log(nd1);
});

firebase.database().ref("/TT_IoT/KITCHEN").on("value", function(snapshot) {
    var khi = snapshot.val();
    document.getElementById("AnalogValue").innerHTML = khi["AnalogValue"];
    console.log(khi);
});

firebase.database().ref("/TT_IoT/KITCHEN").on("value", function(snapshot) {
    var kk = snapshot.val();
    document.getElementById("DigitalValue").innerHTML = kk["DigitalValue"];
    console.log(kk);
});

firebase.database().ref("/Sensor4").on("value", function(snapshot) {
    var da = snapshot.val();  
    document.getElementById("Humidity4").innerHTML = da["Humidity4"] ;
    console.log(da);
});

firebase.database().ref("/Sensor4").on("value", function(snapshot) {
    var da1 = snapshot.val();  
    document.getElementById("Humidity1").innerHTML = da1["Humidity1"] ;
    console.log(da1);
});

// Update device status when reload website
firebase.database().ref("/TT_IoT/LIVING").get().then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        let deviceStatus = snapshot.val();

        deviceKeys.forEach((key, index) => {
            const isOn = deviceStatus[key] === "ON";

            if (isOn) {
                toggles[index].classList.add('active');
                wrapperBtn[index].classList.add('active');
            } else {
                toggles[index].classList.remove('active');
                wrapperBtn[index].classList.remove('active');
            }

            if (key === "LIGHT1") {
                document.querySelector('.den1-img').src = isOn
                    ? "./assets/img/den1_on.gif"
                    : "./assets/img/den1_off.gif";
            } else if (key === "WIFI") {
                document.querySelector('.wifi1-img').src = isOn
                    ? "./assets/img/wifi_on.gif"
                    : "./assets/img/wifi_off.png";
            } else if (key === "TV") {
                document.querySelector('.tv1-img').src = isOn
                    ? "./assets/img/tv1_on.gif"
                    : "./assets/img/tv_off.png";
            }
        });
    } else {
        console.log("No data available!");
    }
});

// Update device status for KITCHEN when reload website
firebase.database().ref("/TT_IoT/KITCHEN").get().then((snapshot) => {
    if (snapshot.exists()) {
        console.log("KITCHEN:", snapshot.val());
        let kitchenStatus = snapshot.val();

        const kitchenKeys = ["LIGHT2", "WIFI2", "KITCHEN HOOD"];

        kitchenKeys.forEach((key, index) => {
            const isOn = kitchenStatus[key] === "ON";

            if (isOn) {
                kitchenToggles[index].classList.add('active');
                kitchenWrapperBtn[index].classList.add('active');
            } else {
                kitchenToggles[index].classList.remove('active');
                kitchenWrapperBtn[index].classList.remove('active');
            }

            if (key === "LIGHT2") {
                document.querySelector('.den-img').src = isOn
                    ? "./assets/img/denon1.gif"
                    : "./assets/img/den1.png";
            } else if (key === "WIFI2") {
                document.querySelector('.wifi-img').src = isOn
                    ? "./assets/img/wifi_on.png"
                    : "./assets/img/wifi_off.png";
            } else if (key === "KITCHEN HOOD") {
                document.querySelector('.kitchenhood-img').src = isOn
                    ? "./assets/img/cooker_on.png"
                    : "./assets/img/cooker_off.png";
            }
        });
    } else {
        console.log("No data available for KITCHEN!");
    }
});


// Update device status for BEDROOM when reload website
firebase.database().ref("/TT_IoT/BEDROOM").get().then((snapshot) => {
    if (snapshot.exists()) {
        console.log("BEDROOM:", snapshot.val());
        let bedroomStatus = snapshot.val();

        const bedroomKeys = ["LIGHT3", "FAN", "TV3"];

        bedroomKeys.forEach((key, index) => {
            const isOn = bedroomStatus[key] === "ON";

            if (isOn) {
                bedroomToggles[index].classList.add('active');
                bedroomWrapperBtn[index].classList.add('active');
            } else {
                bedroomToggles[index].classList.remove('active');
                bedroomWrapperBtn[index].classList.remove('active');
            }

            // Xử lý ảnh thiết bị
            if (key === "LIGHT3") {
                document.querySelector('.lamp-img').src = isOn
                    ? "./assets/img/lamp_on.png"
                    : "./assets/img/lamp_off.png";
            } else if (key === "FAN") {
                document.querySelector('.fan-img').src = isOn
                    ? "./assets/img/fan_on.png"
                    : "./assets/img/fan_off.png";
            } else if (key === "TV3") {
                document.querySelector('.tv-img').src = isOn
                    ? "./assets/img/tv_on.png"
                    : "./assets/img/tv_off.png";
            }
        });
    } else {
        console.log("No data available for BEDROOM!");
    }
});

// Cập nhật trạng thái cảnh báo
function updateWarning(distance) {
    const bulb = document.getElementById("warningBulb");
    if (!bulb) return;

    if (distance < 3) {
        bulb.classList.add("blinking");
        bulb.style.color = "red";
    } else {
        bulb.classList.remove("blinking");
        bulb.style.color = "gray";
    }
}

    function updateWarning(distance) {
        const bulb = document.getElementById("warningBulb");
        if (distance < 3) {
            bulb.classList.add("blinking");
        } else {
            bulb.classList.remove("blinking");
            bulb.style.color = "gray"; // Không nhấp nháy khi an toàn
        }
    }

    // Ví dụ cập nhật khoảng cách và gọi hàm kiểm tra:
    function simulateDistanceReading() {
        let distance = Math.random() * 10; // giả lập khoảng cách
        document.getElementById("Distance").innerText = distance.toFixed(2);
        updateWarning(distance);
    }

    setInterval(simulateDistanceReading, 1000); // mỗi giây đọc lại khoảng cách

 











