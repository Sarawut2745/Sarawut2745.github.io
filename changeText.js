let lastTime = null; // ประกาศตัวแปร lastTime ให้เริ่มต้นเป็น null

async function checkDeviceStatus() {
  let data = await fetchData(); // ดึงค่า Time จาก API
  let currentTime = data ? data.Time : null; // ตรวจสอบว่า data มีค่าหรือไม่
  console.log(currentTime);

  if (currentTime) {
    const statusElement = document.getElementById("status_device");
    const statusVoltage = document.getElementById("voltageDeviceStatus");
    const statusCurrent = document.getElementById("currentDeviceStatus");
    const statusAiCamera = document.getElementById("aiCameraDeviceStatus");

    if (lastTime === null) {
      // ยังไม่ทำอะไรในครั้งแรก
    } else {
      if (currentTime === lastTime) {
        // ออฟไลน์
        statusElement.innerHTML = `สถานะ : <span class="text-red-600 font-bold">ออฟไลน์</span>`;
        
        // แสดงสถานะอุปกรณ์ "ไม่ทำงาน" เป็นสีแดง
        statusVoltage.innerHTML = `อุปกรณ์ตรวจจับแรงดันไฟฟ้า : <span style="color: red;">ไม่ทำงาน</span>`;
        statusCurrent.innerHTML = `อุปกรณ์ตรวจจับกระแสไฟฟ้า : <span style="color: red;">ไม่ทำงาน</span>`;
        statusAiCamera.innerHTML = `กล้อง AI (Object Detection) : <span style="color: red;">ไม่ทำงาน</span>`;
      } else {
        // ออนไลน์
        statusElement.innerHTML = `สถานะ : <span class="text-green-500 font-bold">ออนไลน์</span>`;
        
        // แสดงสถานะอุปกรณ์ "ทำงาน" เป็นสีเขียว
        statusVoltage.innerHTML = `อุปกรณ์ตรวจจับแรงดันไฟฟ้า : <span style="color: lime;">ทำงาน</span>`;
        statusCurrent.innerHTML = `อุปกรณ์ตรวจจับกระแสไฟฟ้า : <span style="color: lime;">ทำงาน</span>`;
        statusAiCamera.innerHTML = `กล้อง AI (Object Detection) : <span style="color: lime;">ทำงาน</span>`;
      }
    }

    // อัปเดตค่า Time ก่อนหน้า
    lastTime = currentTime;
  } else {
    console.error("ไม่สามารถดึงค่า Time ได้");
  }
}
