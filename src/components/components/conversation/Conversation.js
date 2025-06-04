import React, { useState, useEffect, useCallback, useRef } from "react";
import './Conversation.css'; // Import the CSS file

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [conversationStarted, setConversationStarted] = useState(false);
  const [conversationCompleted, setConversationCompleted] = useState(false);
  
  // Refs to prevent duplicate operations
  const initializationRef = useRef(false);
  const messagesEndRef = useRef(null);

  const questions = [
    { 
      id: 'education', 
      question: "Tell us about your education background.",
      expectedType: "education",
      hint: 'E.g., "I completed my Bachelor\'s in Engineering from XYZ University"'
    },
    { 
      id: 'professionIncome', 
      question: "What do you do and what's your annual income bracket?",
      expectedType: "profession_income",
      hint: 'E.g., "I work as a Software Engineer and earn 8-10 lakhs annually"'
    },
    { 
      id: 'maritalStatus', 
      question: "What's your current marital status?",
      expectedType: "marital_status",
      hint: 'E.g., "I am currently single" or "I am married"'
    },
    { 
      id: 'heightBodyType', 
      question: "What's your height and body type?",
      expectedType: "physical_description",
      hint: 'E.g., "I am 5\'7" tall with an athletic build"'
    },
    { 
      id: 'dietHabits', 
      question: "What's your diet like?",
      expectedType: "diet",
      hint: 'E.g., "I am vegetarian and prefer home-cooked meals"'
    },
    { 
      id: 'lifestyleHabits', 
      question: "Do you smoke or drink?",
      expectedType: "habits",
      hint: 'E.g., "I don\'t smoke and drink occasionally on social occasions"'
    },
    { 
      id: 'familyStructure', 
      question: "Tell us about your family setup.",
      expectedType: "family",
      hint: 'E.g., "I come from a nuclear family with parents and one sibling"'
    },
    { 
      id: 'livingSituation', 
      question: "Do you live alone or with family currently?",
      expectedType: "living_situation",
      hint: 'E.g., "I live with my parents" or "I live alone in a rented apartment"'
    },
    { 
      id: 'about', 
      question: "Tell me about yourself.",
      expectedType: "personal_description",
      hint: 'E.g., "I am a creative person who loves photography and traveling"'
    },
    { 
      id: 'profession', 
      question: "What do you do for a living, and what do you enjoy most about it?",
      expectedType: "profession_enjoyment",
      hint: 'E.g., "I work as a teacher and love inspiring young minds"'
    },
    { 
      id: 'lifestyle', 
      question: "How would you describe your lifestyle – traditional, modern, or a mix?",
      expectedType: "lifestyle_description",
      hint: 'E.g., "I have a modern lifestyle but value traditional family values"'
    },
    { 
      id: 'finance', 
      question: "Are you more of a saver or a spender?",
      expectedType: "financial_habits",
      hint: 'E.g., "I am more of a saver and believe in financial planning"'
    },
    { 
      id: 'happiness', 
      question: "What makes you happiest in a relationship?",
      expectedType: "relationship_preferences",
      hint: 'E.g., "Good communication and mutual respect make me happiest"'
    },
    { 
      id: 'friends', 
      question: "How do your friends describe you?",
      expectedType: "personal_qualities",
      hint: 'E.g., "My friends describe me as loyal, funny, and supportive"'
    },
    { 
      id: 'values', 
      question: "What are some core values you live by?",
      expectedType: "personal_values",
      hint: 'E.g., "Honesty, respect, and family are my core values"'
    },
    { 
      id: 'partner', 
      question: "What are you looking for in a partner?",
      expectedType: "partner_preferences",
      hint: 'E.g., "I am looking for someone who is caring, ambitious, and shares similar values"'
    },
    { 
      id: 'future', 
      question: "Where do you see your life in the next 5 years?",
      expectedType: "future_plans",
      hint: 'E.g., "I see myself settled in my career with a loving family"'
    },
    { 
      id: 'dealbreakers', 
      question: "Are there any dealbreakers or non-negotiables for you in a relationship?",
      expectedType: "relationship_dealbreakers",
      hint: 'E.g., "Dishonesty and lack of respect are dealbreakers for me"'
    },
    { 
      id: 'parentingGoals', 
      question: "Do you want children in the future?",
      expectedType: "parenting_preferences",
      hint: 'E.g., "Yes, I want to have children in the future" or "No, I don\'t plan to have kids"'
    },
    { 
      id: 'loveLanguages', 
      question: "Which love languages resonate most with you?",
      expectedType: "love_languages",
      hint: 'E.g., "Quality time and words of affirmation resonate most with me"'
    },
    { 
      id: 'conflictStyle', 
      question: "How do you handle disagreements in a relationship?",
      expectedType: "conflict_resolution",
      hint: 'E.g., "I prefer open communication and discussing issues calmly"'
    },
    { 
      id: 'greenFlags', 
      question: "What are some green flags you value in a partner?",
      expectedType: "positive_qualities",
      hint: 'E.g., "Kindness, emotional intelligence, and good sense of humor"'
    },
    { 
      id: 'redFlags', 
      question: "Any red flags or traits you want to avoid?",
      expectedType: "negative_qualities",
      hint: 'E.g., "Controlling behavior, dishonesty, and lack of ambition"'
    }
  ];

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize conversation - this runs immediately
  useEffect(() => {
    const initializeConversation = () => {
      if (initializationRef.current) return;
      
      initializationRef.current = true;
      
      // Generate a mock conversation ID
      const mockConversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setConversationId(mockConversationId);
      
      // Start conversation immediately with welcome message
      const welcomeMessage = { 
        text: "Hi there! I'm your onboarding assistant. I'll ask you some questions to help create your profile. Let's get started!", 
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      setConversationStarted(true);
      setIsLoading(false);
      
      // Ask first question after a short delay
      setTimeout(() => {
        askFirstQuestion();
      }, 1500);
    };

    initializeConversation();
  }, []);

  const askFirstQuestion = () => {
    if (questions.length > 0) {
      const firstQuestion = questions[0].question;
      const botMessage = { 
        text: firstQuestion, 
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setValidationError("");
    }
  };

  const validateResponse = (text, currentQuestion) => {
    const cleanText = text.trim().toLowerCase();
    
    // Basic validation checks
    const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 3) {
      return {
        isValid: false,
        feedback: "Please provide a more detailed answer (at least 3 meaningful words)."
      };
    }

    // Check for meaningless responses
    const meaninglessPatterns = [
      /^[a-z]\s*$/i, // Single letters
      /^\d+\s*$/,    // Only numbers
      /^[!@#$%^&*(),.?":{}|<>]+$/, // Only special characters
      /^(ha|haha|lol|ok|yes|no|idk|dunno|hmm|uh|um|er|ah)\s*$/i, // Meaningless words
      /^(.)\1{2,}$/, // Repeated characters like "hhh" or "aaa"
      /^(test|testing|asdf|qwerty|abc|123|hello|hi|hey)\s*$/i // Common test inputs
    ];

    if (meaninglessPatterns.some(pattern => pattern.test(cleanText))) {
      return {
        isValid: false,
        feedback: "Please provide a meaningful answer related to the question."
      };
    }

    // Check for vague responses
    const vaguePhrases = [
      "i don't know", "not sure", "maybe", "can't say", "dunno", "don't know",
      "no idea", "not really", "kind of", "sort of", "i guess", "whatever",
      "anything", "nothing", "everything", "something", "someone", "anyone"
    ];
    
    if (vaguePhrases.some(phrase => cleanText.includes(phrase))) {
      return {
        isValid: false,
        feedback: "Please try to be more specific in your answer."
      };
    }

    // Question-specific validation
    return validateByQuestionType(cleanText, currentQuestion);
  };

  const validateByQuestionType = (text, currentQuestion) => {
    switch (currentQuestion.id) {
      case 'education':
        const educationKeywords = ['school', 'college', 'university', 'degree', 'bachelor', 'master', 'phd', 'diploma', 'certificate', 'graduate', 'study', 'studied', 'education', 'engineering', 'arts', 'science', 'commerce', 'mba', 'btech', 'bsc', 'msc', 'ba', 'ma'];
        if (!educationKeywords.some(keyword => text.includes(keyword))) {
          return { isValid: false, feedback: "Please describe your educational background (school, college, degree, etc.)." };
        }
        break;
        
      case 'maritalStatus':
        const maritalKeywords = ['single', 'married', 'divorced', 'widowed', 'separated', 'unmarried', 'bachelor', 'spinster', 'relationship', 'engaged', 'dating', 'committed'];
        if (!maritalKeywords.some(keyword => text.includes(keyword))) {
          return { isValid: false, feedback: "Please clearly state your marital status (single, married, etc.)." };
        }
        break;
        
      case 'lifestyleHabits':
        const habitsKeywords = ['smoke', 'smoking', 'drink', 'drinking', 'alcohol', 'never', 'rarely', 'sometimes', 'often', 'daily', 'weekly', 'no', 'yes', 'dont', "don't", 'quit', 'stopped', 'social', 'occasional'];
        if (!habitsKeywords.some(keyword => text.includes(keyword))) {
          return { isValid: false, feedback: "Please clearly state your smoking and drinking habits." };
        }
        break;
    }
    
    return { isValid: true, feedback: "" };
  };

  const askNextQuestion = useCallback(() => {
    if (conversationCompleted || currentQuestionIndex + 1 >= questions.length) {
      // Conversation completed
      const completionMessage = { 
        text: "Thank you for answering all the questions! Your profile is now complete. 🎉", 
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, completionMessage]);
      setConversationCompleted(true);
      return;
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    const nextQuestion = questions[nextQuestionIndex].question;
    const botMessage = { 
      text: nextQuestion, 
      sender: "bot",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
    setCurrentQuestionIndex(nextQuestionIndex);
    setValidationError("");
  }, [currentQuestionIndex, questions.length, conversationCompleted]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim() || isProcessing || conversationCompleted) {
      return;
    }

    setIsProcessing(true);
    
    try {
      const userMessage = { 
        text: inputValue.trim(), 
        sender: "user",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      
      const currentQuestion = questions[currentQuestionIndex];
      
      // Validate response
      const validationResult = validateResponse(inputValue.trim(), currentQuestion);
      
      if (!validationResult.isValid) {
        setValidationError(validationResult.feedback);
        setIsProcessing(false);
        return;
      }

      // Save user response
      setUserResponses(prev => ({
        ...prev,
        [currentQuestion.id]: inputValue.trim()
      }));

      // Clear input and error
      setInputValue("");
      setValidationError("");
      
      // Ask next question after delay
      setTimeout(() => {
        askNextQuestion();
      }, 1000);
      
    } catch (error) {
      console.error("Error processing message:", error);
      setValidationError("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getCurrentHint = () => {
    if (currentQuestionIndex < questions.length) {
      return questions[currentQuestionIndex].hint;
    }
    return 'Please provide a detailed and specific answer.';
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-card">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <h2 className="loading-title">Welcome to ProfileFinder</h2>
            <p className="loading-text">Loading conversation assistant...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        {/* Header */}
        <div className="chat-header">
          <h2 className="chat-title">Welcome to ProfileFinder</h2>
          <div className="progress-container">
            <span className="progress-text">
              Question {Math.min(currentQuestionIndex + 1, questions.length)} of {questions.length}
            </span>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Messages Container */}
        <div className="messages-container">
          <div className="messages-list">
            {messages.map((message, index) => (
              <div key={`${message.sender}-${index}`} className={`message-wrapper ${message.sender}`}>
                <div className={`message-bubble ${message.sender}`}>
                  <p className="message-text">{message.text}</p>
                  <p className={`message-timestamp ${message.sender}`}>
                    {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
        
        {/* Validation Error */}
        {validationError && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            <div className="alert-content error">
              <strong className="alert-title">Invalid Answer:</strong> {validationError}
            </div>
          </div>
        )}
        
        {/* Hint */}
        <div className="alert alert-info">
          <span className="alert-icon">💡</span>
          <span className="alert-content info alert-text">{getCurrentHint()}</span>
        </div>
        
        {/* Input or Completion */}
        {!conversationCompleted ? (
          <div className="input-section">
            <div className="input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your answer..."
                disabled={isProcessing}
                maxLength={1000}
                className="input-field"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <button 
                onClick={handleSendMessage}
                disabled={isProcessing || !inputValue.trim()}
                className="send-button"
              >
                {isProcessing ? (
                  <>
                    <div className="button-spinner"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Send</span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="completion-section">
            <div className="completion-icon">✅</div>
            <h3 className="completion-title">Profile Setup Complete!</h3>
            <p className="completion-text">You can review your answers in your profile section.</p>
            <button 
              className="completion-button"
              onClick={() => console.log('Navigate to profile:', userResponses)}
            >
              Review Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatComponent;
