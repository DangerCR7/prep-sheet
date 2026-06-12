// App state engine
let activeTrack = 'all';
let searchQuery = '';
let selectedPhase = 'all';
let selectedStatus = 'all';

// Progress structure inside LocalStorage
let userProgress = {
  problems: {}, // key: "dayX_probIndex" -> true/false
  learning: {}, // key: "dayX_learn" -> true/false
  projects: {}, // key: "dayX_proj" -> true/false
  streak: 0,
  lastCompletedDate: null,
  xpHistory: [] // array of { date: "YYYY-MM-DD", xp: value }
};

// Rank System
const RANKS = [
  { name: 'Rookie 🌱', minXp: 0, maxXp: 1000, icon: '🌱' },
  { name: 'Code Apprentice ⚔️', minXp: 1000, maxXp: 5000, icon: '⚔️' },
  { name: 'Java Craftsman 🛡️', minXp: 5000, maxXp: 15000, icon: '🛡️' },
  { name: 'DSA Knight 🗡️', minXp: 15000, maxXp: 30000, icon: '🗡️' },
  { name: 'System Architect 🏰', minXp: 30000, maxXp: 50000, icon: '🏰' },
  { name: 'Master Engineer 👑', minXp: 50000, maxXp: Infinity, icon: '👑' }
];

// Initialize application
window.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  setupEventListeners();
  calculateStreak();
  renderDashboard();
});

// Load state from local storage
function loadProgress() {
  const saved = localStorage.getItem('master_prep_sheet_progress');
  if (saved) {
    try {
      userProgress = JSON.parse(saved);
      if (!userProgress.problems) userProgress.problems = {};
      if (!userProgress.learning) userProgress.learning = {};
      if (!userProgress.projects) userProgress.projects = {};
      if (!userProgress.xpHistory) userProgress.xpHistory = [];
    } catch (e) {
      console.error('Failed to load progress', e);
    }
  }
}

// Save state to local storage
function saveProgress() {
  localStorage.setItem('master_prep_sheet_progress', JSON.stringify(userProgress));
  updateAnalytics();
}

// Event handlers setup
function setupEventListeners() {
  // Track button switches
  document.querySelectorAll('.track-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeTrack = e.target.getAttribute('data-track');
      renderDashboard();
    });
  });

  // Filters
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderDashboard();
  });

  document.getElementById('phase-filter').addEventListener('change', (e) => {
    selectedPhase = e.target.value;
    renderDashboard();
  });

  document.getElementById('status-filter').addEventListener('change', (e) => {
    selectedStatus = e.target.value;
    renderDashboard();
  });

  // Today FAB
  document.getElementById('fab-today').addEventListener('click', () => {
    const todayCard = document.querySelector('.day-card.today');
    if (todayCard) {
      todayCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      todayCard.classList.add('expanded');
    } else {
      // scroll to first incomplete card
      const firstIncomplete = document.querySelector('.day-card:not(.completed)');
      if (firstIncomplete) {
        firstIncomplete.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // Modal close
  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('project-modal').classList.remove('active');
  });

  // Close modal on backdrop click
  document.getElementById('project-modal').addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') {
      document.getElementById('project-modal').classList.remove('active');
    }
  });

  // Export
  document.getElementById('btn-export').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userProgress));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", `prep-sheet-progress-${new Date().toISOString().slice(0,10)}.json`);
    dlAnchorElem.click();
    triggerXpPopup(30, '📥 Progress Exported');
  });

  // Import
  const fileInput = document.getElementById('import-file');
  document.getElementById('btn-import').addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (parsed.problems || parsed.learning) {
          userProgress = parsed;
          saveProgress();
          renderDashboard();
          triggerXpPopup(50, '📤 Progress Imported!');
        }
      } catch (err) {
        alert('Invalid backup file format.');
      }
    };
    reader.readAsText(file);
  });
}

// Calculate streak based on daily problem/project activity
function calculateStreak() {
  if (!userProgress.xpHistory || userProgress.xpHistory.length === 0) {
    userProgress.streak = 0;
    return;
  }
  
  const dates = [...new Set(userProgress.xpHistory.map(h => h.date))].sort();
  if (dates.length === 0) {
    userProgress.streak = 0;
    return;
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  const lastActiveDate = dates[dates.length - 1];
  if (lastActiveDate !== todayStr && lastActiveDate !== yesterdayStr) {
    userProgress.streak = 0;
    return;
  }

  let streak = 1;
  for (let i = dates.length - 1; i > 0; i--) {
    const d1 = new Date(dates[i]);
    const d2 = new Date(dates[i - 1]);
    const diff = (d1 - d2) / (1000 * 60 * 60 * 24);
    if (diff <= 1.1) { // roughly 1 day
      streak++;
    } else {
      break;
    }
  }
  userProgress.streak = streak;
}

// Get XP totals and breakdown
function getXpDetails() {
  let learnXp = 0;
  let practiceXp = 0;
  let masteryXp = 0;

  PREP_SHEET_DATA.forEach(day => {
    // Check if learning done (day checkbox)
    if (userProgress.learning[`day${day.day}_learn`]) {
      learnXp += day.xp.learn;
    }
    
    // Check problems
    day.problems.forEach((prob, index) => {
      if (userProgress.problems[`day${day.day}_prob${index}`]) {
        let val = 100;
        if (prob.difficulty === 'Medium') val = 200;
        if (prob.difficulty === 'Hard') val = 300;
        practiceXp += val;
      }
    });

    // Check project
    if (day.project && userProgress.projects[`day${day.day}_proj`]) {
      masteryXp += day.project.xp || 500;
    }
  });

  const total = learnXp + practiceXp + masteryXp;
  return { total, learn: learnXp, practice: practiceXp, mastery: masteryXp };
}

// Determine active rank based on current XP
function getRank(xp) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

// Filter the curriculum data based on current UI settings
function getFilteredCurriculum() {
  return PREP_SHEET_DATA.filter(day => {
    // 1. Track Filter
    // If specific track is SDE/DataEng/AIEng, we show core + dsa + system_design + specific track days
    if (activeTrack !== 'all') {
      if (activeTrack === 'core' && day.track !== 'core') return false;
      if (activeTrack === 'dsa' && day.track !== 'dsa') return false;
      if (activeTrack === 'sde' && !['core', 'dsa', 'system_design', 'sde', 'interview'].includes(day.track)) return false;
      if (activeTrack === 'de' && !['core', 'dsa', 'system_design', 'de', 'interview'].includes(day.track)) return false;
      if (activeTrack === 'ai' && !['core', 'dsa', 'system_design', 'ai', 'interview'].includes(day.track)) return false;
    }

    // 2. Phase Filter
    if (selectedPhase !== 'all') {
      if (!day.phase.includes(`Phase ${selectedPhase}`)) return false;
    }

    // 3. Search Filter
    if (searchQuery) {
      const matchTopic = day.topic.toLowerCase().includes(searchQuery);
      const matchSubtopics = day.subtopics.some(s => s.toLowerCase().includes(searchQuery));
      const matchProblems = day.problems.some(p => p.name.toLowerCase().includes(searchQuery));
      if (!matchTopic && !matchSubtopics && !matchProblems) return false;
    }

    // 4. Status Filter
    if (selectedStatus !== 'all') {
      const isCompleted = isDayCompleted(day);
      const isStarted = isDayStarted(day);
      
      if (selectedStatus === 'completed' && !isCompleted) return false;
      if (selectedStatus === 'not-started' && isStarted) return false;
      if (selectedStatus === 'in-progress' && (!isStarted || isCompleted)) return false;
    }

    return true;
  });
}

function isDayCompleted(day) {
  // A day is completed if the learning is checked AND all problems are completed
  const learningDone = userProgress.learning[`day${day.day}_learn`] || false;
  if (!learningDone) return false;

  const allProblemsDone = day.problems.every((p, idx) => userProgress.problems[`day${day.day}_prob${idx}`] === true);
  if (!allProblemsDone) return false;

  if (day.project && !userProgress.projects[`day${day.day}_proj`]) return false;

  return true;
}

function isDayStarted(day) {
  const learningDone = userProgress.learning[`day${day.day}_learn`] || false;
  if (learningDone) return true;

  const anyProblemDone = day.problems.some((p, idx) => userProgress.problems[`day${day.day}_prob${idx}`] === true);
  if (anyProblemDone) return true;

  if (day.project && userProgress.projects[`day${day.day}_proj`]) return true;

  return false;
}

// Render dynamic curriculum day cards
function renderDashboard() {
  const container = document.getElementById('day-cards-container');
  container.innerHTML = '';

  const filtered = getFilteredCurriculum();
  
  if (filtered.length === 0) {
    container.innerHTML = `<div class="stat-card" style="padding: 40px; text-align: center; color: var(--text-secondary);">
      <h3>🔍 No days matches current filters.</h3>
      <p style="margin-top: 8px;">Try clearing search or filters.</p>
    </div>`;
    updateAnalytics();
    return;
  }

  // Find "Today" day. It should be the first incomplete day
  let todayDay = null;
  for (let d of PREP_SHEET_DATA) {
    if (!isDayCompleted(d)) {
      todayDay = d.day;
      break;
    }
  }

  filtered.forEach(day => {
    const isCompleted = isDayCompleted(day);
    const isStarted = isDayStarted(day);
    const isToday = day.day === todayDay;

    let cardClass = 'day-card';
    if (isCompleted) cardClass += ' completed';
    else if (isStarted) cardClass += ' in-progress';
    if (isToday) cardClass += ' today';

    const card = document.createElement('div');
    card.className = cardClass;
    card.setAttribute('data-day', day.day);

    // Calc individual day progress pct
    let completedItems = 0;
    let totalItems = 1 + day.problems.length + (day.project ? 1 : 0);
    if (userProgress.learning[`day${day.day}_learn`]) completedItems++;
    day.problems.forEach((p, idx) => {
      if (userProgress.problems[`day${day.day}_prob${idx}`]) completedItems++;
    });
    if (day.project && userProgress.projects[`day${day.day}_proj`]) completedItems++;
    const progressPct = Math.round((completedItems / totalItems) * 100);

    card.innerHTML = `
      <div class="day-card-header">
        <div class="day-num">${day.day}</div>
        <div class="day-info">
          <div class="day-topic">${day.topic}</div>
          <div class="day-subtopics" style="font-size: 11.5px; color: var(--accent-cyan); margin: 4px 0; font-weight: 500; opacity: 0.9;">
            ${day.subtopics.join(' • ')}
          </div>
          <div class="day-meta">
            <span class="badge badge-phase">${day.phase.split(':')[0]}</span>
            <span class="badge badge-track-${day.track}">${day.track.toUpperCase()}</span>
            <span>⏱️ ${day.estimatedHours} hrs</span>
          </div>
        </div>
        <div class="day-xp">+${day.xp.learn + day.xp.practice + day.xp.mastery} XP</div>
        <div class="day-progress-mini">
          <div class="day-progress-mini-fill" style="width: ${progressPct}%"></div>
        </div>
        <div class="expand-icon">▼</div>
      </div>
      <div class="day-card-body">
        <div class="section-title">💡 Concepts to Master</div>
        <div class="concept-list">
          ${day.subtopics.map(s => `<span class="concept-tag">${s}</span>`).join('')}
        </div>

        <div class="section-title">📺 Learn Resource</div>
        <a href="${day.video.url}" target="_blank" class="video-link">
          <span class="video-icon">▶️</span>
          <div class="video-info">
            <div class="video-title">${day.video.title}</div>
            <div class="video-channel">Click to watch video resource</div>
          </div>
        </a>

        <div class="section-title">✍️ Practice Tasks</div>
        <div class="problem-list">
          <div class="problem-item ${userProgress.learning[`day${day.day}_learn`] ? 'checked' : ''}">
            <input type="checkbox" class="problem-check learn-check" data-day="${day.day}" ${userProgress.learning[`day${day.day}_learn`] ? 'checked' : ''}>
            <span class="problem-name">Study concepts and watch the tutorial</span>
            <span class="difficulty-badge diff-easy">LEARN</span>
            <span class="problem-xp">+${day.xp.learn} XP</span>
          </div>

          ${day.problems.map((prob, idx) => `
            <div class="problem-item ${userProgress.problems[`day${day.day}_prob${idx}`] ? 'checked' : ''}">
              <input type="checkbox" class="problem-check prob-check" data-day="${day.day}" data-index="${idx}" ${userProgress.problems[`day${day.day}_prob${idx}`] ? 'checked' : ''}>
              <span class="problem-name">${prob.name}</span>
              <span class="difficulty-badge diff-${prob.difficulty.toLowerCase()}">${prob.difficulty}</span>
              <span class="problem-xp">+${prob.difficulty === 'Easy' ? 100 : prob.difficulty === 'Medium' ? 200 : 300} XP</span>
              <a href="${prob.url}" target="_blank" class="problem-link">Solve ↗</a>
            </div>
          `).join('')}

          ${day.practice_links.map((link, idx) => `
            <div class="problem-item">
              <span class="problem-name">${link.name} Practice Platform</span>
              <span class="difficulty-badge diff-medium">PRACTICE</span>
              <a href="${link.url}" target="_blank" class="problem-link">Open ↗</a>
            </div>
          `).join('')}
        </div>

        ${day.project ? `
          <div class="section-title">🛠️ Capstone Project</div>
          <div class="project-card" data-day="${day.day}">
            <div class="project-name">${day.project.name}</div>
            <div class="project-desc">${day.project.description}</div>
            <div class="project-skills">
              ${day.project.skills.map(s => `<span class="project-skill">${s}</span>`).join('')}
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
              <span class="project-xp">+${day.project.xp} XP</span>
              <button class="problem-link btn-claim-project" data-day="${day.day}" style="border:none; cursor:pointer;">
                ${userProgress.projects[`day${day.day}_proj`] ? '✅ Completed' : 'Mark Completed'}
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Hook card toggle
    card.querySelector('.day-card-header').addEventListener('click', (e) => {
      if (e.target.closest('.problem-link') || e.target.closest('input')) return;
      card.classList.toggle('expanded');
    });

    // Checkboxes change listeners
    card.querySelector('.learn-check').addEventListener('change', (e) => {
      const dNum = e.target.getAttribute('data-day');
      userProgress.learning[`day${dNum}_learn`] = e.target.checked;
      
      const xpVal = PREP_SHEET_DATA.find(d => d.day == dNum).xp.learn;
      trackXpEarned(xpVal, e.target.checked ? 'Earned' : 'Removed', e);
      
      saveProgress();
      renderDashboard();
    });

    card.querySelectorAll('.prob-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const dNum = e.target.getAttribute('data-day');
        const idx = e.target.getAttribute('data-index');
        userProgress.problems[`day${dNum}_prob${idx}`] = e.target.checked;

        const dayObj = PREP_SHEET_DATA.find(d => d.day == dNum);
        const prob = dayObj.problems[idx];
        let xpVal = 100;
        if (prob.difficulty === 'Medium') xpVal = 200;
        if (prob.difficulty === 'Hard') xpVal = 300;

        trackXpEarned(xpVal, e.target.checked ? 'Earned' : 'Removed', e);

        saveProgress();
        renderDashboard();
      });
    });

    const projectBtn = card.querySelector('.btn-claim-project');
    if (projectBtn) {
      projectBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Avoid triggering card modal click
        const dNum = e.target.getAttribute('data-day');
        const isDone = !userProgress.projects[`day${dNum}_proj`];
        userProgress.projects[`day${dNum}_proj`] = isDone;

        const dayObj = PREP_SHEET_DATA.find(d => d.day == dNum);
        const xpVal = dayObj.project.xp || 500;

        trackXpEarned(xpVal, isDone ? 'Earned' : 'Removed', e);

        saveProgress();
        renderDashboard();
      });
    }

    const projectCard = card.querySelector('.project-card');
    if (projectCard) {
      projectCard.addEventListener('click', (e) => {
        if (e.target.closest('.btn-claim-project')) return;
        const dNum = projectCard.getAttribute('data-day');
        const dayObj = PREP_SHEET_DATA.find(d => d.day == dNum);
        showProjectModal(dayObj.project);
      });
    }

    container.appendChild(card);
  });

  updateAnalytics();
}

function showProjectModal(project) {
  const modal = document.getElementById('project-modal');
  const body = document.getElementById('modal-body');
  
  body.innerHTML = `
    <h2 style="color: var(--accent-green); margin-bottom: 12px; font-family: var(--font-body); font-size: 22px;">🛠️ ${project.name}</h2>
    <p style="color: var(--text-primary); margin-bottom: 16px; font-size: 14px; line-height: 1.6;">${project.description}</p>
    <div style="margin-bottom: 16px;">
      <h3 style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px;">Key Skills Tested</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${project.skills.map(s => `<span class="project-skill" style="padding: 4px 10px; font-size: 11px;">${s}</span>`).join('')}
      </div>
    </div>
    <div style="background: var(--bg-secondary); border: 1px solid var(--border); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 16px;">
      <h3 style="font-size: 13px; color: var(--accent-cyan); margin-bottom: 8px;">🚀 How to get started:</h3>
      <ol style="color: var(--text-secondary); font-size: 13px; padding-left: 20px; line-height: 1.8;">
        <li>Create a dedicated repository on your GitHub account.</li>
        <li>Set up your development environment following OOP/SOLID guidelines.</li>
        <li>Implement the core business logic first (avoid UI overhead initially).</li>
        <li>Write unit tests to verify your implementation.</li>
        <li>Document your project in a high-quality README file to showcase to recruiters.</li>
      </ol>
    </div>
    <div style="font-family: var(--font-mono); font-size: 13px; color: var(--accent-amber);">Reward: +${project.xp} XP Points</div>
  `;
  
  modal.classList.add('active');
}

// Track XP History for dynamic line/activity charts
function trackXpEarned(val, action, event) {
  const todayStr = new Date().toISOString().slice(0, 10);
  
  if (action === 'Earned') {
    userProgress.xpHistory.push({ date: todayStr, xp: val });
    triggerXpPopup(val, `+${val} XP`, event);
  } else {
    // Remove last matching item from history
    const idx = userProgress.xpHistory.findIndex(h => h.date === todayStr && h.xp === val);
    if (idx !== -1) {
      userProgress.xpHistory.splice(idx, 1);
    }
    triggerXpPopup(-val, `-${val} XP`, event);
  }
}

// Create an floating text animation on mouse click positions
function triggerXpPopup(val, text, event) {
  const popup = document.createElement('div');
  popup.className = 'xp-popup';
  popup.innerText = text;
  
  if (val < 0) popup.style.color = 'var(--accent-red)';
  
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  if (event && event.clientX) {
    x = event.clientX;
    y = event.clientY;
  }

  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;
  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 1200);
}

// Update dashboard stats, linear bar charts, donuts, and timeline graphs
function updateAnalytics() {
  const details = getXpDetails();
  const rank = getRank(details.total);

  // Set top header stats
  document.getElementById('total-xp').innerText = details.total;
  document.getElementById('current-streak').innerText = userProgress.streak;
  document.getElementById('current-rank').innerText = rank.name.split(' ')[0];
  document.getElementById('rank-icon').innerText = rank.icon;

  // Problems solved count
  let solvedCount = 0;
  Object.values(userProgress.problems).forEach(v => { if (v) solvedCount++; });
  document.getElementById('problems-solved').innerText = solvedCount;

  // Level bar details
  let nextRank = RANKS[RANKS.indexOf(rank) + 1] || rank;
  let currentLevelMin = rank.minXp;
  let currentLevelMax = nextRank.minXp === Infinity ? rank.minXp + 10000 : nextRank.minXp;
  let levelProgress = details.total - currentLevelMin;
  let levelGap = currentLevelMax - currentLevelMin;
  let levelPct = Math.min(100, Math.round((levelProgress / levelGap) * 100));

  document.getElementById('xp-bar-fill').style.width = `${levelPct}%`;
  document.getElementById('xp-bar-label').innerText = `${rank.name.split(' ')[0]} → ${nextRank.name.split(' ')[0]}: ${details.total} / ${currentLevelMax} XP`;

  // XP breakdown sidebar details
  document.getElementById('xp-learn').innerText = details.learn;
  document.getElementById('xp-practice').innerText = details.practice;
  document.getElementById('xp-mastery').innerText = details.mastery;

  // Render Phase Progress
  renderPhaseBars();

  // Render Canvas Charts
  renderDonutChart(details.total);
  renderWeeklyActivity();
  renderXpTimeline();
}

function renderPhaseBars() {
  const container = document.getElementById('phase-bars');
  container.innerHTML = '';

  const phases = {};
  PREP_SHEET_DATA.forEach(day => {
    const phaseName = day.phase;
    if (!phases[phaseName]) {
      phases[phaseName] = { completed: 0, total: 0 };
    }
    
    // Day tasks completed count
    let completed = 0;
    let total = 1 + day.problems.length + (day.project ? 1 : 0);

    if (userProgress.learning[`day${day.day}_learn`]) completed++;
    day.problems.forEach((p, idx) => {
      if (userProgress.problems[`day${day.day}_prob${idx}`]) completed++;
    });
    if (day.project && userProgress.projects[`day${day.day}_proj`]) completed++;

    phases[phaseName].completed += completed;
    phases[phaseName].total += total;
  });

  Object.keys(phases).forEach(name => {
    const item = phases[name];
    const pct = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;

    const div = document.createElement('div');
    div.className = 'phase-bar-item';
    div.innerHTML = `
      <div class="phase-bar-head">
        <span class="phase-bar-name">${name.split(':')[0]}</span>
        <span class="phase-bar-pct">${pct}%</span>
      </div>
      <div class="phase-bar-track">
        <div class="phase-bar-fill" style="width: ${pct}%"></div>
      </div>
    `;
    container.appendChild(div);
  });
}

// Draw premium Donut Progress chart on canvas
function renderDonutChart(totalXp) {
  const canvas = document.getElementById('progress-donut');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const radius = 75;

  // Calculate overall completion percent
  let totalTasks = 0;
  let completedTasks = 0;
  
  PREP_SHEET_DATA.forEach(day => {
    // only count if matches active track
    if (activeTrack !== 'all') {
      if (activeTrack === 'core' && day.track !== 'core') return;
      if (activeTrack === 'dsa' && day.track !== 'dsa') return;
      if (activeTrack === 'sde' && !['core', 'dsa', 'system_design', 'sde', 'interview'].includes(day.track)) return;
      if (activeTrack === 'de' && !['core', 'dsa', 'system_design', 'de', 'interview'].includes(day.track)) return;
      if (activeTrack === 'ai' && !['core', 'dsa', 'system_design', 'ai', 'interview'].includes(day.track)) return;
    }

    totalTasks += 1 + day.problems.length + (day.project ? 1 : 0);
    if (userProgress.learning[`day${day.day}_learn`]) completedTasks++;
    day.problems.forEach((p, idx) => {
      if (userProgress.problems[`day${day.day}_prob${idx}`]) completedTasks++;
    });
    if (day.project && userProgress.projects[`day${day.day}_proj`]) completedTasks++;
  });

  const completionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  document.getElementById('donut-center-label').innerText = `${completionPct}%`;

  // Draw background ring
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#1e1e2e';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Draw progress arc
  const startAngle = -0.5 * Math.PI;
  const endAngle = startAngle + (2 * Math.PI * (completionPct / 100));

  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle);
  
  // Gradient for progress
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#00d4ff');
  grad.addColorStop(1, '#7b2ff7');

  ctx.strokeStyle = grad;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.stroke();
}

// Render weekly activity sparkline bar chart
function renderWeeklyActivity() {
  const canvas = document.getElementById('weekly-chart');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  // Gather last 7 days details
  const activityData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    
    // sum xp on this date
    let xpSum = 0;
    userProgress.xpHistory.forEach(h => {
      if (h.date === dateStr) xpSum += h.xp;
    });
    
    activityData.push({
      dayLabel: daysOfWeek[d.getDay()],
      xp: xpSum
    });
  }

  // Draw bars
  const padLeft = 30;
  const padBottom = 20;
  const chartW = canvas.width - padLeft;
  const chartH = canvas.height - padBottom;
  const barWidth = 24;
  const spacing = (chartW - (barWidth * 7)) / 8;
  const maxVal = Math.max(500, ...activityData.map(d => d.xp));

  activityData.forEach((data, idx) => {
    const barHeight = (data.xp / maxVal) * (chartH - 20);
    const rx = padLeft + spacing + idx * (barWidth + spacing);
    const ry = chartH - barHeight;

    // Draw Bar
    const grad = ctx.createLinearGradient(rx, ry, rx, chartH);
    grad.addColorStop(0, '#00d4ff');
    grad.addColorStop(1, '#7b2ff7');

    ctx.fillStyle = grad;
    // draw rounded rect
    ctx.beginPath();
    ctx.roundRect(rx, ry, barWidth, barHeight, [4, 4, 0, 0]);
    ctx.fill();

    // Draw Labels
    ctx.fillStyle = '#8888a8';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(data.dayLabel, rx + barWidth/2, chartH + 14);

    // Draw values on top if non-zero
    if (data.xp > 0) {
      ctx.fillStyle = '#e8e8f0';
      ctx.font = '9px monospace';
      ctx.fillText(data.xp, rx + barWidth/2, ry - 6);
    }
  });

  // Draw axis line
  ctx.strokeStyle = '#1e1e2e';
  ctx.beginPath();
  ctx.moveTo(padLeft, chartH);
  ctx.lineTo(canvas.width, chartH);
  ctx.stroke();
}

// Render XP accumulation timeline over the weeks
function renderXpTimeline() {
  const canvas = document.getElementById('xp-timeline');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!userProgress.xpHistory || userProgress.xpHistory.length === 0) {
    ctx.fillStyle = '#55556e';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('No practice data recorded yet', canvas.width/2, canvas.height/2);
    return;
  }

  // Sort and aggregate accumulation timeline
  const aggregated = {};
  userProgress.xpHistory.forEach(h => {
    aggregated[h.date] = (aggregated[h.date] || 0) + h.xp;
  });

  const sortedDates = Object.keys(aggregated).sort();
  let cumulative = 0;
  const points = sortedDates.map(date => {
    cumulative += aggregated[date];
    return { date, value: cumulative };
  });

  // Keep only last 10 records for readable space
  const displayPoints = points.slice(-10);

  const padLeft = 35;
  const padBottom = 20;
  const padTop = 15;
  const chartW = canvas.width - padLeft - 10;
  const chartH = canvas.height - padBottom - padTop;
  const maxVal = displayPoints[displayPoints.length - 1].value;

  ctx.strokeStyle = '#7b2ff7';
  ctx.lineWidth = 3;
  ctx.beginPath();

  displayPoints.forEach((pt, idx) => {
    const cx = padLeft + (idx * (chartW / (displayPoints.length - 1 || 1)));
    const cy = padTop + chartH - (pt.value / maxVal * chartH);

    if (idx === 0) ctx.moveTo(cx, cy);
    else ctx.lineTo(cx, cy);

    // Draw little dot
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
    ctx.fill();
  });
  ctx.stroke();

  // Draw simple scale
  ctx.fillStyle = '#55556e';
  ctx.font = '9px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(maxVal, padLeft - 6, padTop + 8);
  ctx.fillText('0', padLeft - 6, padTop + chartH);

  ctx.strokeStyle = '#1e1e2e';
  ctx.beginPath();
  ctx.moveTo(padLeft, padTop);
  ctx.lineTo(padLeft, padTop + chartH);
  ctx.stroke();
}
