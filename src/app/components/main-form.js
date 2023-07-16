"use client"

import { useState } from "react";

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
  <div className="max-w-7x1 w-full mx-auto sm:px-6 lg:px-8 py-12">
    <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
      <form onSubmit={handleSubmit} className="grid gap-y-5 text-amber-700 mx-2">
        <div className="flex flex-col">
          <label className="sr-only" htmlFor="senderName">Your Name:</label>
          <input 
            type="text" 
            id="senderName" 
            name="senderName"
            maxLength={50}
            value={formData.senderName}
            placeholder="Your Name (Optional)"
            onChange={handleInput}
            className="px-2 block w-full rounded-md bg-white border border-gray-40 shadow-s focus:outline-none focus:outline-amber-300"
          />
        </div>
        <div className="flex flex-col">
          <label className="sr-only" htmlFor="recipientName">Recipient's Name:</label>
          <input 
            type="text" 
            id="recipientName" 
            name="recipientName" 
            maxLength={88}
            value={formData.recipientName}
            placeholder="Their Name"
            onChange={handleInput}
            className="px-2 block w-full rounded-md bg-white border border-gray-40 shadow-s focus:outline-none focus:outline-amber-300"
            required />
          <label className="sr-only" htmlFor="email">Their Email:</label>
        </div>
        <div className="flex flex-col">
          <input 
            type="email" 
            id="email" 
            name="email" 
            maxLength={50}
            value={formData.email}
            placeholder="Their Email"
            onChange={handleInput}
            className="px-2 block w-full rounded-md bg-white border border-gray-40 shadow-s focus:outline-none focus:outline-amber-300"
            required />
        </div>
        <div className="flex flex-col">
          <label className="sr-only" htmlFor="extra">Anything you want to ADD? (Optional)</label>
          <textarea
            rows={7}
            maxLength={200}
            id="extra"
            name="extra"
            value={formData.extra}
            placeholder="Anything you want to ADD? (Optional)"
            onChange={handleInput}
            className="px-2 py-0.5 block w-full rounded-md bg-white border border-gray-40 shadow-s focus:outline-none focus:outline-amber-300"
          />
          <div className="text-slate-400 text-right py-2">{characterCount} / 200</div>
        </div>
        <button 
          type="submit"
          className={`bg-transparent hover:bg-amber-600 text-amber-500 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded
            ${
              isGenerating || formData.email === "" || formData.recipientName == ""
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
          disabled={isGenerating || formData.email === "" || formData.recipientName == ""}
        >
          {isGenerating ? "Sending..." : "Send Positivity"}
        </button>
      </form>
    </div>
  </div>
  )
}