 let sharpChart;
        let sharp2Chart;
        let voltage = [65, 59, 80, 81, 56, 55, 20, 10, 240, 0];
        let amperages = [1, 5, 10, 15, 2, 8, 12, 3, 7, 9];

        function updateVoltage() {
            // ตรวจสอบว่าอาเรย์มีข้อมูล 10 ตัวหรือไม่
            if (voltage.length === 10) {
                voltage.shift(); // ลบข้อมูลตัวแรกออก
            }

            // สุ่มค่าใหม่ระหว่าง 1 ถึง 30
            const randomValue = Math.floor(Math.random() * 240) + 1;

            // เพิ่มค่าที่สุ่มลงในตัวท้ายของอาเรย์
            voltage.push(randomValue);
            return voltage;
        }

        function updateAmperages() {
            // ตรวจสอบว่าอาเรย์มีข้อมูล 10 ตัวหรือไม่
            if (amperages.length === 10) {
                amperages.shift(); // ลบข้อมูลตัวแรกออก
            }

            // สุ่มค่าใหม่ระหว่าง 1 ถึง 30
            const randomValue = Math.floor(Math.random() * 15) + 1;

            // เพิ่มค่าที่สุ่มลงในตัวท้ายของอาเรย์
            amperages.push(randomValue);
            return amperages;
        }


        function createSharp() {

            const ctxSharp = document.getElementById('sharpLineChart').getContext('2d');
            // ลบกราฟเดิมก่อนสร้างกราฟใหม่
            if (sharpChart) {
                sharpChart.destroy();
            }

            sharpChart = new Chart(ctxSharp, {
                type: 'line',
                data: {
                    labels: ['13:01:04', '13:01:08', '13:01:12', '13:01:25', '13:01:33', '13:01:40', '13:01:55', '13:02:04', '13:02:14', '13:03:02'], // ช่วงเวลา
                    datasets: [{
                        label: 'Voltage', // ชื่อของข้อมูล
                        data: updateVoltage(), // ค่าที่วัดได้
                        fill: false, // ไม่เติมสีด้านล่างกราฟ
                        borderColor: '#068FFF', // สีเส้นกราฟ
                        tension: 0 // เส้นตรงมุมแหลม
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true, // เปิดการแสดงผลข้อความ
                                text: 'ค่าแรงดันไฟฟ้าที่วัดได้ (Volt)', // ข้อความแกน Y
                                color: '#ffffff' // สีตัวอักษรของชื่อแกน Y
                            },
                            ticks: {
                                color: '#ffffff' // สีตัวอักษรของตัวเลขบนแกน Y
                            }
                        },
                        x: {
                            title: {
                                display: true, // เปิดการแสดงผลข้อความ
                                text: 'ช่วงเวลา', // ข้อความแกน X
                                color: '#ffffff' // สีตัวอักษรของชื่อแกน X
                            },
                            ticks: {
                                color: '#ffffff' // สีตัวอักษรของตัวเลขบนแกน X
                            }
                        }
                    }
                }
            });
        }

        function createSharp2() {
            const ctxSharp2 = document.getElementById('sharpLineChart2').getContext('2d');

            // ลบกราฟเดิมก่อนสร้างกราฟใหม่
            if (sharp2Chart) {
                sharp2Chart.destroy();
            }

            // สร้างกราฟใหม่
            sharp2Chart = new Chart(ctxSharp2, {
                type: 'line',
                data: {
                    labels: ['13:01:04', '13:01:08', '13:01:12', '13:01:25', '13:01:33', '13:01:40', '13:01:55', '13:02:04', '13:02:14', '13:03:02'], // ช่วงเวลา
                    datasets: [{
                        label: 'Ampere', // ชื่อของข้อมูล
                        data: updateAmperages(), // ค่าที่วัดได้
                        fill: false, // ไม่เติมสีด้านล่างกราฟ
                        borderColor: '#068FFF', // สีเส้นกราฟ
                        tension: 0 // เส้นตรงมุมแหลม
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'กระแสไฟฟ้าที่วัดได้ (Ampere)',
                                color: '#ffffff'
                            }, ticks: {
                                color: '#ffffff' // สีตัวอักษรของตัวเลขบนแกน Y
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'ช่วงเวลา',
                                color: '#ffffff'
                            },
                            ticks: {
                                color: '#ffffff' // สีตัวอักษรของตัวเลขบนแกน Y
                            }
                        }
                    }
                }
            });
        }