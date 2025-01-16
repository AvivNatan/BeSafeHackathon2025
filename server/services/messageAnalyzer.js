import natural from 'natural';
import Sentiment from 'sentiment';
const tokenizer = new natural.WordTokenizer();

const sentiment = new Sentiment();

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

// Train the Naive Bayes classifier with example data
const trainClassifier = () => {
    // Unsafe content (phishing, fraud, etc.)
    customNaiveBayes.addDocument('Your bank account has been compromised.', 'phishing');
    customNaiveBayes.addDocument('Click here to claim your prize!', 'phishing');
    customNaiveBayes.addDocument('This is a fraud attempt, click the link.', 'fraud');
    customNaiveBayes.addDocument('You won a lottery, provide your bank details to claim.', 'phishing');
    customNaiveBayes.addDocument('I will hurt you.', 'sexual_assault');
    
    // Safe content
    customNaiveBayes.addDocument('This is a friendly reminder about our meeting tomorrow.', 'safe');
    customNaiveBayes.addDocument('Thank you for your help!', 'safe');
    customNaiveBayes.addDocument('Looking forward to our next conversation!', 'safe');
    
    // Train the classifier with documents
    customNaiveBayes.train();
};

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
            return 'The message contains harmful or inappropriate language. Report it if necessary.';
        case 'safe':
            return 'The message appears to be safe.';
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
const analyzeMessage = (message) => {
    const sentimentScore = analyzeSentiment(message);
    const classification = classifyMessage(message);
    const features = computeFeatures(message);

    const feedback = generateFeedback(sentimentScore, classification, features);

    return {
        isUnsafe: classification === 'phishing' || classification === 'fraud' || classification === 'sexual_assault' || sentimentScore < 0 || features.hasRepeatedPunctuation || features.hasAllCaps,
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

export default analyzeMessage;
trainClassifier(); /*added*/