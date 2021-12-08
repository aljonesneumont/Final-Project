const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const url = `http://localhost:3000/api`

canvas.width = 1100;
canvas.height = 600;
let colors = ["#fde23e","#f16e23", "#57d9ff","#937e88"];

q1 = {
    name: 'Zeus',
    king: 0,
    bright: 0,
    master: 0,
    weather: 0,
    total: 0
}

q2 = {
    name: 'Shiva',
    country: 0,
    war: 0,
    family: 0,
    shaivism: 0,
    total: 0
}

q3 = {
    name: 'Tsu',
    moon: 0,
    wind: 0,
    sun: 0,
    night: 0,
    total: 0
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].zeus.toLowerCase() == 'king') {
                q1.king += 1
                q1.total += 1
            }
            if (data[i].zeus.toLowerCase() == 'bright') {
                q1.bright+= 1
                q1.total += 1
            }
            if (data[i].zeus.toLowerCase() == 'master') {
                q1.master += 1
                q1.total += 1
            }
            if (data[i].zeus.toLowerCase() == 'weather') {
                q1.weather += 1
                q1.total += 1
            }
            if (data[i].shiva.toLowerCase() == 'country') {
                q2.country += 1
                q2.total += 1
            }
            if (data[i].shiva.toLowerCase() == 'war') {
                q2.war += 1
                q2.total += 1
            }
            if (data[i].shiva.toLowerCase() == 'family') {
                q2.family += 1
                q2.total += 1
            }
            if (data[i].shiva.toLowerCase() == 'shaivism') {
                q2.shaivism += 1
                q2.total += 1
            }
            if (data[i].tsu.toLowerCase() == 'moon') {
                q3.moon += 1
                q3.total += 1
            }
            if (data[i].tsu.toLowerCase() == 'wind') {
                q3.wind += 1
                q3.total += 1
            }
            if (data[i].tsu.toLowerCase() == 'sun') {
                q3.sun += 1
                q3.total += 1
            }
            if (data[i].tsu.toLowerCase() == 'night') {
                q3.night += 1
                q3.total += 1
            }
        }
        pieChart(200,200, q1)
        pieChart(500,200, q2)
        pieChart(800,200, q3)
    })

const pieSlice = (x, y, startAngle, totalAngle, color) => {
    let size = 100;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.ellipse(x, y, size, size, 0, startAngle*(Math.PI/180), totalAngle*(Math.PI/180));
    ctx.closePath();
    ctx.fill();
}
const pieChart = (x, y, question) => {
    ctx.fillStyle = 'white'
    ctx.font = '12pt Verdana'
    let counter = 0;
    let startAngle = 0;
    for(let a in question){
        if (a == 'name') {
            ctx.fillText(question[a], x + 30 , y - 110)
        } else if( a != 'total') {
            pieSlice(x + 50, 200, startAngle, startAngle + angle(question[a], question['total']), colors[counter] )
            chartLegend(x, (y + 200) + 30* counter, colors[counter], a, question[a])
            startAngle += angle(question[a], question['total'])
            counter++
        }
    }
}

const angle = (amount, total) => {
    return Math.ceil(360*(amount / total))
}

const chartLegend = (x, y, color, label, value) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 20 , 20);
    ctx.fillText(label + ' - ' + value, x + 30, y + 15)
}

