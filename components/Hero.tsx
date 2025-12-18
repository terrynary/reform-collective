"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FullwidthContainer } from "./FullwidthContainer";

export function Hero() {
  const scrollingWordsRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLSpanElement>(null);
  const innerBoxRef = useRef<HTMLSpanElement>(null);
  const getInRef = useRef<HTMLSpanElement>(null);
  const theWayRef = useRef<HTMLSpanElement>(null);
  const doesntRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!scrollingWordsRef.current) return;

    const words = [
      "DENIALS",
      "FRUSTRATED USERS",
      "UNPREDICTABLE RATE INCREASES",
      "LACK OF TRANSPARENCY",
      "IMPLEMENTATION HEADACHES",
    ];

    const container = scrollingWordsRef.current;
    const gap = 50;

    const allWords = [...words, ...words];

    container.innerHTML = "";

    // Create a wrapper for all words to animate
    const wrapper = document.createElement("div");
    wrapper.style.display = "inline-flex";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent = "center";
    wrapper.style.height = "100%";
    wrapper.style.whiteSpace = "nowrap";
    container.appendChild(wrapper);

    // Create word elements
    allWords.forEach((word) => {
      const wordEl = document.createElement("span");
      wordEl.className = "title-text inline-block whitespace-nowrap";
      wordEl.textContent = word;
      wordEl.style.color = "#D87906";
      wordEl.style.marginRight = `${gap}px`;
      wordEl.style.letterSpacing = "0";
      wrapper.appendChild(wordEl);
    });

    // Wait for next frame to measure widths
    requestAnimationFrame(() => {
      const wrapperWidth = wrapper.offsetWidth;
      const singleSetWidth = wrapperWidth / 2;

      // Animate continuous scroll to the left
      const animation = gsap.to(wrapper, {
        x: -singleSetWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      // Store cleanup function
      (container as any).__animation = animation;
    });

    return () => {
      if ((container as any).__animation) {
        (container as any).__animation.kill();
      }
    };
  }, []);

  // Collapse box animation after 1 second
  useEffect(() => {
    if (
      !boxRef.current ||
      !innerBoxRef.current ||
      !scrollingWordsRef.current ||
      !getInRef.current ||
      !theWayRef.current ||
      !doesntRef.current
    )
      return;

    const innerBox = innerBoxRef.current;
    const outerBox = boxRef.current;
    const container = scrollingWordsRef.current;
    const getIn = getInRef.current;
    const theWay = theWayRef.current;
    const doesnt = doesntRef.current;

    let collapseTimeline: gsap.core.Timeline | null = null;

    // Wait for layout to settle
    requestAnimationFrame(() => {
      const line3Element = outerBox.parentElement;
      if (!line3Element) return;

      // Get all positions relative to the line3 container
      const line3Rect = line3Element.getBoundingClientRect();
      const boxRect = outerBox.getBoundingClientRect();
      const getInRect = getIn.getBoundingClientRect();
      const theWayRect = theWay.getBoundingClientRect();

      // Calculate center of box relative to line3 container
      const boxCenterX = boxRect.left + boxRect.width / 2 - line3Rect.left;

      // Calculate current positions relative to line3 container
      const getInRightEdge = getInRect.right - line3Rect.left;

      // "get in" should end just before the center (to the left of center)
      const getInMoveX = boxCenterX - getInRightEdge;

      // "the way" should start at the center point of the box
      const getInFinalRightEdge = getInRightEdge + getInMoveX;

      const theWayMoveX = getInFinalRightEdge - 275;

      // After 1 second, collapse the box
      collapseTimeline = gsap.timeline({ delay: 1 });

      // Stop the scrolling animation
      collapseTimeline.call(() => {
        if ((container as any).__animation) {
          (container as any).__animation.kill();
        }
      });

      // Animate "get in" to move toward center
      collapseTimeline.to(
        getIn,
        {
          x: getInMoveX,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0
      );

      // Animate "the way" to move toward center
      collapseTimeline.to(
        theWay,
        {
          x: theWayMoveX,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0
      );

      // Collapse the inner box (width and height to 0)
      collapseTimeline.to(
        innerBox,
        {
          width: 0,
          height: 0,
          paddingLeft: 0,
          paddingRight: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0
      );

      // Collapse the outer wrapper (margin to 0)
      collapseTimeline.to(
        outerBox,
        {
          marginLeft: 0,
          marginRight: 0,
          width: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0
      );

      // Change color to green-200 and italicize at the end of the animation
      collapseTimeline.to(
        [doesnt, getIn, theWay],
        {
          color: "#00b684",
          fontStyle: "italic",
          duration: 0.3,
          ease: "power2.out",
        },
        0.8
      );
    });

    return () => {
      if (collapseTimeline) {
        collapseTimeline.kill();
      }
    };
  }, []);

  return (
    <section className="w-full py-16 md:py-24 overflow-x-hidden">
      <FullwidthContainer className="w-full overflow-x-hidden">
        <div className="flex flex-col w-full overflow-x-hidden">
          {/* Headline Section */}
          <div className="w-full mb-8 md:mb-12 overflow-x-hidden overflow-y-visible">
            <h1 className="heading-01 text-green-500 mb-6 md:mb-8 relative">
              <span className="heading-01-wrapper">
                <span className="heading-01-line-1-2">
                  <span className="heading-01-line-1">Health insurance </span>
                  <span className="heading-01-line-2">
                    that <span ref={doesntRef}>doesn't</span>
                  </span>
                </span>
                <span className="heading-01-line-3">
                  {" "}
                  <span
                    ref={getInRef}
                    className="inline-block"
                    style={{ verticalAlign: "middle" }}
                  >
                    get in
                  </span>{" "}
                  <span
                    ref={boxRef}
                    className="relative inline-block mx-1"
                    style={{
                      zIndex: 10,
                      overflow: "hidden",
                      verticalAlign: "middle",
                    }}
                  >
                    <span
                      ref={innerBoxRef}
                      className="inline-block rounded-lg relative overflow-hidden flex items-center justify-center"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #CCDDC7",
                        height: "79px",
                        width: "clamp(200px, 40vw, 662px)",
                        maxWidth: "calc(100% - 2rem)",
                        padding: "0 12px",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        ref={scrollingWordsRef}
                        className="relative"
                        style={{
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    </span>
                  </span>{" "}
                  <span
                    ref={theWayRef}
                    className="inline-block"
                    style={{ verticalAlign: "middle" }}
                  >
                    the way.
                  </span>
                </span>
              </span>
            </h1>
          </div>

          {/* Content Section */}
          <div className="flex flex-col lg:flex-row lg:gap-12 w-full">
            {/* Left Column */}
            <div className="flex flex-col flex-1 mb-8 lg:mb-0">
              <p className="body-reg text-green-500 mb-8">
                Join hundreds of businesses who trust us to offer health
                insurance that works the way it should: affordable coverage that
                puts employees and their doctors in the driving seat.
              </p>

              <button className="flex items-center gap-2 body-s text-white bg-green-500 px-6 py-3 w-fit rounded hover:bg-green-400 transition-colors">
                Get a Custom Quote Today
                <span>→</span>
              </button>
            </div>

            {/* Right Column */}
            <div className="hidden lg:flex flex-col gap-4 w-full lg:w-auto lg:min-w-[320px] lg:max-w-[400px]">
              <Image
                src="/images/insurance-cards/insuranceCard1.png"
                alt="Insurance card 1"
                width={400}
                height={250}
                className="w-full h-auto rounded"
              />
              <Image
                src="/images/insurance-cards/insuranceCard2.png"
                alt="Insurance card 2"
                width={400}
                height={250}
                className="w-full h-auto rounded"
              />
              <Image
                src="/images/insurance-cards/insuranceCard3.png"
                alt="Insurance card 3"
                width={400}
                height={250}
                className="w-full h-auto rounded"
              />
              <Image
                src="/images/insurance-cards/insuranceCard4.png"
                alt="Insurance card 4"
                width={400}
                height={250}
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          {/* Content Cards */}
          <div className="flex lg:hidden flex-col gap-4 mt-8">
            {/* Card 1 */}
            <div className="bg-off-white p-4 rounded">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="title-text text-black-200 mb-2">
                    Spaw Retreat Dog Grooming
                  </div>
                  <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                    <span className="text-xs">▶</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-off-white p-4 rounded">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="title-text text-black-200 mb-2">
                    Sunnyside Up Day Care
                  </div>
                  <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                    <span className="text-xs">▶</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-off-white p-4 rounded">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="title-text text-black-200 mb-2">
                    Rott and Sons Accounting
                  </div>
                  <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                    <span className="text-xs">▶</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
              <div className="w-1/3 h-full bg-black-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </FullwidthContainer>
    </section>
  );
}
