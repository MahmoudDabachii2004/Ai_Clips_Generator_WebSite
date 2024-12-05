import React, { useEffect, useState } from 'react';
import BackImg from "../assets/cool-background.png";
import Sidebar from '../commun/sidebar';
import { Link } from 'react-router-dom';
import loadingAnim from "../assets/Animation - 1733349435367.json";
import Lottie from "react-lottie";
import CardLoading from '../commun/cardLoading';
import { YoutubeTranscript } from 'youtube-transcript'; // Correct import

const getYouTubeThumbnail = (videoUrl) => {
    try {
        const videoId = videoUrl.split('v=')[1].split('&')[0]; // Extract video ID
        return {
            default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
            medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
            maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        };
    } catch (error) {
        return false;
    }

}

const fetchTranscript = async (videoUrl, finalCutedPrompt, setFinalCutedPrompt, setDoneCutting) => {
    try {
        // Call the API to get the transcript
        const response = await fetch(`http://localhost:3000/api?url=${videoUrl}`);
        if (!response.ok) {
            throw new Error(`Error fetching transcript: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Transcript data:', data);

        // Maximum character limit for ChatGPT input
        const maxChars = 14000; // Adjust based on ChatGPT's limit
        let currentChunk = '';
        let chunkIndex = 1;

        // Concatenate all items into a single string to calculate total length
        const allItemsString = data.map(item => JSON.stringify(item)).join('\n'); // Join items with a newline
        const totalLength = allItemsString.length; // Calculate total character length
        let totalChunks = Math.ceil(totalLength / maxChars); // Calculate total chunks based on character limit

        console.log(`Total chunks: ${totalChunks}`);

        const initialMessage = `
        The total length of the content that I want to send you is too large to send in only one piece.
        
        For sending you that content, I will follow this rule:
        
        [START PART 1/X]
        this is the content of the part 1 out of X in total
        [END PART 1/X]
        
        Then you just answer: "Received part 1/X"
        
        And when I tell you "ALL PARTS SENT", then you can continue processing the data and answering my requests.
        
        After receiving all parts, please process the following task:
        
        I have a transcript of a YouTube video, and I need your help to create compelling short clips suitable for TikTok and YouTube Shorts. The transcript will be provided in the parts I send.
        
        Please analyze the transcript and identify the most engaging moments. For each selected clip, provide the following details in JSON format:
        
        1. **Title**: A catchy and engaging title that encapsulates the essence of the clip.
        2. **Description**: A concise description that highlights the key moments or themes.
        3. **Hashtags**: A set of relevant and trending hashtags to enhance discoverability.
        4. **Viral Probability**: An estimated likelihood (in percentage) that the clip will go viral, based on its content and appeal.
        5. **Timestamp**: The start and end times of the clip in "mm:ss" format, ensuring clips are between 15 to 60 seconds long.
        
        Focus on moments that are likely to capture attention quickly, such as emotional highlights, surprising facts, or humorous segments. The output should be structured as follows:
        
        \`\`\`json
        [
            {
            "title": "Engaging Title for Clip 1",
            "description": "A brief summary of Clip 1's content.",
            "hashtags": ["#Example", "#Clip1", "#Viral"],
            "viral_probability": "80%",
            "timestamp": {
                "start": "01:15",
                "end": "01:45"
                }
            },
            {
            "title": "Engaging Title for Clip 2",
            "description": "A brief summary of Clip 2's content.",
            "hashtags": ["#Example", "#Clip2", "#Trending"],
            "viral_probability": "90%",
            "timestamp": {
                "start": "03:05",
                "end": "03:50"
                }
            }
          // Add more clips as needed
        ]
        \`\`\`
        
        Ensure each clip is crafted to maximize viewer engagement and shareability across short-form video platforms.
        
        I will now start sending you the transcript in parts.
        `;


        // Array to store all chunks
        let chunkList = [];

        chunkList.push({
            content: initialMessage
        });

        // Split data into chunks based on maxChars limit
        for (const item of data) {
            const itemString = JSON.stringify(item); // Convert each item to a string

            // Check if adding the next item would exceed the maxChars limit
            if ((currentChunk + itemString).length > maxChars) {
                // Create part markers and acknowledgment format
                const part1 = `Do not answer yet. This is just another part of the text I want to send you. Just receive and acknowledge as "Part ${chunkIndex}/${totalChunks} received" and wait for the next part.`;
                const part2 = `[START PART ${chunkIndex}/${totalChunks}]`;
                const part3 = currentChunk;
                const part4 = `[END PART ${chunkIndex}/${totalChunks}]`;
                const part5 = `Remember not answering yet. Just acknowledge you received this part with this message "Part ${chunkIndex}/${totalChunks} received" and wait for the next part.`;

                // Add the current chunk as a new array entry
                chunkList.push({
                    content: part1 + " " + part2 + " " + part3 + " " + part4 + " " + part5
                });

                // Prepare for the next chunk
                currentChunk = itemString; // Start a new chunk with the current item
                chunkIndex++;
            } else {
                currentChunk += itemString + '\n'; // Add item with a newline character
            }
        }

        // Log any remaining text after the loop
        if (currentChunk.length > 0) {
            // Send the last part
            const part1 = `[START PART ${chunkIndex}/${totalChunks}]`;
            const part2 = currentChunk;
            const part3 = `[END PART ${chunkIndex}/${totalChunks}]`;

            // Add the last part as a new array entry
            chunkList.push({
                content: part1 + " " + part2 + " " + part3
            });
        }

        // Update the state with the chunk list
        setFinalCutedPrompt(chunkList);

        console.log('ALL PARTS SENT. Now you can continue processing the request.');
        console.log('Final Cuted Prompt:', chunkList);
        setDoneCutting(true);
        return totalChunks; // Return the total number of chunks for reference
    } catch (error) {
        console.error('Error:', error);
        return null; // or handle the error as needed
    }
};



const CreateVideo = () => {
    const [step, setStep] = useState(1);
    const [videoLink, setVideoLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState("");
    const [finalCutedPrompt, setFinalCutedPrompt] = useState();
    const [doneCutting, setDoneCutting] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('Content copied to clipboard!');
            })
            .catch((error) => {
                console.error('Failed to copy content: ', error);
            });
    };


    const handleSubmitCLick = () => {
        // Handle the form submission
        if (step === 1) {
            if (!getYouTubeThumbnail(videoLink) || "") {
                alert("Please enter a valid video link");
                return;
            }
            setLoading(true);
            setThumbnail(getYouTubeThumbnail(videoLink).maxres);
            setTimeout(() => {
                setLoading(false);
                setStep(2);
            }, 1000);
        }

        if (step === 2) {
            // Handle the next step
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setStep(3);
                fetchTranscript(videoLink, finalCutedPrompt, setFinalCutedPrompt, setDoneCutting);
            }, 1000);
        }

        if (step === 3) {
            console.log("Step 3");
        }
    }

    useEffect(() => {
        console.log('Final Cuted Prompt:', finalCutedPrompt);
    }, [finalCutedPrompt]);

    return (
        <div>
            <section className="hero is-success is-fullheight" style={{ backgroundImage: `url(${BackImg})` }}>
                <div className="hero-body container  is-justify-content-center">
                    <div className="section" style={{ minWidth: "100%" }}>
                        {!loading ? (
                            <div className="columns">
                                <div className="column">
                                    <div className="box">
                                        <div className="haut">
                                            <div className="level">
                                                <div className="level-left">
                                                    <h1 className='title is-4'>Create Your Clips With AI</h1>
                                                </div>
                                                <div className="level-right">
                                                    <Link
                                                        to={".."} // Ensure this points to your desired route
                                                        className="button is-danger is-fullwidth mt-3"
                                                    >
                                                        <button className='' >Go Back</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        {step === 1 && (
                                            <>
                                                <div className="field">
                                                    <div className="imgContainer has-text-centered" >
                                                        <img style={{ height: "20rem", width: "100%", objectFit: "contain" }} src="https://www.freeiconspng.com/uploads/youtube-logo-picture-download-1.png" alt="" />
                                                    </div>
                                                    <label className="label">Your Youtube Video Link:</label>
                                                    <div className="control">
                                                        <input onChange={(e) => { setVideoLink(e.target.value) }} className="input" type="text" placeholder="https://www.youtube.com/watch?v=VIDEO_ID" />
                                                    </div>
                                                </div>
                                                <button onClick={handleSubmitCLick} className='button is-link is-fullwidth' >Enter</button>
                                            </>
                                        )}
                                        {step === 2 && (
                                            <>
                                                <div className="field">
                                                    <div className="imgContainer has-text-centered p-6" >
                                                        <label className="title">Is This the Correct Video?</label>
                                                        <img style={{ height: "20rem", width: "100%", objectFit: "contain", marginTop: "1rem" }} src={thumbnail} alt="" />
                                                    </div>
                                                </div>
                                                <div className="columns">
                                                    <div className="column">
                                                        <button className='button is-link is-fullwidth' onClick={handleSubmitCLick}>Yes</button>
                                                    </div>
                                                    <div className="column">
                                                        <button onClick={() => { setStep(1); setThumbnail(""), setVideoLink("") }} className='button is-danger is-fullwidth'>No</button>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {step === 3 && (
                                            <>
                                                <div className="container">
                                                    {doneCutting && finalCutedPrompt ? (
                                                        <>
                                                            <div className="content mb-4">
                                                                <h4 className="title is-5">How to Use:</h4>
                                                                <ol className="is-small">
                                                                    <li>Copy the first prompt and send it to ChatGPT.</li>
                                                                    <li>Copy and send each numbered part in order.</li>
                                                                    <li>After sending all parts, type "ALL PARTS SENT".</li>
                                                                    <li>ChatGPT will then process your complete prompt.</li>
                                                                </ol>
                                                            </div>
                                                            <div className="content">{finalCutedPrompt[0].content}</div>
                                                            <button onClick={() => handleCopy(finalCutedPrompt[0].content)} className="button is-link mb-5">
                                                                Copy First Prompt To Send
                                                            </button>
                                                            <div className="columns is-multiline">
                                                                {finalCutedPrompt.slice(1).map((item, index) => (
                                                                    <div key={index + 1} className="column is-2" onClick={() => handleCopy(item.content)}>
                                                                        <div className="button is-link is-light is-fullwidth" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                                            <h6 className="is-size-7">
                                                                                Part {index + 1} / {finalCutedPrompt.length - 1}
                                                                            </h6>
                                                                            <h1  >
                                                                                Click To Copy
                                                                            </h1>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <CardLoading Message={"Cutting the transcript into parts"} />
                                                    )}
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Lottie
                                options={{
                                    loop: true,
                                    autoplay: true,
                                    animationData: loadingAnim,
                                    rendererSettings: {
                                        preserveAspectRatio: "xMidYMid slice"
                                    }
                                }}
                                height={400}
                                width={400}
                            ></Lottie>
                        )}
                    </div>
                </div>
            </section >
        </div >
    );
}

export default CreateVideo;
