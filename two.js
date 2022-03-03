const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const { contrastRatio } = require('canvas-sketch-util/color');

const settings = {
  dimensions: [1080, 1080],
  // animation: true,
};

const sketch = () => {
  return ({ context, width, height }) => {
    const BG_COLOR = 'hsl(250deg, 20%, 90%)';

    const degToRad = (deg) => deg / 180 * Math.PI;

    context.lineWidth = width * .009;

    context.fillStyle = BG_COLOR;
    context.fillRect(0, 0, width, height);

    const cx = width * .5;
    const cy = height * .5;

    let w = width * .01;
    let h = height * .1;
    let x, y;

    const radius = width * .3;
    const piece = 35;
    for (let i = 0; i < piece; i++) {
      const SUBJECT_COLOR = `hsl(${random.range(0, 250)}deg, ${random.range(50, 80)}%, ${random.range(3, 35)}%)`;
      const STROKE_COLOR = `hsl(${random.range(0, 250)}deg, ${random.range(50, 80)}%, ${random.range(3, 35)}%)`;
      const slice = math.degToRad(360 / piece);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      console.log(`x: ${x} y: ${y}`)

      context.save();
      context.fillStyle = SUBJECT_COLOR;
      context.translate(x, y)
      context.rotate(-angle)

      if (Math.random() < .1) {
        context.scale(random.range(0, 5), random.range(0, 5))
        context.beginPath();
        context.rect(-w * .5, -h * .5, w, h)
        context.fill();
        // context.stroke()
      }
      context.restore();

      context.save()
      context.translate(cx, cy);
      context.rotate(-angle);

      context.scale(1, 1)
      context.beginPath();
      context.strokeStyle = STROKE_COLOR
      context.arc(0, 0, radius * random.range(.2, 1.5), slice * random.range(1, -8), slice * random.range(1, 10))
      context.scale(random.range(.13, 3), random.range(.13, 18))

      context.stroke();
      context.restore();
    }

  };
};

canvasSketch(sketch, settings);
