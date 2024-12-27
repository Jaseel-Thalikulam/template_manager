"use client";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AssignConcern() {
  const [concern, setConcern] = useState("");
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [week, setWeek] = useState("");

  const [recordingLink, setRecordingLink] = useState("");
  const [manifest, setManifest] = useState("");
  const [generatedTemplate, setGeneratedTemplate] = useState("");
  const [error, setError] = useState("");

  const concernRef = useRef<HTMLTextAreaElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const domainRef = useRef<HTMLInputElement | null>(null);
  const weekRef = useRef<HTMLInputElement | null>(null);

  const manifestRef = useRef<HTMLInputElement | null>(null);
  const recordingRef = useRef<HTMLInputElement | null>(null);

  const handleGenerateAndCopy = () => {
    if (
      concern.trim() &&
      name.trim() &&
      domain.trim() &&
      week.trim() &&
      manifest.trim() &&
      recordingLink.trim()
    ) {
      const template = `
*Name:* ${name}
*Domain:* ${domain}
*Week:* ${week}
*Manifest:* ${manifest}
*Recording Link:* ${recordingLink}

*Concern:*
         ${concern}


Please review and address this concern at the earliest. Thank you!
      `;
      setGeneratedTemplate(template);
      navigator.clipboard.writeText(template);
      toast("Template generated and copied to clipboard!");
      setError("");
    } else {
      setError("Please fill in all fields.");
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    nextRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>,
    fieldSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    fieldSetter(pastedText);
    setTimeout(() => {
      if (nextRef?.current) {
        nextRef.current.focus();
      }
    }, 100);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <textarea
            ref={concernRef}
            placeholder="Enter Concern"
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            onPaste={(e) => handlePaste(e, nameRef, setConcern)}
            className="p-2 border border-gray-300 rounded w-full h-24"
          ></textarea>
        </div>
        <div>
          <input
            ref={nameRef}
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onPaste={(e) => handlePaste(e, domainRef, setName)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            ref={domainRef}
            type="text"
            placeholder="Enter Domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onPaste={(e) => handlePaste(e, weekRef, setDomain)}
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
            onPaste={(e) => handlePaste(e, manifestRef, setWeek)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            ref={manifestRef}
            type="text"
            placeholder="Enter Manifest"
            value={manifest}
            onChange={(e) => setManifest(e.target.value)}
            onPaste={(e) => handlePaste(e, recordingRef, setManifest)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            ref={recordingRef}
            type="text"
            placeholder="Enter Recording Link"
            value={recordingLink}
            onChange={(e) => setRecordingLink(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <button
            onClick={handleGenerateAndCopy}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Generate and Copy
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {generatedTemplate && (
          <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded">
            <pre>{generatedTemplate}</pre>
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
