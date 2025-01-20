import natural from 'natural';
import Sentiment from 'sentiment';
import axios from 'axios';
import fs from 'fs';
import csv from 'csv-parser';
const tokenizer = new natural.WordTokenizer();

const sentiment = new Sentiment();


// Function to classify message using Hugging Face zero-shot classification model
const classifyMessageWithPerspective= async (message) => {
    if (!message) throw new Error('Message is required for classification.');


    try {
        const response = await axios.post(
            'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze',
            {
                comment: { text: message },
                languages: ["en"],
                requestedAttributes: {SEXUALLY_EXPLICIT:{},FLIRTATION:{} ,SEVERE_TOXICITY:{}, INSULT:{}, PROFANITY:{}, THREAT:{}, IDENTITY_ATTACK:{} }
            },
            {
                headers: { 'Content-Type': 'application/json' },
                params: { key: process.env.PERSPECTIVE_API_KEY }
            }
        );

        // Convert to array and find highest score
        const scoresArray = Object.entries(response.data.attributeScores)
            .map(([attribute, data]) => ({
                attribute,
                score: data.summaryScore.value
            }));

        // Sort array by score in descending order
        scoresArray.sort((a, b) => b.score - a.score);
        console.log(response.data);
        //res.json(response.data);
        console.log(scoresArray);
        let classification = {attribute: 'safe', score:0.8};
        if(scoresArray[0].score > 0.5){
            classification = scoresArray[0]
        }
        console.log(classification)
        return classification;
    } catch (error) {
        console.error('Error calling the Perspective API:', error);
        // res.status(500).json({ message: 'Error processing the analysis' });
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
        case 'SEXUALLY_EXPLICIT':
            return 'The message contains sexually explicit content. Please avoid sending such messages.';
        case 'FLIRTATION':
            return 'The message appears to contain flirtatious content. Ensure the tone is appropriate.';
        case 'SEVERE_TOXICITY':
            return 'The message contains severe toxicity. This language is harmful and should be avoided.';
        case 'INSULT':
            return 'The message includes insulting language. Please communicate respectfully.';
        case 'PROFANITY':
            return 'The message contains profanity. Avoid using inappropriate language.';
        case 'THREAT':
            return 'The message contains a threat. This is serious and should be reported immediately.';
        case 'IDENTITY_ATTACK':
            return 'The message targets someones identity. Such language is unacceptable and should be avoided.';
        case 'safe':
            return 'The message appears to be safe, but please be careful and review the content for any potential issues.';
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
     const perClassification = await classifyMessageWithPerspective(message);

     // Analyze the result from Hugging Face model
   
     if (perClassification) {
        // Get the label with the highest score
        classification = perClassification.attribute
       // console.log("Hugging Face Classification:", bestIndex);
        //console.log("Best Label:", bestLabel);
    
    }
    else{
        console.log("No classification found from perspective model");
    }
    const feedback = generateFeedback(sentimentScore, classification, features);

    return {
        isUnsafe: classification === 'SEXUALLY_EXPLICIT' || classification === 'FLIRTATION' || classification === 'INSULT' ||classification==='PROFANITY' || classification === 'THREAT' || classification === 'IDENTITY_ATTACK' || sentimentScore < 0 || features.hasRepeatedPunctuation || features.hasAllCaps || classification == 'bullying',
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