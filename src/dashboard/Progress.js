import React, { useEffect, useState } from "react";
import "./Progress.css";
import bear from "../assets/bear.png";

/*
Behavior summary:
- subjects = list of subject ids with display names and per-click increments
- stored in localStorage as:
  { subjects: { reading: 20, numbers: 10, ... }, lastMarkDate: "YYYY-MM-DD", history: [...] }
- clicking "I learned something today" opens a modal with checkboxes (subject picks)
- confirm -> if none selected -> encouragement toast (no change)
- if >=1 selected -> update subject values (cap 100), save lastMarkDate=today, animate confetti
- clicking again same day shows "already logged today" with option to undo
*/

const SUBJECTS = [
  { id: "reading", label: "📚 Reading", inc: 10 },
  { id: "numbers", label: "🔢 Numbers", inc: 8 },
  { id: "writing", label: "✏️ Writing", inc: 7 },
  { id: "drawing", label: "🎨 Drawing", inc: 6 },
  { id: "gk", label: "🧠 GK", inc: 5 },
  { id: "hindi", label: "📝 Hindi", inc: 6 },
  { id: "english", label: "🔤 English", inc: 6 },
  { id: "evs", label: "🌍 EVS", inc: 5 },
  { id: "rhymes", label: "🎶 Rhymes", inc: 4 },
];

const STORAGE_KEY = "littleLearnerProgressV2";

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function Progress() {
  const [state, setState] = useState(() => {
    // default starting progress per subject
    const defaultSubjects = {};
    SUBJECTS.forEach(s => (defaultSubjects[s.id] = 0));
    return {
      subjects: defaultSubjects,
      lastMarkDate: null,
      lastMarkedSubjects: [], // what was marked on last mark (for undo)
    };
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [toast, setToast] = useState(null); // {type: 'ok'|'info'|'error', message}
  const [confettiBurst, setConfettiBurst] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // fill any missing subjects keys from config
        SUBJECTS.forEach(s => {
          if (!(parsed.subjects && typeof parsed.subjects[s.id] === "number")) {
            parsed.subjects = parsed.subjects || {};
            parsed.subjects[s.id] = 0;
          }
        });
        setState(parsed);
      }
    } catch (e) {
      // ignore, keep defaults
    }
  }, []);

  useEffect(() => {
    // auto-dismiss toast
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    // confetti visual auto-clear
    if (!confettiBurst) return;
    const t = setTimeout(() => setConfettiBurst(false), 1800);
    return () => clearTimeout(t);
  }, [confettiBurst]);

  useEffect(() => {
    // persist state
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("save fail", e);
    }
  }, [state]);

  const overallPercent = () => {
    const vals = Object.values(state.subjects);
    if (vals.length === 0) return 0;
    // average of subjects (rounded)
    const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    return avg;
  };

  const openModal = () => {
    // if already marked today, instead show message/allow undo
    if (state.lastMarkDate === todayStr()) {
      setToast({ type: "info", message: "You already logged learning today. Tap Undo to revert." });
      return;
    }
    // reset selection
    const sel = {};
    SUBJECTS.forEach(s => (sel[s.id] = false));
    setSelected(sel);
    setModalOpen(true);
  };

  const toggleSelect = (id) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const confirmLearned = () => {
    // collect picks
    const picks = Object.keys(selected).filter(k => selected[k]);
    if (picks.length === 0) {
      setToast({ type: "info", message: "No problem — try again tomorrow! 🌈" });
      setModalOpen(false);
      return;
    }

    // apply progress increments
    const newSubjects = { ...state.subjects };
    picks.forEach(pid => {
      const subjConf = SUBJECTS.find(s => s.id === pid);
      const inc = subjConf ? subjConf.inc : 5;
      newSubjects[pid] = Math.min(100, (newSubjects[pid] || 0) + inc);
    });

    // save lastMarkedSubjects for undo, and lastMarkDate
    const newState = {
      ...state,
      subjects: newSubjects,
      lastMarkDate: todayStr(),
      lastMarkedSubjects: picks,
    };
    setState(newState);

    // small celebratory feedback
    setConfettiBurst(true);
    if (picks.length === 1) {
      const label = SUBJECTS.find(s => s.id === picks[0]).label;
      setToast({ type: "ok", message: `Hooray! ${label} grew today! ⭐` });
    } else {
      setToast({ type: "ok", message: `Great job! You learned ${picks.length} things today! 🎉` });
    }

    setModalOpen(false);
  };

  const undoToday = () => {
    // can undo only if lastMarkDate == today
    if (state.lastMarkDate !== todayStr()) {
      setToast({ type: "info", message: "No recent entry to undo." });
      return;
    }
    const subs = { ...state.subjects };
    (state.lastMarkedSubjects || []).forEach(id => {
      const subjConf = SUBJECTS.find(s => s.id === id);
      const inc = subjConf ? subjConf.inc : 5;
      subs[id] = Math.max(0, (subs[id] || 0) - inc);
    });

    const newState = { ...state, subjects: subs, lastMarkDate: null, lastMarkedSubjects: [] };
    setState(newState);
    setToast({ type: "info", message: "Okay — today's entry was removed. Try again tomorrow!" });
  };

  const resetAll = () => {
    if (!window.confirm("Reset all progress? This cannot be undone.")) return;
    const zeros = {};
    SUBJECTS.forEach(s => (zeros[s.id] = 0));
    setState({ subjects: zeros, lastMarkDate: null, lastMarkedSubjects: [] });
    setToast({ type: "info", message: "All progress reset." });
  };

  const subjectHeight = (id) => {
    // height as percent for plant: map subject percent to visual height (min 6% so seedlings visible)
    const v = state.subjects[id] || 0;
    return Math.max(6, v);
  };

  return (
    <div className="kid-progress-wrap">
      {/* header */}
      <header className="kp-header">
        <h1>🌳 My Growth Journey</h1>
        <p className="kp-sub">Tap what you learned — watch the bear and plants grow!</p>
      </header>

      {/* road + bear */}
      <div className="kp-road">
        <img src={bear} alt="bear" className="kp-bear" style={{ left: `${overallPercent()}%` }} />
        <div className="kp-roadline" />
        <div className="kp-progress-bubble">Overall {overallPercent()}%</div>
      </div>

      {/* plants */}
      <div className="kp-plants">
        {SUBJECTS.slice(0, 6).map(s => (
          <div className="kp-plant" key={s.id}>
            <div className="kp-plant-pot" />
            <div className="kp-plant-sprout" style={{ height: `${subjectHeight(s.id)}%` }} />
            <div className="kp-plant-label">{s.label.replace(/^[^ ]+\s/, "")}</div>
            <div className="kp-plant-percent">{state.subjects[s.id] || 0}%</div>
          </div>
        ))}
      </div>

      {/* CTA row */}
      <div className="kp-cta-row">
        <button
          className={`kp-learn-btn ${state.lastMarkDate === todayStr() ? "logged" : ""}`}
          onClick={openModal}
        >
          {state.lastMarkDate === todayStr() ? "Logged today ✓" : "I learned something today!"}
        </button>

        {state.lastMarkDate === todayStr() && (
          <button className="kp-undo-btn" onClick={undoToday}>Undo</button>
        )}

        <button className="kp-reset-btn" onClick={resetAll}>Reset</button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="kp-modal-backdrop" role="dialog" aria-modal="true">
          <div className="kp-modal">
            <h3>What did you learn today?</h3>
            <p className="muted">Choose one or more — then tap Done</p>

            <div className="kp-subject-grid">
              {SUBJECTS.map(s => (
                <button
                  key={s.id}
                  className={`kp-subject-btn ${selected[s.id] ? "on" : ""}`}
                  onClick={() => toggleSelect(s.id)}
                >
                  <span className="kp-subject-icon">{s.label.split(" ")[0]}</span>
                  <span className="kp-subject-text">{s.label.replace(/^[^ ]+\s/, "")}</span>
                </button>
              ))}
            </div>

            <div className="kp-modal-actions">
              <button className="kp-modal-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="kp-modal-done" onClick={confirmLearned}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Confetti (simple CSS) */}
      {confettiBurst && (
        <div className="kp-confetti">
          {Array.from({ length: 18 }).map((_, i) => <span key={i} className={`kp-confetti-piece p${i%6}`}></span>)}
        </div>
      )}

      {/* toast */}
      {toast && (
        <div className={`kp-toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
