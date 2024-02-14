"use client"
import { useEffect, useState, useRef } from "react";

export default function Home() {

  const [sourceText,setSourceText] = useState("")
  const [cleanText,setCleanText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  function removeEmptyLinesAndTrim(text: string) {
    // Split text into lines
    var lines = text.split('\n');

    // Remove empty lines, trim whitespace from each line, and add empty line above lines containing '#'
    var filteredLines: string[] = [];
    lines.forEach(function(line, index) {
        // Remove leading and trailing whitespace from each line
        var trimmedLine = line.trim();
        // Check if the line is not empty after trimming
        if (trimmedLine.length > 0) {
            if (trimmedLine.includes('#') && index !== 0) {
                // Add an empty line above lines containing '#'
                filteredLines.push('');
            }
            filteredLines.push(trimmedLine);
        }
    });

    // // Remove the last character of each line
    // filteredLines = filteredLines.map(function(line) {
    //     return line.slice(0, -1); // Slice from beginning to second last character
    // });

    // Join the filtered lines back together
    var result = filteredLines.join('\n');

    return result;
  }

  const handleCopy = (cleanedText: string) => {
    navigator.clipboard.writeText(cleanedText)
      .then(() => {
        console.log('Cleaned Text copied to clipboard');
        alert('Cleaned Text copied to clipboard')
      })
      .catch(err => {
        console.error('Error copying text:', err);
      });
  };

  useEffect(()=>{
    if(sourceText !== ""){

      const cleanedText = removeEmptyLinesAndTrim(sourceText);
      // console.log(cleanedText);
      setCleanText(cleanedText)
      focusTextarea();
      handleCopy(cleanedText);
    }
  },[sourceText]);
  
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-full">
      <textarea
            id="sourceText"
            name="sourceText"
            placeholder="Source from One Note. Copy and paste here!"
            // rows={50}
            className="border rounded-lg p-2 h-screen w-3/6 text-black"
            value={sourceText}
            // defaultValue={sourceText}
            onChange={(e)=>setSourceText(e.target.value)}
          />
          <textarea
            ref={textareaRef}
            id="cleanText"
            name="cleanText"
            // rows={50}
            placeholder="Cleaned ENV"
            className="border rounded-lg p-2 h-screen w-3/6 text-black"
            value={cleanText}
            // defaultValue={cleanText}
            onChange={(e)=>console.log(e.target.value)}
          />


      </div>
    </main>
  );
}
