//クラス化する必要ないかも？
class CurrentTime {
    constructor() {
        this._interval();
    }
    _runTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const date = now.getDate();
        const dayOfWeek = now.getDay();
        const dayOfWeekStr = [
            "Sun.",
            "Mon.",
            "Tue.",
            "Wed.",
            "Thur.",
            "Fri.",
            "Sut.",
        ][dayOfWeek];
        const hour = now.getHours();
        const min = now.getMinutes();
        const sec = now.getSeconds();
        const padhour = String(hour).padStart(2, "0");
        const padmin = String(min).padStart(2, "0");
        const padsec = String(sec).padStart(2, "0");
        document.getElementById("main_now_countCurrent").innerHTML = `
    <p>
    <span>${year}/${
      month + 1
    }/${date} ( ${dayOfWeekStr} )</span><br> ${padhour}:${padmin}:${padsec}
    </p>
    `;
    }
    _interval() {
        setInterval(this._runTime, 1000);
    }
}