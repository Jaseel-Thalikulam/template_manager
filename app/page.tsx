"use client";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [recipientName, setRecipientName] = useState("");
  const [name, setName] = useState("");
  const [week, setWeek] = useState("");
  const [date, setDate] = useState("");
  const [generatedTemplate, setGeneratedTemplate] = useState("");
  const [error, setError] = useState("");

  const recipientRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const weekRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  const handleGenerateTemplate = () => {
    if (recipientName.trim() && name.trim() && week.trim() && date.trim()) {
      setGeneratedTemplate(`
    *${name}*
    *${week}* 
    *${date}* 

    Hi ${recipientName},  
    Please provide the *Review recording* for the above details.  
    Thank you!`);
      setError(""); // Clear error
    } else {
      setError("Please fill in all fields.");
    }
  };

  const handleCopyToClipboard = () => {
    if (generatedTemplate) {
      navigator.clipboard.writeText(generatedTemplate);
      toast("Wow so easy!");
      // alert("Template copied to clipboard!");
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement | null>,
    fieldSetter: React.Dispatch<React.SetStateAction<string>> // Accept the setter function for the field
  ) => {
    e.preventDefault(); // Prevent the default paste behavior
    const pastedText = e.clipboardData.getData("text");

    fieldSetter(pastedText); // Update only the specific field's state

    // Use setTimeout to move focus after the paste action is complete
    setTimeout(() => {
      if (nextRef?.current) {
        nextRef.current.focus(); // Move focus to the next field
      }
    }, 100); // Delay to ensure the input value is updated first
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <input
            ref={recipientRef}
            type="text"
            placeholder="Enter Recipient Name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            onPaste={(e) => handlePaste(e, nameRef, setRecipientName)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            ref={nameRef}
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onPaste={(e) => handlePaste(e, weekRef, setName)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            ref={weekRef}
            type="text"
            placeholder="Enter Week"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            onPaste={(e) => handlePaste(e, dateRef, setWeek)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            ref={dateRef}
            type="text"
            placeholder="Enter Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <button
            onClick={handleGenerateTemplate}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Generate Template
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {generatedTemplate && (
          <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded">
            <pre>{generatedTemplate}</pre>
            <button
              onClick={handleCopyToClipboard}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded bg-violet-700"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* Your footer content */}
      </footer>
      <ToastContainer />
    </div>
  );
}
