import React, { useEffect, useState } from "react";
import "./Profile.css";
import NavbarAfterLogin from "./NavbarAfterLogin"; // adjust path if needed

// Avatar image paths (replace with your files or keep same)
import lionImg from "../assets/lion.png";
import bearImg from "../assets/bear.png";
import bunnyImg from "../assets/bunny.png";
import foxImg from "../assets/fox.png";
import giraffeImg from "../assets/giraffe.png";


const STORAGE_KEY = "littleLearnerProfileV1";

const DEFAULT = {
  avatar: "lion",
  name: "Little Learner",
  clas: "Nursery",
  // subject progress 0-100
  subjects: {
    english: 42,
    maths: 36,
    evs: 50,
    creativity: 30,
    thinking: 28,
  },
  // which badges earned
  badges: {
    alphabet: true,
    numbers: false,
    artist: true,
    reader: false,
    curious: false,
    helper: true,
  },
  // streak info
  streak: {
    current: 3,
    longest: 7,
    lastActive: null, // optional YYYY-MM-DD
  },
};

const AVATARS = {
  lion: { label: "Lion Cub", src: lionImg },
  bear: { label: "Bear Cub", src: bearImg },
  bunny: { label: "Bunny", src: bunnyImg },
  fox: { label: "Fox", src: foxImg },
  giraffe: { label: "Giraffe", src: giraffeImg },
};

export default function Profile() {
  const [state, setState] = useState(DEFAULT);
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempClass, setTempClass] = useState("");
  const [badgeModal, setBadgeModal] = useState(null); // {id, label, earned}

  // load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // shallow merge with defaults to avoid missing keys
        setState({ ...DEFAULT, ...parsed, subjects: { ...DEFAULT.subjects, ...(parsed.subjects || {}) }, badges: { ...DEFAULT.badges, ...(parsed.badges || {}) }, streak: { ...DEFAULT.streak, ...(parsed.streak || {}) } });
      }
    } catch (e) {
      setState(DEFAULT);
    }
  }, []);

  // save on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [state]);

  const pickAvatar = (key) => {
  setState((s) => ({ ...s, avatar: key }));

  // 🚀 update avatar for navbar
  localStorage.setItem("kidAvatar", AVATARS[key].src);
};


  const startEdit = () => {
    setTempName(state.name);
    setTempClass(state.clas);
    setEditing(true);
  };

  const saveProfile = () => {
  const newName = tempName.trim() || "Little Learner";
  const newClass = tempClass.trim() || "Nursery";

  // update local state
  setState((s) => ({
    ...s,
    name: newName,
    clas: newClass,
  }));

  // 🚀 update Navbar-reactive storage
  const storedUser = JSON.parse(localStorage.getItem("littleLearnerUser")) || {};
  storedUser.name = newName;
  localStorage.setItem("littleLearnerUser", JSON.stringify(storedUser));

  setEditing(false);
};


  const cancelEdit = () => {
    setEditing(false);
  };

  const openBadge = (id) => {
    const labelMap = {
      alphabet: "Alphabet Star",
      numbers: "Number Ninja",
      artist: "Super Artist",
      reader: "Reading Star",
      curious: "Curiosity Badge",
      helper: "Helpful Friend",
    };
    setBadgeModal({ id, label: labelMap[id] || id, earned: !!state.badges[id] });
  };

  const closeBadgeModal = () => setBadgeModal(null);

  const overallPercent = () => {
    const vals = Object.values(state.subjects);
    if (!vals.length) return 0;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  };

  return (
    <>
      <NavbarAfterLogin />

      <div className="profile-wrap">

        {/* forest header */}
        <header className="pf-header">
          <div className="pf-left">
            <div className="avatar-card">
              <img src={AVATARS[state.avatar].src} alt={state.avatar} className="pf-avatar" />
            </div>

            <div className="pf-info">
              {!editing ? (
                <>
                  <div className="pf-name">{state.name}</div>
                  <div className="pf-class">Class: <strong>{state.clas}</strong></div>
                  <button className="pf-edit-btn" onClick={startEdit}>Edit Profile</button>
                </>
              ) : (
                <div className="pf-edit-form">
                  <input value={tempName} onChange={(e) => setTempName(e.target.value)} className="pf-input" />
                  <input value={tempClass} onChange={(e) => setTempClass(e.target.value)} className="pf-input" />
                  <div className="pf-edit-actions">
                    <button className="pf-save" onClick={saveProfile}>Save</button>
                    <button className="pf-cancel" onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pf-right">
            <div className="pf-overall-card">
              <div className="pf-overall-title">Overall Progress</div>
              <div className="pf-ring" style={{ ["--p"] : `${overallPercent()}` }}>
                <span>{overallPercent()}%</span>
              </div>
              <div className="pf-subtle">Keep exploring the forest to grow!</div>
            </div>
          </div>
        </header>

        {/* avatar chooser */}
        <section className="pf-avatars">
          <h3>Choose avatar</h3>
          <div className="pf-avatar-grid">
            {Object.keys(AVATARS).map(k => (
              <button
                key={k}
                className={`pf-avatar-option ${state.avatar === k ? "active" : ""}`}
                onClick={() => pickAvatar(k)}
                aria-pressed={state.avatar === k}
                title={AVATARS[k].label}
              >
                <img src={AVATARS[k].src} alt={k} />
                <div className="opt-label">{AVATARS[k].label}</div>
              </button>
            ))}
          </div>
        </section>

        <div className="pf-main-grid">

          {/* Achievements */}
          <section className="pf-card achievements">
            <h3>Achievements</h3>
            <p className="muted">Badges you earned</p>

            <div className="pf-badges">
              {Object.keys(state.badges).map(id => {
                const earned = !!state.badges[id];
                return (
                  <div
                    key={id}
                    className={`pf-badge ${earned ? "earned" : "locked"}`}
                    onClick={() => openBadge(id)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="badge-icon">{earned ? "🏅" : "🔒"}</div>
                    <div className="badge-name">{id === "alphabet" ? "Alphabet" : id.charAt(0).toUpperCase() + id.slice(1)}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Streak & Growth Rings */}
          <aside className="pf-side-col">

            <div className="pf-card streak">
              <h3>Study Streak</h3>
              <div className="streak-row">
                <div className="streak-big">🔥 {state.streak.current} days</div>
                <div className="streak-sub">Longest {state.streak.longest} days</div>
              </div>
              <div className="streak-note">Great job keeping a routine — tiny steps every day!</div>
            </div>

            <div className="pf-card rings">
              <h3>Skill Rings</h3>

              <div className="rings-grid">
                {Object.keys(state.subjects).map((sub) => {
                  const val = state.subjects[sub];
                  const label = sub.charAt(0).toUpperCase() + sub.slice(1);
                  return (
                    <div className="ring-item" key={sub}>
                      <div className="small-ring" style={{ ["--p"]: `${val}` }}>
                        <span>{val}%</span>
                      </div>
                      <div className="ring-label">{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

          </aside>

        </div>

        {/* badge modal */}
        {badgeModal && (
          <div className="pf-modal-back" role="dialog" aria-modal="true">
            <div className="pf-modal">
              <h4>{badgeModal.label}</h4>
              <p className="muted">{badgeModal.earned ? "You earned this badge. Well done!" : "Locked — Keep learning to unlock this badge."}</p>
              <div className="modal-actions">
                <button onClick={closeBadgeModal} className="pf-btn">Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
