import { atsKeywords } from './atsKeywords.js';

export const calculateAtsScore = (resumeText, jobDescriptionText = '') => {
  let score = 0;
  const suggestions = [];
  const lowerCaseResumeText = resumeText.toLowerCase();
  const lowerCaseJobDescriptionText = jobDescriptionText.toLowerCase();
  const resumeWordCount = resumeText.split(/\s+/).filter(word => word.length > 0).length;

  let sectionScore = 0;
  atsKeywords.sections.forEach(section => {
    if (lowerCaseResumeText.includes(section)) {
      sectionScore += 3.75;
    } else {
      suggestions.push(`AI Suggestion: Ensure a clearly labeled "${section.charAt(0).toUpperCase() + section.slice(1)}" section is present.`);
    }
  });
  score += sectionScore;

  let techKeywordScore = 0;
  const foundTechKeywords = new Set();
  atsKeywords.tech.forEach(keyword => {
    if (lowerCaseResumeText.includes(keyword)) {
      if (techKeywordScore < 20) {
        techKeywordScore += 1;
      }
      foundTechKeywords.add(keyword);
    }
  });
  score += techKeywordScore;
  if (techKeywordScore < 20) {
    suggestions.push("AI Suggestion: Incorporate more technical keywords relevant to your target roles. Consider adding: " + atsKeywords.tech.filter(k => !foundTechKeywords.has(k)).slice(0, 5).join(', ') + "...");
  }

  let softKeywordScore = 0;
  const foundSoftKeywords = new Set();
  atsKeywords.soft.forEach(keyword => {
    if (lowerCaseResumeText.includes(keyword)) {
      if (softKeywordScore < 20) {
        softKeywordScore += 1;
      }
      foundSoftKeywords.add(keyword);
    }
  });
  score += softKeywordScore;
  if (softKeywordScore < 20) {
    suggestions.push("AI Suggestion: Highlight more soft skills. Examples: " + atsKeywords.soft.filter(k => !foundSoftKeywords.has(k)).slice(0, 5).join(', ') + "...");
  }

  if (resumeWordCount >= 300 && resumeWordCount <= 800) {
    score += 10;
  } else if (resumeWordCount < 300) {
    suggestions.push(`AI Suggestion: Your resume is quite concise (${resumeWordCount} words). Elaborate more on achievements and responsibilities.`);
  } else {
    suggestions.push(`AI Suggestion: Your resume is lengthy (${resumeWordCount} words). Aim for conciseness, typically 1–2 pages.`);
  }

  let jobMatchScore = 0;
  const jdMissingKeywords = new Set();
  if (jobDescriptionText.trim() !== '') {
    const jdKeywords = lowerCaseJobDescriptionText.match(/\b\w+\b/g) || [];
    const stopWords = new Set(['the', 'and', 'for', 'with', 'you', 'your', 'from', 'this', 'that', 'our', 'will', 'must', 'have', 'are', 'responsibilities', 'experience', 'skills', 'requirements', 'a', 'an', 'to', 'in', 'on', 'at', 'is', 'it', 'be', 'by', 'of', 'or', 'not', 'as', 'but', 'if', 'then', 'else', 'when', 'where', 'how', 'what', 'who', 'whom', 'which', 'why', 'can', 'could', 'should', 'would', 'may', 'might', 'shall', 'been', 'being', 'do', 'does', 'did', 'done', 'doing', 'has', 'had', 'having', 'get', 'gets', 'got', 'getting', 'make', 'makes', 'made', 'making', 'see', 'sees', 'saw', 'seeing', 'take', 'takes', 'took', 'taking', 'go', 'goes', 'went', 'going', 'come', 'comes', 'came', 'coming', 'know', 'knows', 'knew', 'knowing', 'think', 'thinks', 'thought', 'thinking', 'look', 'looks', 'looked', 'looking', 'want', 'wants', 'wanted', 'wanting', 'give', 'gives', 'gave', 'giving', 'use', 'uses', 'used', 'using', 'find', 'finds', 'found', 'finding', 'tell', 'tells', 'told', 'telling', 'ask', 'asks', 'asked', 'asking', 'work', 'works', 'worked', 'working', 'seem', 'seems', 'seemed', 'seeming', 'feel', 'feels', 'felt', 'feeling', 'try', 'tries', 'tried', 'trying', 'leave', 'leaves', 'left', 'leaving', 'call', 'calls', 'called', 'calling']);
    const uniqueJdKeywords = new Set(jdKeywords.filter(word => word.length > 2 && !stopWords.has(word)));

    let matchedJdKeywordsCount = 0;
    uniqueJdKeywords.forEach(jdKeyword => {
      if (lowerCaseResumeText.includes(jdKeyword)) {
        matchedJdKeywordsCount++;
      } else {
        jdMissingKeywords.add(jdKeyword);
      }
    });

    if (uniqueJdKeywords.size > 0) {
      jobMatchScore = Math.min(20, Math.floor((matchedJdKeywordsCount / uniqueJdKeywords.size) * 20));
    }
    score += jobMatchScore;

    if (jdMissingKeywords.size > 0) {
      suggestions.push(`AI Suggestion: Your resume could better align with the job description. Consider adding keywords like: ${Array.from(jdMissingKeywords).slice(0, 5).join(', ')}.`);
    } else if (uniqueJdKeywords.size > 0 && matchedJdKeywordsCount === uniqueJdKeywords.size) {
      suggestions.push("AI Insight: Excellent keyword alignment with the provided job description!");
    }
  } else {
    suggestions.push("AI Suggestion: For a more precise ATS analysis, provide a relevant job description.");
  }

  score = Math.min(score, 100);

  return { score, suggestions };
};
