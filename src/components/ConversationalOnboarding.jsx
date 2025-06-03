import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/conversationalOnboarding.css';

const questions = [
  {
    id: 'fullname',
    question: "What's your full name?",
    placeholder: "Riya Sharma",
    suggestions: []
  },
  {
    id: 'dob',
    question: "When were you born? (DD/MM/YYYY)",
    placeholder: "24/08/1993",
    suggestions: []
  },
  {
    id: 'gender',
    question: "What’s your gender and who are you looking to match with?",
    placeholder: "I'm a woman looking for a man",
    suggestions: [
      "I'm a man looking for a woman",
      "I'm a woman looking for a man",
      "I'm open to all genders"
    ]
  },
  {
    id: 'religionCaste',
    question: "What's your religion and (optionally) caste?",
    placeholder: "Hindu, Brahmin",
    suggestions: [
      "Hindu, Brahmin",
      "Muslim, Sunni",
      "Christian, Roman Catholic",
      "I prefer not to specify caste"
    ]
  },
  {
    id: 'language',
    question: "What's your mother tongue or preferred language?",
    placeholder: "Hindi",
    suggestions: ["Hindi", "Tamil", "Punjabi", "Bengali", "Telugu"]
  },
  {
    id: 'location',
    question: "Where are you currently living?",
    placeholder: "Mumbai, Maharashtra",
    suggestions: []
  },
  {
    id: 'education',
    question: "Tell us about your education background.",
    placeholder: "MBA in Finance from Delhi University",
    suggestions: []
  },
  {
    id: 'professionIncome',
    question: "What do you do and what’s your annual income bracket?",
    placeholder: "Software Engineer, ₹15–20 LPA",
    suggestions: [
      "Doctor, ₹10–15 LPA",
      "Chartered Accountant, ₹20–30 LPA",
      "Entrepreneur, varies"
    ]
  },
  {
    id: 'maritalStatus',
    question: "What's your current marital status?",
    placeholder: "Never married",
    suggestions: ["Never married", "Divorced", "Widowed", "Annulled"]
  },
  {
    id: 'heightBodyType',
    question: "What’s your height and body type?",
    placeholder: "5'6\", average build",
    suggestions: []
  },
  {
    id: 'dietHabits',
    question: "What’s your diet like?",
    placeholder: "Vegetarian",
    suggestions: ["Vegetarian", "Non-vegetarian", "Eggetarian", "Vegan"]
  },
  {
    id: 'lifestyleHabits',
    question: "Do you smoke or drink?",
    placeholder: "I don’t smoke or drink",
    suggestions: ["Occasionally drink, don’t smoke", "No to both", "Yes to both"]
  },
  {
    id: 'familyStructure',
    question: "Tell us about your family setup.",
    placeholder: "We’re a close-knit joint family of 6 in Jaipur.",
    suggestions: []
  },
  {
    id: 'livingSituation',
    question: "Do you live alone or with family currently?",
    placeholder: "I live with my parents",
    suggestions: ["Alone", "With parents", "With roommates"]
  },
  {
    id: 'about',
    question: "Tell me about yourself.",
    placeholder: "I'm a creative, outdoorsy person who loves music and travel.",
    suggestions: [
      "I'm a creative, outdoorsy person who loves music and travel.",
      "I'm passionate about technology and helping others.",
      "I'm a family-oriented person who enjoys cooking and reading."
    ]
  },
  {
    id: 'profession',
    question: "What do you do for a living, and what do you enjoy most about it?",
    placeholder: "I'm a software developer who enjoys solving complex problems.",
    suggestions: [
      "I'm a software developer who enjoys solving complex problems.",
      "I'm a teacher who loves making a difference in students' lives.",
      "I'm self-employed and enjoy the flexibility to follow my passion."
    ]
  },
  {
    id: 'lifestyle',
    question: "How would you describe your lifestyle – traditional, modern, or a mix?",
    placeholder: "I'm a mix – I value family traditions but love modern ideas.",
    suggestions: [
      "I'm traditional and deeply rooted in my culture.",
      "I'm modern and independent in my choices.",
      "I'm a mix – I value family traditions but love modern ideas."
    ]
  },
  {
    id: 'finance',
    question: "Are you more of a saver or a spender?",
    placeholder: "I'm financially balanced – I save and splurge occasionally.",
    suggestions: [
      "I'm a careful planner who prioritizes saving and investing.",
      "I'm financially balanced – I save but enjoy spending on experiences.",
      "I live in the moment and focus on enjoying life now."
    ]
  },
  {
    id: 'happiness',
    question: "What makes you happiest in a relationship?",
    placeholder: "Feeling understood and sharing adventures together.",
    suggestions: [
      "Feeling understood and sharing adventures together.",
      "Open communication and mutual respect.",
      "Growing together and supporting each other's dreams."
    ]
  },
  {
    id: 'friends',
    question: "How do your friends describe you?",
    placeholder: "Supportive, funny, and always up for a challenge.",
    suggestions: [
      "Supportive, funny, and always up for a challenge.",
      "Reliable and always there when needed.",
      "Optimistic and full of positive energy."
    ]
  },
  {
    id: 'values',
    question: "What are some core values you live by?",
    placeholder: "Integrity, empathy, and lifelong learning.",
    suggestions: [
      "Honesty, loyalty, and respect.",
      "Empathy, kindness, and spiritual growth.",
      "Independence, curiosity, and self-improvement."
    ]
  },
  {
    id: 'partner',
    question: "What are you looking for in a partner?",
    placeholder: "Someone kind, ambitious, and who values family.",
    suggestions: [
      "Someone kind, ambitious, and who values family.",
      "A partner who is honest and supportive.",
      "Someone who shares my values and dreams."
    ]
  },
  {
    id: 'future',
    question: "Where do you see your life in the next 5 years?",
    placeholder: "Settled with a partner, growing personally and professionally.",
    suggestions: [
      "Settled with a partner and building a family.",
      "Focused on personal growth and a fulfilling career.",
      "Living abroad and exploring new cultures with a partner."
    ]
  },
  {
    id: 'dealbreakers',
    question: "Are there any dealbreakers or non-negotiables for you in a relationship?",
    placeholder: "Dishonesty and lack of emotional maturity are my dealbreakers.",
    suggestions: [
      "Dishonesty and lack of emotional maturity.",
      "Disrespect for family or culture.",
      "Closed-mindedness or lack of ambition."
    ]
  },
  {
    id: 'parentingGoals',
    question: "Do you want children in the future?",
    placeholder: "Yes, 1 or 2 kids",
    suggestions: ["Yes", "No", "Open to it"]
  },
  {
    id: 'loveLanguages',
    question: "Which love languages resonate most with you?",
    placeholder: "Words of affirmation and quality time",
    suggestions: [
      "Words of affirmation",
      "Quality time",
      "Acts of service",
      "Physical touch",
      "Gifts"
    ]
  },
  {
    id: 'conflictStyle',
    question: "How do you handle disagreements in a relationship?",
    placeholder: "I believe in open communication and empathy.",
    suggestions: [
      "I prefer open, calm discussions.",
      "I need some time alone before resolving things.",
      "I tend to shut down during conflict but I'm working on it."
    ]
  },
  {
    id: 'greenFlags',
    question: "What are some green flags you value in a partner?",
    placeholder: "Kindness, ambition, good communication",
    suggestions: [
      "Kindness", "Emotionally available", "Respectful of family", "Supportive"
    ]
  },
  {
    id: 'redFlags',
    question: "Any red flags or traits you want to avoid?",
    placeholder: "Dishonesty, controlling behavior",
    suggestions: [
      "Dishonesty", "Substance abuse", "Controlling", "Emotionally unavailable"
    ]
  }
];

const ConversationalOnboarding = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState('');

  const handleNext = () => {
    if (!input.trim()) return;
    setAnswers({ ...answers, [questions[step].id]: input });
    setInput('');
    setStep(step + 1);
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSuggestionClick = (suggestion) => setInput(suggestion);

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setInput('');
  };

  return (
    <div className="onboarding-page-container" style={{ justifyContent: 'center' }}>
      <div className="onboarding-content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="onboarding-chat-card"
        >
          <h2 className="onboarding-title">Welcome to ShaadiStory.ai!</h2>
          <div className="chat-window">
            {questions.slice(0, step).map((q) => (
              <div key={q.id} className="chat-bubble bot">
                <span className="bubble-content">{q.question}</span>
                <div className="chat-bubble user">
                  <span className="bubble-content">{answers[q.id]}</span>
                </div>
              </div>
            ))}
            {step < questions.length && (
              <div className="chat-bubble bot">
                <span className="bubble-content">{questions[step].question}</span>
              </div>
            )}
          </div>
          {step < questions.length ? (
            <>
              <form
                className="chat-input-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
              >
                <input
                  type="text"
                  className="chat-input"
                  placeholder={questions[step].placeholder}
                  value={input}
                  onChange={handleInputChange}
                  autoFocus
                />
                <button type="submit" className="chat-submit-btn">Next</button>
              </form>
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {questions[step].suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="chat-submit-btn"
                    style={{ background: '#e3eeff', color: '#4a4a8a', fontSize: '0.95rem', padding: '6px 12px' }}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="onboarding-summary">
              <h3>Thank you for sharing!</h3>
              <div className="summary-answers">
                {questions.map((q) => (
                  <div key={q.id} className="summary-item">
                    <strong>{q.question}</strong>
                    <div>{answers[q.id]}</div>
                  </div>
                ))}
              </div>
              <button className="restart-btn" onClick={handleRestart}>Start Over</button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ConversationalOnboarding;
