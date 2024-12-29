
const apiURL = "https://esp32-f1440-default-rtdb.asia-southeast1.firebasedatabase.app/Devices.json";

// ฟังก์ชันสำหรับดึงข้อมูลจาก API
async function fetchData() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data && data.Smart_Monitor_001) {
      const deviceData = data.Smart_Monitor_001.Data;
      const deviceID = data.Smart_Monitor_001.ID;

      // อัปเดตข้อมูลใน DOM (หากต้องการ)
      document.getElementById('device_name').innerText = `${deviceID}`;

      // รีเทิร์นข้อมูลทั้งหมด
      return deviceData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function fetchDeviceID() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data && data.Smart_Monitor_001) {
      const deviceID = data.Smart_Monitor_001.ID; // ดึงแค่ deviceID
      
      // รีเทิร์นข้อมูล deviceID
      return deviceID;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// เรียกฟังก์ชัน fetchDeviceID
fetchDeviceID();