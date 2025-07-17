"use client";
import React, { useState, useRef, useEffect } from "react";

function Fqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is CareerCraft.AI?",
      answer:
        "CareerCraft.AI is an AI-powered platform designed to enhance your professional presentation and improve your chances in the job market. It offers tools to optimize your resume, LinkedIn profile, cover letters, and more.",
    },
    {
      question: "How does CareerCraft.AI work?",
      answer:
        "CareerCraft.AI uses AI to analyze your resume and LinkedIn profile, offering keyword optimization and personalized recommendations to improve your visibility to recruiters.",
    },
    {
      question: "Can I download my resume?",
      answer: "Yes, you can download it in PDF or DOCX format.",
    },
    {
      question: "What makes CareerCraft.AI different from other tools?",
      answer:
        "CareerCraft.AI combines powerful AI with a user-friendly interface. It understands your career goals and tailors content for specific job roles, helping you stand out.",
    },
    {
      question: "Can I try CareerCraft.AI without paying?",
      answer:
        "Absolutely! We offer free credits so you can try the services before making a purchase.",
    },
    {
      question: "How secure is my data on CareerCraft.AI?",
      answer:
        "Your data is encrypted and stored securely. We never share your personal information with third parties.",
    },
    {
      question:
        "Do I need special software or technical skills to use CareerCraft.AI?",
      answer:
        "No technical skills are needed. The platform runs in your browser and is designed to be easy for everyone to use.",
    },
  ];

  return (
    <div id="Fqs" className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Questions About CareerCraft.AI?
      </h1>
      <h4 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">
        We have Answers!
      </h4>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-purple-500 rounded-lg p-4 cursor-pointer transition-shadow duration-200 hover:shadow-md"
            onClick={() => toggleFAQ(index)}
          >
            <div className="font-semibold text-purple-800">{faq.question}</div>

            <div
              className={`grid transition-all duration-500 ease-in-out text-gray-600 overflow-hidden ${
                openIndex === index ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fqs;
