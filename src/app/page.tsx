"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { UserTable } from "./_components/UserTable";
import { User } from "@/types/user";
import { prodhanAgent, seniorAgent, shirshoAgent } from "@/data/data";

export default function Home() {
  const [activeSection, setActiveSection] = useState<number>(0);

  const tableSections = [seniorAgent, prodhanAgent, shirshoAgent];

  const sections = [
    {
      title: "সিনিয়র এজেন্ট",
      description:
        "নিচে দেওয়া মাস্টার এজেন্টের সাথে হোয়াটসএপ নাম্বারে লেনদেন করুন এক্ষেত্রে কোম্পানি সকল প্রকার দায়ভার নিবে।",
    },
    {
      title: "প্রধান এজেন্ট",
      description:
        "এটা আমাদের একমাত্র অফিসিয়াল এজেন্ট লিস্ট। এর বাইরে আমাদের কোন এজেন্ট নেই। লেনদেনের ক্ষেত্রে অবশ্যই মাস্টার এজেন্টদের নাম এবং হোয়াটসঅ্যাপ নাম্বার চেক করে নিন।",
    },
    {
      title: "শীর্ষ ও উপ-নিয়ন্ত্রক",
      description:
        "এটা আমাদের একমাত্র অফিসিয়াল এজেন্ট লিস্ট। এর বাইরে আমাদের কোন এজেন্ট নেই। লেনদেনের ক্ষেত্রে অবশ্যই মাস্টার এজেন্টদের নাম এবং হোয়াটসঅ্যাপ নাম্বার চেক করে নিন।",
    },
  ];

  return (
    <>
      <main className="min-h-screen flex flex-col bg-[#343333] text-[#FDDD04]">
        {/* Header */}
        <header className="bg-[#000000] w-full py-8 px-4 md:px-8 shadow-sm text-[#FDDD04] ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="">
              <img
                className="max-w-[30%] "
                src="./WhatsApp_Image_2025-10-17_at_7.58.24_PM-removebg-preview.png"
                alt=""
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Search size={20} className="text-[#FDDD04] " />
              <Input
                type="text"
                placeholder="Search here..."
                className="border-transparent border-b-2 border-b-black rounded-none px-1 bg-transparent shadow-none md:min-w-[350px] focus-visible:ring-0 focus-visible:ring-offset-0"
                aria-label="Search"
              />
            </div>
          </div>

          {/* Section text */}
          <div className="max-w-3xl mx-auto mt-10 text-center min-h-[220px]">
            <h1 className="text-3xl md:text-4xl font-semibold">
              {sections[activeSection].title}
            </h1>
            <p className="text-lg md:text-xl mt-4 text-[#FDDD04] leading-relaxed">
              {sections[activeSection].description}
            </p>
          </div>
        </header>

        {/* Section Switcher */}
        <section className="flex flex-wrap justify-center gap-3 p-8">
          {sections.map((sec, index) => (
            <Button
              key={sec.title}
              className={`${
                activeSection === index ? "border-b-4 border-[#FDDD04] " : ""
              } rounded-none`}
              onClick={() => setActiveSection(index)}
            >
              {sec.title}
            </Button>
          ))}
        </section>
        <UserTable allUsers={tableSections[activeSection]} />
      </main>
      <footer className="  md:flex footer sm:footer-horizontal bg-[#000000] text-base-content p-10 font-[inter] ">
        <aside className="flex-2">
          <h2>
            <img
              className="max-w-[40%] "
              src="./WhatsApp_Image_2025-10-17_at_7.58.24_PM-removebg-preview.png"
              alt=""
            ></img>
          </h2>
          <h2 className="text-[#FDDD04] text-3xl font-bold">আমাদের সম্পর্কে</h2>
          <p className="text-[#FDDD04] ">
            বাংলাদেশে Josh365-এর একমাত্র অনুমোদিত প্রতিনিধি হিসেবে আমরা আপনাদের
            জন্য নিরাপদ, দ্রুত এবং নির্ভরযোগ্য পরিষেবা প্রদানে অঙ্গীকারবদ্ধ
            <br />
          </p>
        </aside>
        <nav className="flex-1">
          <h6 className="block footer-title text-[#FDDD04] font-bold md:text-1xl">
            নতুন একাউন্ট খুলুন
          </h6>
          <h6 className="block link link-hover text-[#FDDD04] font-bold md:text-1xl mt-1">
            সাধারণ প্রশ্নোত্তর
          </h6>
        </nav>

        <nav className="flex-1">
          <h6 className="block footer-title text-[#FDDD04] font-bold md:text-1xl">
            মাস্টার এজেন্ট
          </h6>
          <h6 className="block link link-hover text-[#FDDD04] font-bold md:text-1xl                mt-1">
            এডমিন ও সাব-এডমিন
          </h6>
          <h6 className="block footer-title text-[#FDDD04] font-bold md:text-1xl mt-1">
            কাস্টমার সার্ভিস
          </h6>
          <h6 className="block link link-hover text-[#FDDD04] font-bold md:text-1xl mt-1">
            সুপার এজেন্ট
          </h6>
        </nav>

        <nav className="flex-1">
          <h6 className="link link-hover text-[#FDDD04] text-3xl ">
            support@josh365
          </h6>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal footer-center bg-[#000000] text-white  p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} -Josh365. All rights
            reserved.
          </p>
        </aside>
      </footer>
    </>
  );
}
