// MathsNur.js
import React, { useEffect, useRef, useState } from "react";
import NavbarAfterLogin from "../dashboard/NavbarAfterLogin"; // adjust path if needed
import "./MathsNur.css";

/*
  Auto-lessons + assignments (NO VOICE).
  - Lessons auto-play (visual images or video) for `duration` ms each.
  - When lessons finish, assignments start and are answered by tapping options.
  - Stars: lessons-star (1) and assignments-stars (3) saved in state.
  - Progress saved in localStorage key MATHS_NUR_V3
*/

const STORAGE_KEY = "MATHS_NUR_V3";

/* --- Example LESSONS (replace srcs) --- */
const LESSONS = [
  { id: "L1", title: "Counting — 1 to 3", media: { type: "image", src: "/assets/lesson-count-1-3.png" }, duration: 3500 },
  { id: "L2", title: "Shapes — Circle vs Square", media: { type: "image", src: "/assets/lesson-shapes.png" }, duration: 3500 },
  { id: "L3", title: "Size — Big & Small", media: { type: "image", src: "/assets/lesson-size.png" }, duration: 3500 }
];

/* --- Example ASSIGNMENTS (replace srcs/options/expected) --- */
const ASSIGNMENTS = [
  { id: "A-count-1", title: "How many apples?", media: { type: "image", src: "/assets/count-1.png" }, type: "count", expected: 1, options: [1,2,3], hint: "Tap the number you see." },
  { id: "A-count-2", title: "How many apples?", media: { type: "image", src: "/assets/count-3.png" }, type: "count", expected: 3, options: [2,3,4], hint: "Tap the number you see." },
  { id: "A-shape-1", title: "Which is a circle?", media: { type: "image", src: "/assets/assign-shape-1.png" }, type: "shape", expected: "circle", options: ["square","circle","triangle"], hint: "Tap circle." },
  { id: "A-size-1", title: "Which is bigger?", media: { type: "image", src: "/assets/assign-size-1.png" }, type: "size", expected: "left", options: ["left","right"], hint: "Tap left or right." },
  { id: "A-pattern-1", title: "What comes next?", media: { type: "image", src: "/assets/assign-pattern-1.png" }, type: "pattern", expected: "red", options: ["blue","red"], hint: "Pick the next color." },
];

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export default function MathsNur() {
  // mode: 'lessons' | 'assignments' | 'done'
  const [mode, setMode] = useState("lessons");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [assignIndex, setAssignIndex] = useState(0);
  const [status, setStatus] = useState("playing"); // playing | waiting | checking | correct | wrong | finished
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [state, setState] = useState(() => {
    const saved = loadSaved();
    return saved || { lessonsDone: {}, assignmentsDone: {}, stars: { lessons: false, assignmentsThree: false } };
  });

  const lessonTimer = useRef(null);
  const confettiRef = useRef(null);

  // persist state
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }, [state]);

  // auto-start lessons on mount
  useEffect(() => {
    startLesson(0);
    return () => clearTimeout(lessonTimer.current);
    // eslint-disable-next-line
  }, []);

  /* --- Lesson flow --- */
  function startLesson(i) {
    clearTimeout(lessonTimer.current);
    setMode("lessons");
    setLessonIndex(i);
    setSelected(null);
    setStatus("playing");
    setMessage(LESSONS[i].title || "");
    // mark lesson done in state
    setState(prev => ({ ...prev, lessonsDone: { ...prev.lessonsDone, [LESSONS[i].id]: true } }));
    // schedule next lesson or assignments
    lessonTimer.current = setTimeout(() => {
      const next = i + 1;
      if (next < LESSONS.length) {
        startLesson(next);
      } else {
        // award lesson star
        setState(prev => ({ ...prev, stars: { ...prev.stars, lessons: true } }));
        // small pause then assignments
        setTimeout(() => startAssignments(0), 700);
      }
    }, LESSONS[i].duration || 3000);
  }

  /* --- Assignments flow --- */
  function startAssignments(i) {
    clearTimeout(lessonTimer.current);
    setMode("assignments");
    setAssignIndex(i);
    setSelected(null);
    setStatus("waiting");
    setMessage(ASSIGNMENTS[i].title || "");
  }

  function handleAnswer(option) {
    if (selected !== null) return; // prevent double-answer
    setSelected(option);
    setStatus("checking");

    const item = ASSIGNMENTS[assignIndex];
    let ok = false;
    if (item.type === "count") {
      ok = Number(option) === Number(item.expected);
    } else {
      ok = String(option).toLowerCase() === String(item.expected).toLowerCase();
    }

    setTimeout(() => {
      if (ok) {
        // correct
        setStatus("correct");
        setMessage("Correct! ⭐");
        setState(prev => {
          const copy = { ...prev, assignmentsDone: { ...prev.assignmentsDone, [item.id]: true } };
          // if all assignments done -> award assignment 3-star flag
          const doneCount = Object.values(copy.assignmentsDone).filter(Boolean).length;
          if (doneCount >= ASSIGNMENTS.length) {
            copy.stars = { ...copy.stars, assignmentsThree: true };
          }
          return copy;
        });
        triggerConfetti();
        // auto-next after short delay
        setTimeout(() => {
          const next = assignIndex + 1;
          if (next < ASSIGNMENTS.length) startAssignments(next);
          else {
            setMode("done");
            setStatus("finished");
            setMessage("All done! Great job! 🎉");
          }
        }, 900);
      } else {
        // wrong - allow retry
        setStatus("wrong");
        setMessage("Try again 😊");
        setTimeout(() => {
          setSelected(null);
          setStatus("waiting");
          setMessage(ASSIGNMENTS[assignIndex].hint || "");
        }, 800);
      }
    }, 500);
  }

  function triggerConfetti() {
    const el = confettiRef.current;
    if (!el) return;
    el.classList.remove("show");
    // force reflow
    void el.offsetWidth;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 1400);
  }

  /* progress */
  const lessonDoneCount = Object.keys(state.lessonsDone).length;
  const assignmentDoneCount = Object.values(state.assignmentsDone).filter(Boolean).length;
  const doneSteps = lessonDoneCount + assignmentDoneCount;
  const totalSteps = LESSONS.length + ASSIGNMENTS.length;
  const overallPercent = Math.round((doneSteps / totalSteps) * 100);

  /* Small media component */
  function Media({ media, alt }) {
    if (!media) return null;
    if (media.type === "video") {
      return <video src={media.src} className="mn-media-video" controls={false} autoPlay muted playsInline />;
    }
    return <img src={media.src} alt={alt || ""} className="mn-media-image" />;
  }

  return (
    <>
      <NavbarAfterLogin />

      <div className="mn-page no-voice">
        <div className="mn-hero">
          <h1>🔢 Nursery Maths — Visual Lessons & Assignments</h1>
          <p className="mn-sub">Lessons auto-play → then interactive questions. No voice required.</p>

          <div className="mn-stars-row">
            <div className={`mn-star ${state.stars.lessons ? "earned" : ""}`}>⭐ Lessons</div>
            <div className={`mn-star ${state.stars.assignmentsThree ? "earned three" : ""}`}>⭐⭐⭐ Assignments</div>
          </div>

          <div className="mn-progress-row">
            <div className="mn-progress-bar" aria-hidden>
              <div className="mn-progress-fill" style={{ width: `${overallPercent}%` }} />
            </div>
            <div className="mn-progress-text">{doneSteps}/{totalSteps} done • {overallPercent}%</div>
          </div>
        </div>

        <main className="mn-main">
          <section className="mn-module-card">
            <div className="mn-module-head">
              <div>
                <h2>
                  {mode === "lessons" ? LESSONS[lessonIndex].title
                    : mode === "assignments" ? ASSIGNMENTS[assignIndex].title
                    : "Completed"}
                </h2>
                <div className="mn-prompt">
                  {mode === "lessons" ? LESSONS[lessonIndex].title
                    : mode === "assignments" ? ASSIGNMENTS[assignIndex].title
                    : ""}
                </div>
              </div>

              <div className="mn-status">
                <div className={`mn-badge ${status}`}>{status.toUpperCase()}</div>
              </div>
            </div>

            <div className="mn-media">
              {mode === "lessons" ? (
                <Media media={LESSONS[lessonIndex].media} alt={LESSONS[lessonIndex].title} />
              ) : mode === "assignments" ? (
                <Media media={ASSIGNMENTS[assignIndex].media} alt={ASSIGNMENTS[assignIndex].title} />
              ) : (
                <div className="mn-done-graphic">🎉</div>
              )}
            </div>

            <div className="mn-activity-area">
              {mode === "assignments" && (
                <>
                  <div className="mn-hint">Hint: {ASSIGNMENTS[assignIndex].hint}</div>

                  <div className="mn-options-grid">
                    {ASSIGNMENTS[assignIndex].options.map((opt, i) => {
                      const isSelected = selected !== null && String(selected) === String(opt);
                      const isCorrect = isSelected && status === "correct";
                      const isWrong = isSelected && status === "wrong";
                      return (
                        <button
                          key={i}
                          className={`mn-option ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                          onClick={() => handleAnswer(opt)}
                          disabled={selected !== null}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              <div className="mn-listen-text">{message}</div>

              <div className="mn-reward-area">
                <div id="mn-confetti" ref={confettiRef} className="mn-confetti" aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, i) => <span key={i} className={`c piece${i % 6}`}></span>)}
                </div>

                <div className={`mn-reward-message ${status === "correct" ? "show" : ""}`}>🎉 Well done! Moving on...</div>
              </div>
            </div>
          </section>

          <aside className="mn-side">
            <div className="mn-queue">
              <h4>Up next</h4>
              <ol>
                {mode === "lessons"
                  ? LESSONS.slice(lessonIndex + 1).map(l => <li key={l.id}>{l.title}</li>)
                  : mode === "assignments"
                    ? ASSIGNMENTS.slice(assignIndex + 1).map(a => <li key={a.id}>{a.title}</li>)
                    : <li>All done 🎉</li>
                }
              </ol>
            </div>

            <div className="mn-save">
              <h4>Session snapshot</h4>
              <div className="mn-mini">{lessonDoneCount}/{LESSONS.length} lessons done</div>
              <div className="mn-mini">{assignmentDoneCount}/{ASSIGNMENTS.length} assignments done</div>
              <div className="mn-mini">Stars: {state.stars.lessons ? "⭐" : "—"} / {state.stars.assignmentsThree ? "⭐⭐⭐" : "—"}</div>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
