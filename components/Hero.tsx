"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { FullwidthContainer } from "./FullwidthContainer";
import { breakpoints } from "@/lib/breakpoints";

const HERO_CARDS = [
  {
    src: "/images/insurance-cards/insuranceCard1.png",
    alt: "Insurance card 1",
  },
  {
    src: "/images/insurance-cards/insuranceCard2.png",
    alt: "Insurance card 2",
  },
  {
    src: "/images/insurance-cards/insuranceCard3.png",
    alt: "Insurance card 3",
  },
  {
    src: "/images/insurance-cards/insuranceCard4.png",
    alt: "Insurance card 4",
  },
];

export function Hero() {
  const scrollingWordsRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLSpanElement>(null);
  const innerBoxRef = useRef<HTMLSpanElement>(null);
  const getInRef = useRef<HTMLSpanElement>(null);
  const theWayRef = useRef<HTMLSpanElement>(null);
  const doesntRef = useRef<HTMLSpanElement>(null);
  const mobileGetRef = useRef<HTMLSpanElement>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(HERO_CARDS.length); // Start at duplicate first card
  const [isCollapsed, setIsCollapsed] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentCardIndexRef = useRef(HERO_CARDS.length);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  const duplicatedCards = useMemo(
    () => [...HERO_CARDS, ...HERO_CARDS, ...HERO_CARDS],
    []
  );

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

  useEffect(() => {
    currentCardIndexRef.current = currentCardIndex;
    requestAnimationFrame(() => {
      duplicatedCards.forEach((_, index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const isCenter = index === currentCardIndex;
        gsap.to(card, {
          scale: isCenter ? 1.2 : 0.8,
          duration: 0.5,
          ease: "power2.inOut",
        });
      });

      // Animate mobile cards size changes
      if (
        typeof window !== "undefined" &&
        window.innerWidth < breakpoints.mobile
      ) {
        duplicatedCards.forEach((_, index) => {
          const mobileCard = mobileCardRefs.current[index];
          if (!mobileCard) return;

          const isCenter = index === currentCardIndex;
          gsap.to(mobileCard, {
            scale: isCenter ? 1.05 : 1,
            duration: 0.5,
            ease: "power2.inOut",
          });
        });
      }

      // Update mobile container transform
      if (mobileContainerRef.current && typeof window !== "undefined") {
        const isMobile = window.innerWidth < breakpoints.mobile;
        if (isMobile) {
          const scale = window.innerWidth / 375;
          const centerCardWidth = 246.5 * scale;
          const sideCardWidth = 197.2 * scale;
          const cardSpacing = sideCardWidth + 20;
          const boxWidth = 327 * scale;

          let leftEdgePosition = 0;
          for (let i = 0; i < currentCardIndex; i++) {
            leftEdgePosition += cardSpacing;
          }

          const boxCenter = boxWidth / 2;
          const centerOffset = centerCardWidth / 2;
          const translateX = boxCenter - leftEdgePosition - centerOffset;
          mobileContainerRef.current.style.transform = `translateX(${translateX}px)`;
        }
      }
    });
  }, [currentCardIndex, duplicatedCards]);

  // Auto-rotate hero cards on desktop
  useEffect(() => {
    if (HERO_CARDS.length <= 1) return;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    let isMounted = true;

    const rotateToNext = () => {
      if (!isMounted) return;

      const currentIdx = currentCardIndexRef.current;

      const currentCard = cardRefs.current[currentIdx];
      if (currentCard) {
        gsap.to(currentCard, {
          scale: 0.8,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }

      setTimeout(() => {
        if (!isMounted) return;
        const nextIndex = currentIdx + 1;
        const container = containerRef.current;

        if (nextIndex >= HERO_CARDS.length * 2) {
          setCurrentCardIndex(nextIndex);

          setTimeout(() => {
            if (!isMounted || !container) return;
            container.style.transition = "none";
            setCurrentCardIndex(HERO_CARDS.length);
            void container.offsetHeight;
            container.style.transition = "";
          }, 250);
        } else {
          setCurrentCardIndex(nextIndex);
        }
      }, 500);
    };

    const scheduleNext = () => {
      if (!isMounted) return;
      timeoutId = setTimeout(() => {
        rotateToNext();
        intervalId = setTimeout(scheduleNext, 3000);
      }, 2000);
    };

    scheduleNext();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      clearTimeout(intervalId);
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

      const isMobile = window.innerWidth < breakpoints.mobile;

      collapseTimeline = gsap.timeline({ delay: 1 });

      collapseTimeline.call(() => {
        if ((container as any).__animation) {
          (container as any).__animation.kill();
        }
      });

      if (isMobile) {
        collapseTimeline.to(
          innerBox,
          {
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          0
        );

        collapseTimeline.to(
          outerBox,
          {
            height: 0,
            marginTop: 0,
            marginBottom: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          0
        );
      } else {
        const line3Rect = line3Element.getBoundingClientRect();
        const boxRect = outerBox.getBoundingClientRect();
        const getInRect = getIn.getBoundingClientRect();

        // Calculate center of box relative to line3 container
        const boxCenterX = boxRect.left + boxRect.width / 2 - line3Rect.left;

        // Calculate current positions relative to line3 container
        const getInRightEdge = getInRect.right - line3Rect.left;

        // "get in" should end just before the center (to the left of center)
        const getInMoveX = boxCenterX - getInRightEdge;

        // "the way" should start at the center point of the box
        const getInFinalRightEdge = getInRightEdge + getInMoveX;

        const theWayMoveX = getInFinalRightEdge - 275;

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
      }

      // Change color to green-200 and italicize at the end of the animation
      const elementsToStyle = [doesnt, getIn, theWay];
      if (mobileGetRef.current) {
        elementsToStyle.push(mobileGetRef.current);
      }
      collapseTimeline.to(
        elementsToStyle,
        {
          color: "#00b684",
          fontStyle: "italic",
          duration: 0.3,
          ease: "power2.out",
        },
        0.8
      );

      // Mark as collapsed after animation completes
      collapseTimeline.call(
        () => {
          setIsCollapsed(true);
          if (wrapperRef.current) {
            wrapperRef.current.classList.add("collapsed");
          }
        },
        [],
        1.1
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
              <span ref={wrapperRef} className="heading-01-wrapper">
                {/* Desktop structure */}
                <span className="heading-01-line-1-2">
                  <span className="heading-01-line-1">Health insurance </span>
                  <span className="heading-01-line-2">
                    that <span ref={doesntRef}>doesn't</span>{" "}
                    <span ref={mobileGetRef} className="mobile-only">
                      get
                    </span>
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
                    in the way.
                  </span>
                </span>
              </span>
            </h1>
          </div>

          {/* Insurance Cards - Mobile: Show right after headline */}
          <div className="w-full lg:hidden mb-0 mt-8 flex items-center justify-center">
            <div className="mobile-cards-box">
              <div className="w-full relative flex items-center justify-center mobile-cards-wrapper">
                <div
                  ref={mobileContainerRef}
                  className="flex items-center transition-transform duration-500 ease-in-out"
                >
                  {duplicatedCards.map((card, index) => {
                    const isCenter = index === currentCardIndex;
                    return (
                      <div
                        key={`${card.src}-${index}-mobile`}
                        ref={(el) => {
                          mobileCardRefs.current[index] = el;
                        }}
                        className={`flex-shrink-0 mobile-card ${
                          isCenter ? "mobile-card-center" : "mobile-card-side"
                        }`}
                        style={{
                          transformOrigin: "center",
                          marginRight: "20px",
                          zIndex: isCenter ? 10 : 1,
                        }}
                      >
                        <Image
                          src={card.src}
                          alt={card.alt}
                          width={400}
                          height={250}
                          className="mobile-card-image rounded"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full max-w-[1376px] mx-auto border border-green-100 bg-white relative mobile-content-box flex flex-col lg:flex-row lg:h-[328px]">
            <div
              className="hidden lg:block absolute inset-y-0 left-[689px] w-px bg-green-100 pointer-events-none"
              aria-hidden="true"
            />

            {/* Left Column*/}
            <div className="w-full lg:w-[689px] px-6 py-6 flex flex-col justify-between">
              <p className="body-reg text-green-500 mb-8 lg:w-[500px] lg:h-[119px]">
                Join hundreds of businesses who trust us to offer health
                insurance that works the way it should: affordable coverage that
                puts employees and their doctors in the driving seat.
              </p>

              <button className="relative flex items-center gap-3 group cursor-pointer bg-transparent border-0 p-0 min-w-[calc(52px+12px+240px+12px+52px)]">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <rect
                    width="42"
                    height="42"
                    x="1"
                    y="1"
                    fill="#fbfaf6"
                    rx="25"
                  />
                  <path
                    stroke="#00b684"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.6"
                    d="M11.4227 5.6875C15.5263 2.73737 20.5603 1 26 1C39.8071 1 51 12.1929 51 26C51 39.8071 39.8071 51 26 51C12.1929 51 1 39.8071 1 26C1 23.8419 1.27346 21.7476 1.78761 19.75"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M32 26L28 22M32 26L28 30M32 26H20"
                    stroke="#00b684"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="body-s text-green-400 bg-white border border-green-400 px-6 py-3 rounded-full group-hover:border-green-200 group-hover:text-green-200 group-hover:translate-x-[64px] transition-all duration-300 whitespace-nowrap w-[224pt] h-[32pt] flex items-center justify-center">
                  Get a Custom Quote Today
                </span>
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-100 group-hover:opacity-0 transition-all duration-300"
                >
                  <rect
                    width="42"
                    height="42"
                    x="1"
                    y="1"
                    fill="#fbfaf6"
                    rx="25"
                  />
                  <path
                    stroke="#30715d"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.6"
                    d="M11.4227 5.6875C15.5263 2.73737 20.5603 1 26 1C39.8071 1 51 12.1929 51 26C51 39.8071 39.8071 51 26 51C12.1929 51 1 39.8071 1 26C1 23.8419 1.27346 21.7476 1.78761 19.75"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M32 26L28 22M32 26L28 30M32 26H20"
                    stroke="#30715d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Right Column - Desktop only */}
            <div className="hidden lg:flex w-full lg:w-[687px] px-6 py-6 items-center justify-center overflow-hidden">
              <div className="w-full h-full relative flex items-center justify-center">
                <div
                  ref={containerRef}
                  className="flex items-center transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(calc(50% - ${
                      currentCardIndex * 420
                    }px - 200px))`,
                  }}
                >
                  {duplicatedCards.map((card, index) => {
                    const isCenter = index === currentCardIndex;
                    return (
                      <div
                        key={`${card.src}-${index}-desktop`}
                        ref={(el) => {
                          cardRefs.current[index] = el;
                        }}
                        className="flex-shrink-0"
                        style={{
                          width: "400px",
                          transformOrigin: "center",
                          marginRight: "20px",
                          zIndex: isCenter ? 10 : 1,
                        }}
                      >
                        <Image
                          src={card.src}
                          alt={card.alt}
                          width={400}
                          height={250}
                          className="w-full h-auto rounded"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullwidthContainer>
    </section>
  );
}
