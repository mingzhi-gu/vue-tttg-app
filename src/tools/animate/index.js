import Vue from 'vue';
import cm from './index.vue';

const Animate = Vue.extend(cm);

export default function createAnimate({
  startX, startY, endX, endY, width, height, src,
}) {
  const app = new Animate({
    el: document.createElement('div'),
    data() {
      return {
        moveX: startX,
        moveY: startY,
        sx: 1,
        sy: 1,
        opacity: 1,
        exist: true,
        src,
        width,
        height,

      };
    },
  });
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.moveX = endX;
    app.moveY = endY;
    app.sx = 0.1;
    app.sy = 0.1;
    app.opacity = 0;
  }, 0);
  setTimeout(() => {
    app.exist = false;
  }, 1000);
  console.log(app);
}
