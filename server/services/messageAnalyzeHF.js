// import axios from 'axios';
// import natural from 'natural';
// import Sentiment from 'sentiment';

// const tokenizer = new natural.WordTokenizer();

// const sentiment = new Sentiment();

// // Function to classify message using Hugging Face zero-shot classification model
// const classifyMessageWithHuggingFace = async (message) => {
//     const apiEndpoint = 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli'; // Zero-shot classification model
//     const headers = {
//         'Authorization': `Bearer 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`,  // Replace with your API key
//     };

//     const labels = ['phishing', 'sexual_harassment', 'fraud', 'fishing', 'safe'];  // Define custom categories

//     try {
//         const response = await axios.post(apiEndpoint, {
//             inputs: message,
//             parameters: {
//                 candidate_labels: labels, // These are the categories you want to classify into
//             },
//         }, { headers });

//         return response.data;
//     } catch (error) {
//         console.error('Error while calling Hugging Face API:', error);
//         return null;
//     }
// };


// // Example function to adjust sentiment score based on custom lexicon
// const adjustSentiment = (message, sentimentScore) => {
//     const customLexicon = {
//         phishing: -5,
//         scam: -4,
//         fraud: -4,
//         assault: -5,
//         password: -3,
//         sensitive: -3,
//     };

//     // Tokenize the message
//     const tokens = tokenizer.tokenize(message);

//     // Adjust sentiment score if any custom words are found in the message
//     tokens.forEach((token) => {
//         if (customLexicon[token]) {
//             sentimentScore += customLexicon[token];
//         }
//     });

//     return sentimentScore;
// };

// // Analyze sentiment
// const analyzeSentiment = (message) => {
//     let result = sentiment.analyze(message);
//     // Adjust the sentiment score based on the custom lexicon
//     result.score = adjustSentiment(message, result.score);
//     return result.score;
// };


// // Generate statistical features
// const computeFeatures = (message) => {
//     const tokens = tokenizer.tokenize(message);
//     const averageWordLength = tokens.reduce((sum, word) => sum + word.length, 0) / tokens.length;
//     const hasRepeatedPunctuation = /([!?]{2,})/.test(message);
//     const hasAllCaps = /\b[A-Z]{2,}\b/.test(message);
//     return {
//         tokenCount: tokens.length,
//         averageWordLength,
//         hasRepeatedPunctuation,
//         hasAllCaps,
//     };
// };



// // Main function to analyze message using Hugging Face and custom sentiment analysis
// const analyzeMessageHF = async (message) => {
//     const sentimentScore = analyzeSentiment(message);  // Use your existing sentiment analysis function
//     const features = computeFeatures(message);

//     // Get classification from Hugging Face model
//     const hfClassification = await classifyMessageWithHuggingFace(message);

//     // Analyze the result from Hugging Face model
//     let classification = 'safe'; // Default classification
//     if (hfClassification && hfClassification[0]) {
//         // Get the label with the highest score
//         const bestLabel = hfClassification[0].labels[0]; // Best matching label
//         classification = bestLabel;
//     }
//     else{
//         console.log("No classification found from Hugging Face model");
//     }

//     const feedback = generateFeedback(classification);

//     return {
//         isUnsafe: classification === 'phishing' || classification === 'sexual_harassment' || classification === 'fraud' || classification === 'fishing',
//         analysis: {
//             sentimentScore,
//             classification,
//             features,
//         },
//         feedback,
//     };
// };


// const generateFeedback = ( classification) => {
//     switch (classification) {
//         case 'phishing':
//             return 'The message appears to be a phishing attempt. Avoid clicking on suspicious links.';
//         case 'fraud':
//             return 'The message contains fraudulent content. Do not provide sensitive information.';
//         case 'sexual_assault':
//             return 'The message contains harmful or inappropriate language. Report it if necessary.';
//         case 'safe':
//             return 'The message appears to be safe.';
//         default:
//             if (sentimentScore < 0) {
//                 return 'The message has a negative tone. Avoid sending messages with harmful or aggressive language.';
//             }
//             if (features.hasRepeatedPunctuation) {
//                 return 'The message contains excessive punctuation, which may indicate spam.';
//             }
//             if (features.hasAllCaps) {
//                 return 'The message contains all-caps words, which may indicate shouting or spam.';
//             }
//             return 'The message appears to be safe.';
//     }
// };




// export default analyzeMessageHF;