const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const url = `http://localhost:3000/api`

canvas.width = 800;
canvas.height = 600;
let colors = ["#fde23e","#f16e23", "#57d9ff","#937e88"];

q1 = {
    name: 'Zeus',
    king: 0,
    bright: 0,
    master: 0,
    weather: 0,
    total: 0
};

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
        drawPieChart(data, colors)
        
    })

    var drawPieChart = function(data, colors) {
        var x = canvas.width / 3;
            y = canvas.height / 3;
        var color,
            startAngle,
            endAngle,
            total = getTotal(data);
        
        for(var i=0; i<data.length; i++) {
            color = colors[i];
            startAngle = calculateStart(data, i, total);
            endAngle = calculateEnd(data, i, total);
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.moveTo(x, y);
            ctx.arc(x, y, y-100, startAngle, endAngle);
            ctx.fill();
            ctx.rect(canvas.width - 200, y - i * 30, 12, 12);
            ctx.fill();
            ctx.font = "12px Verdana";
          ctx.fillText(data[i].label + " - " + data[i].value , canvas.width - 200 + 20, y - i * 30 + 10);
        }
    };
    
    
    var getTotal = function(data) {
        var sum = 0;
        for(var i=0; i<data.length; i++) {
            sum += data[i].value;
        }
            
        return sum;
    };
    
    var calculateStart = function(data, index, total) {
        if(index === 0) {
            return 0;
        }
        
        return calculateEnd(data, index-1, total);
    };
    
    var calculateEndAngle = function(data, index, total) {
        var angle = data[index].value / total * 360;
        var inc = ( index === 0 ) ? 0 : calculateEndAngle(data, index-1, total);
        
        return ( angle + inc );
    };
    
    var calculateEnd = function(data, index, total) {
        
        return degreeToRadians(calculateEndAngle(data, index, total));
    };
    
    var degreeToRadians = function(angle) {
        return angle * Math.PI / 180
    }
    
    let data = [
        {label: 'King' , value: q1.king},
        {label: 'Bright' , value: q1.bright},
        {label: 'Master' , value: q1.master},
        {label: 'Weather' , value: q1.weather}
    ];
