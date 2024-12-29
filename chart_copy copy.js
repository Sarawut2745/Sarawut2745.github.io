let sharpChart;
let sharp2Chart;
let voltage = [];
let amperages = [];
let time = [];

async function fetchData() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data?.Smart_Monitor_001?.Data || null;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function updateData() {
    const data = await fetchData();
    if (data) {
        const fetchedTime = data.Time;
        const fetchedVoltage = data.Voltage > 220 ? 220 : data.Voltage;
        const fetchedCurrent = data.Current > 1000 ? 0.33 : data.Current;

        // อัปเดต Time
        while (time.length < 10) {
            time.push(fetchedTime);
        }
        if (time.length === 10) {
            time.shift();
            time.push(fetchedTime);
        }

        // อัปเดต Voltage
        while (voltage.length < 10) {
            voltage.push(fetchedVoltage);
        }
        if (voltage.length === 10) {
            voltage.shift();
            voltage.push(fetchedVoltage);
        }

        // อัปเดต Amperages
        while (amperages.length < 10) {
            amperages.push(fetchedCurrent);
        }
        if (amperages.length === 10) {
            amperages.shift();
            amperages.push(fetchedCurrent);
        }
    }
}

// สร้างกราฟ Voltage
async function createSharp() {
    await updateData();

    const ctxSharp = document.getElementById('sharpLineChart').getContext('2d');
    if (sharpChart) {
        sharpChart.destroy();
    }

    sharpChart = new Chart(ctxSharp, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: 'Voltage',
                data: voltage,
                fill: false,
                borderColor: '#068FFF',
                tension: 0
            }]
        },
        options: {
            responsive: true,
            animation: false,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ค่าแรงดันไฟฟ้าที่วัดได้ (Volt)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                },
                x: {
                    title: {
                        display: true,
                        text: 'ช่วงเวลา',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                }
            }
        }
    });
}

// สร้างกราฟ Amperages
async function createSharp2() {
    await updateData();

    const ctxSharp2 = document.getElementById('sharpLineChart2').getContext('2d');
    if (sharp2Chart) {
        sharp2Chart.destroy();
    }

    sharp2Chart = new Chart(ctxSharp2, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: 'Ampere',
                data: amperages,
                fill: false,
                borderColor: '#068FFF',
                tension: 0
            }]
        },
        options: {
            responsive: true,
            animation: false,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'กระแสไฟฟ้าที่วัดได้ (Ampere)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                },
                x: {
                    title: {
                        display: true,
                        text: 'ช่วงเวลา',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                }
            }
        }
    });
}
