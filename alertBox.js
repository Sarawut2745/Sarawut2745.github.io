// ฟังก์ชันแปลงวันที่เป็นรูปแบบภาษาไทย
function formatDateToThai(dateString) {
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const date = new Date(dateString); // แปลงจากสตริงเป็น Date object
  const day = date.getDate(); // วัน
  const month = months[date.getMonth()]; // เดือนในภาษาไทย
  const year = date.getFullYear() + 543; // ปีพ.ศ. (เพิ่ม 543 ปี)

  return `${day} ${month} ${year}`;
}

// ฟังก์ชันดึงข้อมูลจาก API
async function fetchDeviceData() {
  const apiURL =
    "https://esp32-f1440-default-rtdb.asia-southeast1.firebasedatabase.app/Devices.json";
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data && data.Smart_Monitor_001) {
      const deviceData = data.Smart_Monitor_001.Data;
      const deviceID = data.Smart_Monitor_001.ID;
      return { deviceData, deviceID };
    }

    return null; // ถ้าไม่พบข้อมูล
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// ฟังก์ชันตรวจสอบค่า leakageCurrent
let previousLeakageCurrent = 0; // เก็บสถานะก่อนหน้าเริ่มต้นเป็น 0

async function checkLeakageCurrent() {
  const deviceInfo = await fetchDeviceData(); // ดึงข้อมูลจาก API พร้อมกัน
  if (!deviceInfo) {
    console.log("ไม่สามารถดึงข้อมูลจาก API ได้");
    return;
  }

  const { deviceData, deviceID } = deviceInfo;
  const leakageCurrent = deviceData ? deviceData.leakageCurrent : null; // ตรวจสอบว่ามีค่า leakageCurrent หรือไม่

  // กำหนดค่า Current หากมันมากกว่า 1000
  const currentValue = deviceData.Current > 1000 ? 0.33 : deviceData.Current;

  // หากค่า leakageCurrent เป็น 1 และสถานะก่อนหน้าเป็น 0
  if (leakageCurrent === 1 && previousLeakageCurrent === 0) {
    // ลบ div ที่มี id = notification-none
    const notificationNoneElement =
      document.getElementById("notification-none");
    if (notificationNoneElement) {
      notificationNoneElement.remove(); // ลบ element ออกจาก DOM
    }

    // หากค่า leakageCurrent เป็น 1 ให้เพิ่มข้อมูล
    let formattedDate = formatDateToThai(deviceData.Date); // แปลงวันที่จาก API

    let alertMessage = `
            <div class="bg-gray-700 text-white flex flex-col space-y-2 mb-4 lg rounded-lg shadow-lg p-3">
                <h4 class="text-lg font-semibold text-red-600">⚠️ ตรวจพบไฟฟ้ารั่ว ⚠️</h4>
                <span><strong>ชื่ออุปกรณ์:</strong> ${
                  deviceID || "ไม่ทราบ"
                }</span>
                <span><strong>ตำแหน่งที่ติดตั้ง:</strong> ${
                  deviceData.InstallationLocation || "ไม่ระบุ"
                }</span>
                <span><strong>กระแสไฟฟ้าที่วัดได้:</strong> ${currentValue} A</span>
                <span><strong>วันที่:</strong> ${formattedDate}</span>
                <span><strong>เวลา:</strong> ${deviceData.Time}</span>
            </div>
        `;

    // เพิ่มข้อมูลใหม่เข้าไปใน element ที่มี id เป็น alert_message
    document.getElementById("alert_message").innerHTML += alertMessage; // ใช้ += เพื่อเพิ่มข้อมูลใหม่แทนการลบข้อมูลเดิม
  }

  // หากค่า leakageCurrent กลับมาเป็น 1 หลังจากที่เป็น 0
  if (leakageCurrent === 1 && previousLeakageCurrent === 0) {
    previousLeakageCurrent = 1; // อัปเดตสถานะเป็น 1
  }
  // หากค่า leakageCurrent เป็น 0 และก่อนหน้านี้เป็น 1
  else if (leakageCurrent === 0 && previousLeakageCurrent === 1) {
    previousLeakageCurrent = 0; // อัปเดตสถานะเป็น 0
  }
}

// เรียกฟังก์ชัน checkLeakageCurrent ทุก ๆ 3 วินาที
setInterval(checkLeakageCurrent, 3000);
