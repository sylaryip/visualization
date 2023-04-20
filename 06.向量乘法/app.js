import { Vector2D } from '../common/lib/vector2d.js';

const v = new Vector2D(50, 200);
// v.dir -> Math.atan2(v.y, v.x);
// 60 ~ 120 pp 之间
const isInRange = v.dir > Math.PI / 3 && v.dir < 2 / 3 * Math.PI;
console.log(isInRange);

const v1 = new Vector2D(0.1, 1);
const isInRange2 = Math.abs(new Vector2D(0, 1).cross(v1.normalize())) <= 0.5;
console.log(isInRange2, v1.normalize());
