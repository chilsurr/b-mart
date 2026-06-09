// utils/animateToCart.js

import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export const animateToCart = ({
  imageElement,
  cartElement,
  onComplete,
}) => {
  if (!imageElement || !cartElement) return;

  const imgRect = imageElement.getBoundingClientRect();
  const cartRect = cartElement.getBoundingClientRect();

  const clone = imageElement.cloneNode(true);

  Object.assign(clone.style, {
    position: "fixed",
    left: `${imgRect.left}px`,
    top: `${imgRect.top}px`,
    width: `${imgRect.width}px`,
    height: `${imgRect.height}px`,
    zIndex: "9999",
    pointerEvents: "none",
    borderRadius: "12px",
  });

  document.body.appendChild(clone);

  const endX =
    cartRect.left +
    cartRect.width / 2 -
    imgRect.width / 2;

  const endY =
    cartRect.top +
    cartRect.height / 2 -
    imgRect.height / 2;

  const midX =
    imgRect.left +
    (endX - imgRect.left) / 2;

  const midY = imgRect.top - 150;

  gsap.to(clone, {
    duration: 0.8,
    ease: "power2.out",
    motionPath: {
      path: [
        { x: 0, y: 0 },
        {
          x: midX - imgRect.left,
          y: midY - imgRect.top,
        },
        {
          x: endX - imgRect.left,
          y: endY - imgRect.top,
        },
      ],
      curviness: 1.5,
    },
    scale: 0.25,
    onComplete: () => {
      clone.remove();

      gsap.fromTo(
        cartElement,
        { scale: 1 },
        {
          scale: 1.3,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
        }
      );

      onComplete?.();
    },
  });
};