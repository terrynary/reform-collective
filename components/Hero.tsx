"use client";

import Image from "next/image";
import { FullwidthContainer } from "./FullwidthContainer";

export function Hero() {
  return (
    <section className="w-full py-16 md:py-24">
      <FullwidthContainer className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex flex-col w-full">
          {/* Headline Section */}
          <div className="w-full mb-8 md:mb-12">
            <h1 className="heading-01 text-green-500 mb-6 md:mb-8">
              Health insurance that doesn't get in the way.
            </h1>

            {/* Tabs/Filters */}
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
              <button
                className="title-text px-4 py-2 whitespace-nowrap rounded hover:bg-off-white transition-colors"
                style={{ color: "#D87906" }}
              >
                unpredictable rate increases
              </button>
              <button
                className="title-text px-4 py-2 whitespace-nowrap rounded hover:bg-off-white transition-colors"
                style={{ color: "#D87906" }}
              >
                lack of transparency
              </button>
              <button
                className="title-text px-4 py-2 whitespace-nowrap rounded hover:bg-off-white transition-colors"
                style={{ color: "#D87906" }}
              >
                implementation headaches
              </button>
              <button
                className="title-text px-4 py-2 whitespace-nowrap rounded hover:bg-off-white transition-colors"
                style={{ color: "#D87906" }}
              >
                claim denials
              </button>
              <button
                className="title-text px-4 py-2 whitespace-nowrap rounded hover:bg-off-white transition-colors"
                style={{ color: "#D87906" }}
              >
                frustrated users
              </button>
            </div>
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
