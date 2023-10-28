class EJOraAnalog {
  constructor(id) {
    this.displayDiv = document.getElementById(id);
    this.containerDivId = "continerDiv";
    this.containerDivSize = 100;
    this.circleRadius = 28;
  }

  constructDiv(id, cl, w, h, bgc) {
    let myDiv = document.createElement("div");
    myDiv.setAttribute("id", id);
    myDiv.setAttribute("class", cl);
    myDiv.style.backgroundColor = bgc;
    if (id == this.containerDivId) {
      myDiv.style.width = w + "vh";
      myDiv.style.height = h + "vh";
      myDiv.style.position = "relative";
      myDiv.style.margin = "auto";
      myDiv.style.transform = "rotate(-90deg)";
      this.displayDiv.appendChild(myDiv);     
      this.containerDiv = myDiv;
    } else {
      myDiv.style.position = "absolute";
      myDiv.style.width = w + "%";
      myDiv.style.height = h + "%";
      myDiv.style.top = 50 - h / 2 + "%";
      myDiv.style.left = 50 + "%";
      myDiv.style.transform = "translate(-50%, -50%)";
      this.containerDiv.appendChild(myDiv);
    }
    return myDiv;
  }

  constructNum() {
    let deg = 90;
    for (let i = 1; i < 13; i++) {
      let dot = this.constructDiv(i, "numbers", 8, 8, "black");
      dot.innerHTML = "<p>" + i + "</p>";
      let x = Math.round(
        this.circleRadius * Math.cos(((2 * Math.PI) / 12) * i)
      );
      let y = Math.round(
        this.circleRadius * Math.sin(((2 * Math.PI) / 12) * i)
      );
      dot.style.left = x + 50 + "%";
      dot.style.top = y + 50 + "%";
      dot.style.borderRadius = "50%";
      dot.style.textAlign = "center";
      dot.style.fontSize = "3vh";
      dot.style.lineHeight = "2vh";
      dot.style.color = "white";
      dot.style.transformOrigin = "0% 0%";
      deg += 30;
      dot.style.transform = "rotate(" + deg + "deg) translate(-50%, 50%)";
    }
  }

  constructMiddlePoint() {
    this.MP = this.constructDiv("Oranalog", "co", 10, 10, "black");
    this.MP.style.borderRadius = "50%";
    this.MP.style.transformOrigin = "0% 50%";
    this.MP.style.transform = "translateX(-50%)";
    this.MP.setAttribute(
      "onclick",
      "myOraAnalog.openFullscreen('" + this.displayDiv.id + "')"
    );
  }

  constructHeands() {
    this.HH = this.constructDiv("HH", "cont", 25, 10, "transparent");
    this.MH = this.constructDiv("MH", "cont", 35, 5, "transparent");
    this.SH = this.constructDiv("SH", "cont", 40, 1, "white");
  }

  runOraAnalog() {
    let d = new Date();
    let milisecond = d.getMilliseconds() / 1000;
    //Digital
    let second = d.getSeconds() / 60;
    //Analog
    let minute = (second + d.getMinutes()) / 60;
    let hour = (minute + d.getHours()) / 12;
    this.SH.style.transformOrigin = "0% 50%";
    this.SH.style.transform = "rotate(" + second * 360 + "deg)";
    this.MH.style.transformOrigin = "0% 50%";
    this.MH.style.transform = "rotate(" + minute * 360 + "deg)";
    this.HH.style.transformOrigin = "0% 50%";
    this.HH.style.transform = "rotate(" + hour * 360 + "deg)";
  }

  openFullscreen(myEl) {
    var elem = document.getElementById(myEl);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }

  render() {
    this.displayDiv.style.backgroundColor = "red";
    this.constructDiv(
      this.containerDivId,
      "containerOraAnalog",
      this.containerDivSize,
      this.containerDivSize,
      "red"
    );
    this.constructNum();
    this.constructHeands();
    setInterval(
      function () {
        this.runOraAnalog();
      }.bind(this),
      10
    );
    this.constructMiddlePoint();
  }
}
const myOraAnalog = new EJOraAnalog("main");
myOraAnalog.render();
