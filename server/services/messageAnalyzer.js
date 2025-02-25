import natural from 'natural';
import Sentiment from 'sentiment';
import axios from 'axios';
import fs from 'fs';
import csv from 'csv-parser';
const tokenizer = new natural.WordTokenizer();

const sentiment = new Sentiment();


// Function to classify message using Hugging Face zero-shot classification model
const classifyMessageWithHuggingFace = async (message) => {
    if (!message) throw new Error('Message is required for classification.');

    const apiEndpoint = 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli'; // Zero-shot classification model
    const headers = {
        'Authorization': `Bearer ${process.env.HF_TOKEN}`,  
    };

    const labels = ['sexual_harassment message', 'safe message', 'bullying', 'hate speech'];  // Define custom categories

    try {
        const response = await axios.post(apiEndpoint, {
            inputs: message,
            parameters: {
                candidate_labels: labels, // These are the categories you want to classify into
            },
        }, { headers });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error while calling Hugging Face API:', error);
        return null;
    }
};

// Example function to adjust sentiment score based on custom lexicon
const adjustSentiment = (message, sentimentScore) => {
    const customLexicon = {
        phishing: -5,
        scam: -4,
        fraud: -4,
        assault: -5,
        password: -3,
        sensitive: -3,
    };

    // Tokenize the message
    const tokens = tokenizer.tokenize(message);

    // Adjust sentiment score if any custom words are found in the message
    tokens.forEach((token) => {
        if (customLexicon[token]) {
            sentimentScore += customLexicon[token];
        }
    });

    return sentimentScore;
};

// Analyze sentiment
const analyzeSentiment = (message) => {
    let result = sentiment.analyze(message);
    // Adjust the sentiment score based on the custom lexicon
    result.score = adjustSentiment(message, result.score);
    return result.score;
};



const customNaiveBayes = new natural.BayesClassifier();




// Tokenize and classify message
const classifyMessage = (message) => {
    return customNaiveBayes.classify(message);
};

// Generate statistical features
const computeFeatures = (message) => {
    const tokens = tokenizer.tokenize(message);
    const averageWordLength = tokens.reduce((sum, word) => sum + word.length, 0) / tokens.length;
    const hasRepeatedPunctuation = /([!?]{2,})/.test(message);
    const hasAllCaps = /\b[A-Z]{2,}\b/.test(message);
    return {
        tokenCount: tokens.length,
        averageWordLength,
        hasRepeatedPunctuation,
        hasAllCaps,
    };
};

// Generate feedback
const generateFeedback = (sentimentScore, classification, features) => {
    switch (classification) {
        case 'phishing':
            return 'The message appears to be a phishing attempt. Avoid clicking on suspicious links.';
        case 'fraud':
            return 'The message contains fraudulent content. Do not provide sensitive information.';
        case 'sexual_assault':
        case'sexual_harassment message':
            return 'The message contains harmful or inappropriate language. Report it if necessary.';
        case 'safe':
        case 'safe message':
            return 'The message appears to be safe.';
        case 'bullying':
            return 'The message contains harmful or bullying language. Consider addressing the issue respectfully or reporting it if necessary.'
        case 'hate speech':
            return 'The message contains hate speech. Avoid using offensive language.'
        default:
            if (sentimentScore < 0) {
                return 'The message has a negative tone. Avoid sending messages with harmful or aggressive language.';
            }
            if (features.hasRepeatedPunctuation) {
                return 'The message contains excessive punctuation, which may indicate spam.';
            }
            if (features.hasAllCaps) {
                return 'The message contains all-caps words, which may indicate shouting or spam.';
            }
            return 'The message appears to be safe.';
    }
};

// Main function
const analyzeMessage = async(message) => {
    const sentimentScore = analyzeSentiment(message);
    const features = computeFeatures(message);
    
    // Only classify if sentiment is negative
    let classification = 'safe';
    if (sentimentScore < 0) {
        classification = classifyMessage(message);
    }

     // Get classification from Hugging Face model
     const hfClassification = await classifyMessageWithHuggingFace(message);

     // Analyze the result from Hugging Face model
   
     if (hfClassification && hfClassification.labels && hfClassification.scores) {
        // Get the label with the highest score
        const bestIndex = hfClassification.scores.indexOf(Math.max(...hfClassification.scores));
        const bestLabel = hfClassification.labels[bestIndex];
        classification = bestLabel;
        console.log("Hugging Face Classification:", bestIndex);
        console.log("Best Label:", bestLabel);
    
    }
    else{
        console.log("No classification found from Hugging Face model");
    }
    const feedback = generateFeedback(sentimentScore, classification, features);

    return {
        isUnsafe: classification === 'phishing' || classification === 'fraud' || classification === 'sexual_assault' || sentimentScore < 0 || features.hasRepeatedPunctuation || features.hasAllCaps || classification == 'bullying',
        analysis: {
            sentimentScore,
            classification,
            features,
        },
        feedback,
    };
};

// Train the classifier before usage
//trainClassifier();

// Read CSV and train Naive Bayes Classifier with data
const trainClassifierFromCSV = (filePath) => {
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            // Assuming the CSV has columns "message" and "label" for text and classification
            const message = row.message;
            const label = row.label;

            if (message && label) {
                customNaiveBayes.addDocument(message, label);
            }
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            customNaiveBayes.train();
            console.log('Classifier trained with CSV data');
        });
};


// Train classifier with CSV file data
trainClassifierFromCSV('./services/messages_1000.csv');

export default analyzeMessage;
//trainClassifier(); /*added*/