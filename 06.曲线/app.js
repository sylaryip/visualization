import { Vector2D } from '../common/lib/vector2d.js';
import { parametric } from '../common/lib/parametric.js';


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(1, -1);
function init() {
    drawCoordinate();
    // draw(regularShape(3, 128, 128, 100), { strokeStyle: 'red' });
    // draw(regularShape(6, -64, 128, 50));

    // draw(regularShape(11, -64, -64, 30));
    // draw(regularShape(60, 128, -64, 6));

    // draw(arc(0, 0, 100), { strokeStyle: 'blue' });
    // draw(arc(0, 0, 200, Math.PI / 3, Math.PI / 2), { strokeStyle: 'blue', fillStyle: 'blue' });

    // draw(ellipse(0, 0, 100, 50));

    // draw(parabola(0, -100, 1, -25.5, 25.5), { strokeStyle: 'green' });


    // const para = parametric(t => 25 * t, t => 25 * t ** 2);
    // para(-5.5, 5.5).draw(ctx, { strokeStyle: '#F007', fillStyle: '#F007' });

    // const helical = parametric(
    //     (t, l) => l * t * Math.cos(t),
    //     (t, l) => l * t * Math.sin(t),
    // );

    // helical(0, 50, 500, 5).draw(ctx, { strokeStyle: 'blue' });

    // const star = parametric(
    //     (t, l) => l * Math.cos(t) ** 3,
    //     (t, l) => l * Math.sin(t) ** 3,
    // );

    // star(0, Math.PI * 2, 50, 150).draw(ctx, { strokeStyle: 'red' });

    drawQuadricBezier();
    drawCubicBezier();
}

function drawQuadricBezier() {
    const quadricBezier = parametric(
        (t, [{ x: x0 }, { x: x1 }, { x: x2 }]) => (1 - t) ** 2 * x0 + 2 * t * (1 - t) * x1 + t ** 2 * x2,
        (t, [{ y: y0 }, { y: y1 }, { y: y2 }]) => (1 - t) ** 2 * y0 + 2 * t * (1 - t) * y1 + t ** 2 * y2,
    );
    const p0 = new Vector2D(0, 0);
    const p1 = new Vector2D(100, 0);
    p1.rotate(0.75);
    const p2 = new Vector2D(200, 0);
    const count = 30;
    for (let i = 0; i < count; i++) {
        // 绘制30条从圆心出发，旋转不同角度的二阶贝塞尔曲线
        p1.rotate(2 / count * Math.PI);
        p2.rotate(2 / count * Math.PI);
        quadricBezier(0, 1, 100, [
            p0,
            p1,
            p2,
        ]).draw(ctx, { strokeStyle: 'rgba(255,0,0,0.5)' });
    }
}

function drawCubicBezier() {
    const cubicBezier = parametric(
        (t, [{ x: x0 }, { x: x1 }, { x: x2 }, { x: x3 }]) => (1 - t) ** 3 * x0 + 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * x3,
        (t, [{ y: y0 }, { y: y1 }, { y: y2 }, { y: y3 }]) => (1 - t) ** 3 * y0 + 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3 * y3,
    );

    const p0 = new Vector2D(0, 0);
    const p1 = new Vector2D(100, 0);
    p1.rotate(0.75);
    const p2 = new Vector2D(150, 0);
    p2.rotate(-0.75);
    const p3 = new Vector2D(200, 0);
    const count = 30;
    for (let i = 0; i < count; i++) {
        p1.rotate(2 / count * Math.PI);
        p2.rotate(2 / count * Math.PI);
        p3.rotate(2 / count * Math.PI);
        cubicBezier(0, 1, 100, [
            p0, p1, p2, p3,
        ]).draw(ctx, { strokeStyle: 'rgba(0,255,0,0.8)' });
    }
}


function drawCoordinate() {
    ctx.save();
    ctx.strokeStyle = '#ccc';
    ctx.beginPath();
    ctx.moveTo(-canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, 0);
    ctx.stroke();

    ctx.moveTo(0, -canvas.height / 2);
    ctx.lineTo(0, canvas.height / 2);
    ctx.stroke();
    ctx.restore();
}

function regularShape(edges = 3, x, y, step) {
    const ret = [];
    const delta = Math.PI * (1 - (edges - 2) / edges);
    let p = new Vector2D(x, y);
    const dir = new Vector2D(step, 0);
    ret.push(p);
    for (let i = 0; i < edges; i++) {
        p = p.copy().add(dir.rotate(delta));
        ret.push(p);
    }
    return ret;
}


const TAU_SEGMENTS = 60;
const TAU = Math.PI * 2;
function arc(x0, y0, radius, startAng = 0, endAng = Math.PI * 2) {
    const ang = Math.min(TAU, endAng - startAng);
    const ret = ang === TAU ? [] : [[x0, y0]];
    const segments = Math.round(TAU_SEGMENTS * ang / TAU);
    for (let i = 0; i <= segments; i++) {
        const x = x0 + radius * Math.cos(startAng + ang * i / segments);
        const y = y0 + radius * Math.sin(startAng + ang * i / segments);
        ret.push([x, y]);
    }
    return ret;
}

function ellipse(x0, y0, radiusX, radiusY, startAng = 0, endAng = Math.PI * 2) {
    const ang = Math.min(TAU, endAng - startAng);
    const ret = ang === TAU ? [] : [[x0, y0]];
    const segments = Math.round(TAU_SEGMENTS * ang / TAU);
    for (let i = 0; i <= segments; i++) {
        const x = x0 + radiusX * Math.cos(startAng + ang * i / segments);
        const y = y0 + radiusY * Math.sin(startAng + ang * i / segments);
        ret.push([x, y])
    }
    return ret;
}

const LINE_SEGMENTS = 60;
function parabola(x0, y0, p, min, max) {
    const ret = [];
    for (let i = 0; i <= LINE_SEGMENTS; i++) {
        const s = i / LINE_SEGMENTS;
        const t = min * (1 - s) + max * s;
        const x = x0 + 2 * p * t ** 2;
        const y = y0 + 2 * p * t;
        ret.push([x, y]);
    }
    return ret;
}

function draw(points, {
    strokeStyle = 'black',
    fillStyle = null,
    close = false,
} = {}) {
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(...points[i]);
    }
    if (close) ctx.closePath();
    if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
    ctx.stroke();
}

init();