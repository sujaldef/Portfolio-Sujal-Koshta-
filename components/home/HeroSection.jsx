"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
  const [bubbles, setBubbles] = useState([]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const generated = Array.from({ length: 25 }, () => {
      const size = 20 + Math.random() * 60;
      const left = `${Math.random() * 100}%`;
      const duration = 10 + Math.random() * 10;
      const delay = -Math.random() * duration;
      return { size, left, duration, delay };
    });
    setBubbles(generated);
  }, []);

  return (
    <>
      <style jsx global>
        {`
          .gradient-bg {
            background-color: #0d0618;
          }

          .card-effect {
            position: relative;
            width: 350px;
            height: 350px;
            background: var(--primary); /* Primary background */
            border-radius: 50%; /* Make it a circle */
            overflow: hidden;
            box-shadow: 0 0 40px rgba(137, 75, 230, 0.6); /* Primary glow */
            transition: all 1s ease-in-out;
            border: none; /* No border for a cleaner circle look */
          }

          .card-effect:hover {
            width: 400px;
            height: 400px;
            background: var(--primary);
            border-radius: 50%;
            box-shadow: 0 0 60px rgba(137, 75, 230, 0.8); /* Stronger glow on hover */
          }

          .background {
            position: absolute;
            inset: 0;
            background: radial-gradient(
              circle at 100% 107%,
              #4a148c 0%,
              #6a1b9a 30%,
              #9c27b0 60%,
              #ce93d8 100%
            );
            /* Initially hidden */
            opacity: 0;
            transition: opacity 1s ease-in-out;
          }

          /* Show background on hover */
          .card-effect:hover .background {
            opacity: 1;
          }

          .logo-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%; /* Ensure image stays circular */
            overflow: hidden;
          }

          .logo {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Fill circle without distortion */
          }

          .icon-box {
            display: inline-block;
            width: 20px;
            height: 20px;
          }

          .icon-box svg {
            fill: rgba(255, 255, 255, 0.797);
            width: 100%;
            height: 100%;
            transition: all 0.5s ease-in-out;
          }

          .box {
            position: absolute;
            padding: 10px;
            text-align: right;
            background: rgba(255, 255, 255, 0.389);
            border-top: 2px solid rgb(255, 255, 255);
            border-right: 1px solid white;
            border-radius: 10% 13% 42% 0%/10% 12% 75% 0%;
            box-shadow: rgba(100, 100, 111, 0.364) -7px 7px 29px 0px;
            transform-origin: bottom left;
            transition: all 1s ease-in-out;
          }

          .box::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            opacity: 0;
            transition: all 0.5s ease-in-out;
          }

          .box:hover .icon-box svg {
            fill: white;
          }

          .box1 {
            width: 70%;
            height: 70%;
            bottom: -70%;
            left: -70%;
          }

          .box1::before {
            background: radial-gradient(
              circle at 30% 107%,
              #673ab7 0%,
              #5e35b1 5%,
              #512da8 60%,
              #62c2fe 90%
            );
          }

          .box1:hover::before {
            opacity: 1;
          }

          .box1:hover .icon-box svg {
            filter: drop-shadow(0 0 5px white);
          }

          .box2 {
            width: 50%;
            height: 50%;
            bottom: -50%;
            left: -50%;
            transition-delay: 0.2s;
          }

          .box2::before {
            background: radial-gradient(
              circle at 30% 107%,
              #8c9eff 0%,
              #536dfe 90%
            );
          }

          .box2:hover::before {
            opacity: 1;
          }

          .box2:hover .icon-box svg {
            filter: drop-shadow(0 0 5px white);
          }

          .box3 {
            width: 30%;
            height: 30%;
            bottom: -30%;
            left: -30%;
            transition-delay: 0.4s;
          }

          .box3::before {
            background: radial-gradient(
              circle at 30% 107%,
              #e1bee7 0%,
              #ce93d8 90%
            );
          }

          .box3:hover::before {
            opacity: 1;
          }

          .box3:hover .icon-box svg {
            filter: drop-shadow(0 0 5px white);
          }

          .box4 {
            width: 10%;
            height: 10%;
            bottom: -10%;
            left: -10%;
            transition-delay: 0.6s;
          }

          .card-effect:hover {
            transform: scale(1.1);
          }

          .card-effect:hover .box {
            bottom: -1px;
            left: -1px;
          }

          .card-effect:hover .logo-wrapper {
            transform: translate(0, 0);
            bottom: 20px;
            right: 20px;
          }
        `}
      </style>
      <section
        id="hero"
        className="min-h-screen relative flex justify-center items-center gradient-bg px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden"
      >
        {/* Background Bubbles with a more subtle look */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {bubbles.map((bubble, i) => (
            <motion.div
              key={i}
              className="absolute bg-[var(--primary)]/10 rounded-full"
              style={{
                width: bubble.size,
                height: bubble.size,
                left: bubble.left,
                bottom: "0%",
              }}
              initial={{ y: "10vh", opacity: 0 }}
              animate={{
                y: "-110vh",
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: bubble.duration,
                delay: bubble.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 z-10"
        >
          <div className="text-[var(--text-main)] max-w-xl text-center md:text-left">
            <p className="text-lg text-[var(--primary)] font-semibold">
              Sujal Koshta
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mt-2 leading-tight">
              AI Enthusiast &<br />
              Full-Stack Developer
            </h1>
            <p className="mt-6 text-slate-400 max-w-md mx-auto md:mx-0">
              Crafting intuitive, scalable, and user-centric digital experiences
              with a passion for clean code and impactful design.
            </p>

            <div className="flex justify-center md:justify-start items-center gap-4 mt-8">
              <a href="#contact">
                <button className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 px-6 py-3 rounded-lg text-white font-semibold transition">
                  Get In Touch
                </button>
              </a>
            </div>
          </div>

          {/* RIGHT: Image with the new animated card effect */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="card-effect">
              <div className="background"></div>
              <div className="logo-wrapper">
                <Image
                  src="/img3.jpg"
                  alt="Sujal Koshta"
                  width={450}
                  height={450}
                  quality={100}
                  className="logo"
                  priority
                />
              </div>

              <a 
  href="https://www.linkedin.com/in/sujalkoshta" 
  target="_blank" 
  rel="noreferrer" 
  className="box box1"
>
  <span className="icon-box">
    <FaLinkedin />
  </span>
</a>

<a 
  href="https://github.com/sujaldef" 
  target="_blank" 
  rel="noreferrer" 
  className="box box2"
>
  <span className="icon-box">
    <FaGithub />
  </span>
</a>

<a 
  href="https://www.instagram.com/sujal_kht" 
  target="_blank" 
  rel="noreferrer" 
  className="box box3"
>
  <span className="icon-box">
    <FaInstagram />
  </span>
</a>

             
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
