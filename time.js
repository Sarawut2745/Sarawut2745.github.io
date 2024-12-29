// ฟังก์ชันแสดงวันที่
function displayDate() {
  const monthsThai = [
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

  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0"); // เติม 0 ข้างหน้าหากเป็นตัวเลขหลักเดียว
  const month = monthsThai[today.getMonth()]; // ดึงชื่อเดือนภาษาไทย
  const year = today.getFullYear() + 543; // เปลี่ยน ค.ศ. เป็น พ.ศ.

  const formattedDate = `วันที่ ${day} ${month} ${year}`;
  document.getElementById("date-text").textContent = formattedDate;
}

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}:${seconds} นาฬิกา`;
  document.getElementById("time-display").textContent = formattedTime;
}