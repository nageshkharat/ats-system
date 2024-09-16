function calculateATSScore(resumeText, jobDescription) {
  // Dummy implementation for ATS scoring
  // This should be replaced with a more sophisticated algorithm
  const resumeWords = resumeText.toLowerCase().split(/\s+/);
  const jobWords = jobDescription.toLowerCase().split(/\s+/);

  const matchCount = jobWords.filter(word => resumeWords.includes(word)).length;
  const score = (matchCount / jobWords.length) * 100;

  return Math.round(score);
}

module.exports = { calculateATSScore };
