let start = 0;
let counter = 0;
let start_interval, last_time;
const toggle_button = document.getElementById("pressed");

// Put saved history.
saved_time = { Day0: "00:00:01", Day1: "00:00:03", Day2: "00:00:01", Day3: "00:00:03" , Day4: "00:00:01", Day5: "00:00:03" , Day6: "00:00:01", Day7: "00:00:03"  }
let day = Object.keys(saved_time).length;

function toggle(){
    start = 1 - start;
    if(start){
        toggle_button.classList.add('active');
        toggle_button.innerText = "Stop";
        start_interval = setInterval(() => {
                            counter += 1;
                            let hours = Math.floor(counter/3600);
                            let minutes = Math.floor((counter%3600)/60);
                            let seconds = counter % 60;
                            last_time  = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                            document.getElementById("timer-text").innerHTML  = last_time;
                        }, 1000);
    }
    else{
        clearInterval(start_interval);
        toggle_button.classList.remove('active');
        toggle_button.innerText = "Start";
    }
}

// Reset everyday.
function reset(){
    start = 1; toggle();
    let key_day = "Day" + String(day); 
    saved_time[key_day] = last_time;
    counter = 0;
    document.getElementById("timer-text").innerHTML  = "00:00:00";
    console.log(saved_time);
    day += 1;
}

// Show history last 7 days by default.
window.onload = () => {
    const table = document.getElementById('data-table');
    const body = table.createTBody();
    for (let indx = day-1; indx >= Math.max(0, day-7); indx --) {
        const row = body.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        key = "Day" + String(indx)
        cell1.innerText = key;
        cell2.innerText = saved_time[key];
    }
};
