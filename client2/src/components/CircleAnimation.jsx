/* eslint-disable no-mixed-operators */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useRef, useState } from 'react';

function AnimatedCircles() {
  const TP = 2 * Math.PI;
  const CSIZE = 400;
  const [ctx, setCtx] = useState(null);
  const [hue, setHue] = useState(getRandomInt(0, 360));
  const [ca, setCa] = useState([new Circle(0, 0, 0, 0, 50, null)]);
  const [curves, setCurves] = useState([]);
  const [t, setT] = useState(0);
  const [inc, setInc] = useState(3);
  const [eg, setEg] = useState(Math.random() < 0.3);
  const [stopped, setStopped] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    const body = document.getElementsByTagName('body').item(0);
    body.style.background = '#000';
    if (!canvasRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = 2 * CSIZE;
    canvas.height = 2 * CSIZE;
    const context = canvas.getContext('2d');

    context.translate(CSIZE, CSIZE);
    context.lineCap = 'round';

    const resizeCanvas = () => {
      const D = Math.min(window.innerWidth, window.innerHeight) - 40;
      canvas.style.width = `${D}px`;
      canvas.style.height = `${D}px`;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    setCtx(context);
  }, [canvasRef.current, stopped, t, inc]);

  useEffect(() => {
    if (!ctx) return;

    const animate = () => {
      if (stopped) return;

      setT((prevT) => prevT + inc);

      if (!draw() || t < 0) {
        if (inc === 3) setInc(-8);
        else {
          ctx.strokeStyle = `hsla(${getRandomInt(0, 360)},90%,60%,0.6)`;
          setInc(3);
          setT(0);
          setEg(Math.random() < 0.3);
          setCircles();
        }
      }

      requestAnimationFrame(animate);
    };

    if (!stopped) {
      requestAnimationFrame(animate);
    }
  }, [ctx, stopped, t, inc]);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function Circle(x, y, xp, yp, radius, pc) {
    this.x = x;
    this.y = y;
    this.xp = xp;
    this.yp = yp;
    this.radius = radius;
    this.pc = pc;
    this.c = [];
    this.drawCircle = (rf) => {
      ctx.beginPath();
      ctx.moveTo(this.x + this.radius * rf, this.y);
      ctx.arc(this.x, this.y, this.radius * rf, 0, TP);
      ctx.fillStyle = `hsl(${hue + 5 * this.radius},90%,50%)`;
      ctx.fill();
    };
  }

  function Curve() {
    this.car = [];
    this.to = -getRandomInt(0, 400);
    this.addCurveCircle = (cir) => {
      if (cir.pc) {
        this.car.unshift(cir.pc);
        this.addCurveCircle(cir.pc);
      } else {

      }
    };
    this.setPath = () => {
      this.len = 0;
      this.path = new Path2D();
      this.path.moveTo(0, 0);
      this.path.lineTo(this.car[1].xp, this.car[1].yp);
      this.len += this.car[0].radius;
      for (let i = 1; i < this.car.length - 1; i++) {
        this.path.bezierCurveTo(
          this.car[i].x,
          this.car[i].y,
          this.car[i].x,
          this.car[i].y,
          this.car[i + 1].xp,
          this.car[i + 1].yp,
        );
        this.len += 2 * this.car[i].radius;
      }
      this.path.lineTo(
        this.car[this.car.length - 1].x,
        this.car[this.car.length - 1].y,
      );
      this.len += this.car[this.car.length - 1].radius;
    };
    this.drawCurve = () => {
      const tt = this.to + t;
      ctx.setLineDash([Math.max(1, tt), 4000]);
      ctx.stroke(this.path);
      if (tt > this.len + 40) {
        this.car[this.car.length - 1].drawCircle(0.8);
        if (tt > this.len + 120) return false;
        return true;
      } if (tt > this.len) {
        const raf = 0.8 * (tt - this.len) / 40;
        this.car[this.car.length - 1].drawCircle(raf);
        return true;
      }
      return true;
    };
  }

  function drawPoint(x, y, col) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, TP);
    ctx.closePath();
    if (col) ctx.fillStyle = col;
    else ctx.fillStyle = 'red';
    ctx.fill();
  }

  function cval(x, y, rad) {
    if ((x * x + y * y) ** 0.5 > CSIZE - rad) return false;
    for (let i = 0; i < ca.length; i++) {
      const rt = rad + ca[i].radius;
      const xd = ca[i].x - x;
      const yd = ca[i].y - y;
      if (Math.abs(xd) > rt) continue;
      if (Math.abs(yd) > rt) continue;
      if ((xd * xd + yd * yd) ** 0.5 + 1 < rt) {
        return false;
      }
    }
    return true;
  }

  function grow(rad) {
    const c = eg
      ? ca[ca.length - 1 - getRandomInt(0, ca.length)]
      : ca[getRandomInt(0, ca.length)];
    const a = TP * Math.random();
    const x = c.x + (c.radius + rad) * Math.cos(a);
    const y = c.y + (c.radius + rad) * Math.sin(a);
    if (cval(x, y, rad)) {
      const xp = c.x + c.radius * Math.cos(a);
      const yp = c.y + c.radius * Math.sin(a);
      const circle = new Circle(x, y, xp, yp, rad, c);
      c.c.push(circle);
      setCa((prevCa) => [...prevCa, circle]);
      return true;
    }
    return false;
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(-CSIZE, -CSIZE, 2 * CSIZE, 2 * CSIZE);
    let grown = 0;
    for (let i = 0; i < curves.length; i++) {
      if (curves[i].drawCurve()) grown++;
    }
    drawPoint(0, 0, 'silver');
    return grown;
  }

  function setCircles() {
    setCa([new Circle(0, 0, 0, 0, 50, null)]);
    for (let i = 0; i < 2000; i++) {
      let r = 10;
      if (i < 20) r = 42;
      else if (i < 100) r = 34;
      else if (i < 300) r = 26;
      else if (i < 1000) r = 18;
      grow(r);
    }
    const newCurves = [];
    for (let i = 0; i < ca.length; i++) {
      if (ca[i].c.length === 0) {
        const nc = new Curve();
        nc.car = [ca[i]];
        nc.addCurveCircle(ca[i]);
        nc.setPath();
        newCurves.push(nc);
      }
    }
    setCurves(newCurves);
  }

  const start = () => {
    setStopped((prevStopped) => !prevStopped);
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <button type="button" onClick={start}>Start/Stop</button>
    </div>
  );
}

export default AnimatedCircles;
