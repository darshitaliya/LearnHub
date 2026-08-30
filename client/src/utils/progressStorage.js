// LocalStorage and Server Progress Synchronizer

export function getLocalProgressKey(userId, courseId) {
  return `learnhub_progress_${userId || 'guest'}_${courseId || 'general'}`;
}

export function getLocalProgress(userId, courseId) {
  try {
    const raw = localStorage.getItem(getLocalProgressKey(userId, courseId));
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    // Ignore storage parse errors
  }
  return null;
}

export function saveLocalProgress(userId, courseId, progressData) {
  try {
    const existing = getLocalProgress(userId, courseId) || {};
    const merged = {
      ...existing,
      ...progressData,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(getLocalProgressKey(userId, courseId), JSON.stringify(merged));
    return merged;
  } catch (e) {
    // Ignore storage write errors
  }
  return progressData;
}

export function resolveMergedProgress(serverProg, localProg, totalLessonsCount = 1) {
  const s = serverProg || {};
  const l = localProg || {};

  // Combine completed lessons from both server and local cache
  const combinedCompleted = Array.from(
    new Set([...(s.completedLessons || []), ...(l.completedLessons || [])])
  );

  const completedCount = combinedCompleted.length;
  const countMax = Math.max(totalLessonsCount, completedCount, 1);
  const calcPct = Math.min(100, Math.round((completedCount / countMax) * 100));

  const sPct = typeof s.percentage === 'number' ? s.percentage : 0;
  const lPct = typeof l.percentage === 'number' ? l.percentage : 0;

  const isQuizPassed = Boolean(s.quizPassed || l.quizPassed);
  const isCertEarned = Boolean(s.certificateEarned || l.certificateEarned || isQuizPassed);

  // Highest percentage across all records
  let finalPct = Math.max(sPct, lPct, calcPct);
  if (isQuizPassed || isCertEarned || (completedCount >= countMax && completedCount > 0)) {
    finalPct = 100;
  }

  const isModulesDone = finalPct >= 100 || isQuizPassed || (completedCount >= countMax && completedCount > 0);

  return {
    percentage: isModulesDone ? 100 : finalPct,
    completedLessons: combinedCompleted,
    completedCount,
    totalLessonsCount: countMax,
    isModulesCompleted: isModulesDone,
    isQuizUnlocked: isModulesDone,
    quizPassed: isQuizPassed,
    quizScore: Math.max(s.quizScore || 0, l.quizScore || 0, isQuizPassed ? 100 : 0),
    certificateEarned: isCertEarned,
  };
}
