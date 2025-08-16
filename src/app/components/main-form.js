"use client"

import { useState } from "react";
import { ShimmerButton } from "./shimmer-button";
import { MagicCard } from "./magic-card";
import { ShineBorder } from "./shine-border";

export default function Form() {
  const [formData, setFormData] = useState({
    senderName: "",
    recipientName: "",
    email: "",
    extra: ""
  });

  const [characterCount, setCharacterCount] = useState(0);

  const [isGenerating, setIsGenerating] = useState(false); // Check to see if response is generating

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));

    if (fieldName === 'extra') {
      setCharacterCount(fieldValue.length);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    const data = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/openai/api', {
        method: 'post',
        body: JSON.stringify(Object.fromEntries(data)),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse && errorResponse.error) {
          throw new Error(errorResponse.error);
        } else {
          throw new Error("An error has occurred");
        }
      }
      alert('Positivity sent to your friend~ gRabbit');

    } catch (err) {
      console.error(err);
      if (err.message == "say nicer things~") {
        alert("Say nice things ~ Spread positivity");
      } else {
        alert("an error has occured");
      }
    }
    setIsGenerating(false);
  }

  return(
  <div className="w-full">
    <MagicCard className="group bg-stone-50/95 backdrop-blur-sm border border-stone-200 shadow-xl">
      <form onSubmit={handleSubmit} className="grid gap-y-5 text-stone-700">
        <div className="flex flex-col">
          <label className="sr-only" htmlFor="senderName">Your Name:</label>
          <ShineBorder>
            <input 
              type="text" 
              id="senderName" 
              name="senderName"
              maxLength={50}
              value={formData.senderName}
              placeholder="Your Name (Optional)"
              onChange={handleInput}
              className="px-3 py-3 block w-full rounded-md bg-transparent border-0 focus:outline-none text-stone-800 placeholder:text-stone-500 font-medium text-base"
            />
          </ShineBorder>
        </div>
        <div className="flex flex-col">
          <label className="sr-only" htmlFor="recipientName">Recipient&apos;s Name:</label>
          <ShineBorder>
            <input 
              type="text" 
              id="recipientName" 
              name="recipientName" 
              maxLength={88}
              value={formData.recipientName}
              placeholder="Their Name"
              onChange={handleInput}
              className="px-3 py-3 block w-full rounded-md bg-transparent border-0 focus:outline-none text-stone-800 placeholder:text-stone-500 font-medium text-base"
              required />
          </ShineBorder>
          <label className="sr-only" htmlFor="email">Their Email:</label>
        </div>
        <div className="flex flex-col">
          <ShineBorder>
            <input 
              type="email" 
              id="email" 
              name="email" 
              maxLength={50}
              value={formData.email}
              placeholder="Their Email"
              onChange={handleInput}
              className="px-3 py-3 block w-full rounded-md bg-transparent border-0 focus:outline-none text-stone-800 placeholder:text-stone-500 font-medium text-base"
              required />
          </ShineBorder>
        </div>
        <div className="flex flex-col">
          <label className="sr-only" htmlFor="extra">Anything you want to ADD? (Optional)</label>
          <ShineBorder>
            <textarea
              rows={7}
              maxLength={200}
              id="extra"
              name="extra"
              value={formData.extra}
              placeholder="Anything you want to ADD? (Optional)"
              onChange={handleInput}
              className="px-3 py-3 block w-full rounded-md bg-transparent border-0 focus:outline-none text-stone-800 placeholder:text-stone-500 font-medium text-base resize-none"
            />
          </ShineBorder>
          <div className="text-stone-400 text-right py-2 text-sm">{characterCount} / 200</div>
        </div>
        <ShimmerButton 
          type="submit"
          className={`w-full py-3 text-base font-semibold ${
              isGenerating || formData.email === "" || formData.recipientName == ""
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
          disabled={isGenerating || formData.email === "" || formData.recipientName == ""}
          background="rgba(120, 113, 108, 1)"
          shimmerColor="#d6d3d1"
          borderRadius="8px"
        >
          {isGenerating ? "Sending..." : "Send Positivity"}
        </ShimmerButton>
      </form>
    </MagicCard>
  </div>
  )
}