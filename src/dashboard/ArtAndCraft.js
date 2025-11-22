import React, { useEffect, useState } from "react";
import "./ArtAndCraft.css";

export default function ArtAndCraft() {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("littleLearnerUser"));
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    setIsLoggedIn(loggedIn);

    if (storedUser && storedUser.name) {
      setUserName(storedUser.name);
    } else {
      setUserName("Little Learner");
    }

    if (!loggedIn) {
      window.location.href = "/signin";
    }
  }, []);

  if (!isLoggedIn) return null;


  // Sample Art & Craft activities
  const activities = [
  { name: "🎨 Finger Painting", description: "Get messy and creative!" },
  { name: "✂️ Paper Cutting", description: "Learn shapes & designs." },
  { name: "🖍️ Crayon Art", description: "Color your imagination." },
  { name: "📦 Recycled Crafts", description: "Turn trash to treasure." },
  { name: "🎭 Mask Making", description: "Create fun character masks." },
  { name: "🧵 Thread Art", description: "Simple sewing & patterns." },
  { name: "🖌️ Watercolor Fun", description: "Splash colors freely." },
  { name: "🖊️ Sticker Art", description: "Decorate with stickers." },
  { name: "🧶 Yarn Crafts", description: "Make cute figures." },
  { name: "🌿 Leaf Printing", description: "Nature-inspired art." },
  { name: "🍄 Clay Modeling", description: "Shape animals & toys." },
  { name: "🖼️ Collage Making", description: "Glue & cut fun pieces." },
  { name: "📐 Origami", description: "Fold paper into art." },
  { name: "🕯️ Candle Decoration", description: "Colorful candle designs." },
  { name: "📏 Geometry Art", description: "Patterns with shapes." },
  { name: "🖌️ Acrylic Painting", description: "Bold and bright colors." },
  { name: "📚 Scrapbooking", description: "Memory art fun." },
  { name: "🎨 Canvas Art", description: "Big creative canvas." },
  { name: "🌸 Flower Craft", description: "Paper and fabric flowers." },
  { name: "🧩 Puzzle Art", description: "Design with puzzle pieces." },
  { name: "📸 Photo Frames", description: "Decorate your memories." },
  { name: "🎀 Ribbon Art", description: "Make bows and designs." },
  { name: "🖌️ Stencil Painting", description: "Use fun stencils." },
  { name: "🖍️ Chalk Art", description: "Draw on sidewalks." },
  { name: "🎨 Dot Painting", description: "Fun pointillism." },
  { name: "📦 Miniature Models", description: "Build tiny worlds." },
  { name: "🧸 Soft Toy Making", description: "Cute handmade toys." },
  { name: "🖌️ Fingerprint Art", description: "Create animals & shapes." },
  { name: "🌈 Rainbow Crafts", description: "Colorful designs." },
  { name: "🖍️ Sand Art", description: "Color sand creations." },
  { name: "🖌️ Sponge Painting", description: "Texture & fun!" },
  { name: "🧼 Soap Carving", description: "Creative soap art." },
  { name: "🧱 LEGO Creations", description: "Build fun models." },
  { name: "🎨 Marble Painting", description: "Roll marbles to paint." },
  { name: "📜 Calligraphy", description: "Artful handwriting." },
  { name: "🖌️ Poster Making", description: "Design colorful posters." },
  { name: "🖼️ Wall Art", description: "Decorate your room." },
  { name: "🧶 Pom Pom Crafts", description: "Soft pom-pom fun." },
  { name: "🎀 Hair Accessories", description: "DIY cute clips." },
  { name: "🌸 Origami Flowers", description: "Paper blooms." },
  { name: "🖍️ Scratch Art", description: "Reveal hidden colors." },
  { name: "📦 Paper Mache", description: "Shape and paint sculptures." },
  { name: "🖌️ Bubble Painting", description: "Fun foamy art." },
  { name: "🧵 Sewing Patterns", description: "Basic stitches & fun." },
  { name: "🖍️ Coloring Pages", description: "Relax with coloring." },
  { name: "🎨 Acrylic Pour", description: "Swirl paint fun." },
  { name: "🖌️ Tie Dye", description: "Create colorful patterns." },
  { name: "🧩 Magnet Crafts", description: "Decorate your fridge." },
  { name: "🎭 Puppet Making", description: "Hand puppets & play." },
  { name: "📐 Symmetry Art", description: "Draw symmetrical designs." },
  { name: "🖼️ Mosaic Art", description: "Pieces to patterns." },
  { name: "🎨 Face Painting", description: "Fun for parties." },
  { name: "🧸 Felt Toys", description: "Soft fabric fun." },
  { name: "🖌️ Brush Techniques", description: "Experiment with strokes." },
  { name: "🌿 Nature Collage", description: "Leaves, sticks, flowers." },
  { name: "📦 DIY Boxes", description: "Decorate storage boxes." },
  { name: "🖍️ Wax Resist Art", description: "Secret patterns." },
  { name: "🎨 Sand Painting", description: "Colorful grains fun." },
  { name: "🖌️ Painting With Stamps", description: "Stamp shapes." },
  { name: "🧵 Cross Stitch", description: "Basic sewing art." },
  { name: "🎀 Fabric Painting", description: "Paint clothes & bags." },
  { name: "🖌️ Watercolor Resist", description: "Mix wax & paint." },
  { name: "🖍️ Color Mixing", description: "Learn shades & tints." },
  { name: "📚 DIY Bookmarks", description: "Fun reading markers." },
  { name: "🎨 Marble Clay", description: "Mix colors in clay." },
  { name: "🖌️ Glue Art", description: "Patterns with glue & glitter." },
  { name: "📦 Box Puppets", description: "Make fun characters." },
  { name: "🧶 Knitting", description: "Easy beginner stitches." },
  { name: "🎨 Acrylic Splash", description: "Bold canvas fun." },
  { name: "🖌️ Paint Pour Bottles", description: "Swirl art experiments." },
  { name: "🖍️ Chalkboard Art", description: "Reusable creativity." },
  { name: "🎀 DIY Headbands", description: "Decorate hairbands." },
  { name: "🧵 Friendship Bracelets", description: "Make & gift." },
  { name: "🖌️ Abstract Art", description: "Free-flow imagination." },
  { name: "🌈 Rainbow Paper Chains", description: "Decorate rooms." },
  { name: "🖍️ Glow Art", description: "Neon & glow in dark." },
  { name: "🖌️ Coffee Painting", description: "Brown shade fun." },
  { name: "🎨 Scratch Cards", description: "Reveal hidden art." },
  { name: "🧶 Macrame Crafts", description: "Wall hangings & decor." },
  { name: "📦 DIY Photo Album", description: "Memory keeping." },
  { name: "🎭 Cardboard Puppets", description: "Story characters." },
  { name: "🖌️ Pattern Stamps", description: "Repetitive art fun." },
  { name: "🖍️ Dot Mandalas", description: "Meditative art." },
  { name: "🎨 Canvas Collage", description: "Combine textures." },
  { name: "🖌️ Water Painting", description: "Outdoor fun with water." },
  { name: "🧵 Bead Crafts", description: "Jewelry & fun beads." },
  { name: "📦 Mini Dioramas", description: "Tiny creative worlds." },
  { name: "🎨 Spray Bottle Art", description: "Color misting fun." },
  { name: "🖌️ Bubble Wrap Prints", description: "Press & print patterns." },
  { name: "🖍️ Scratch Painting Cards", description: "Hidden designs." },
  { name: "🎀 DIY Hair Clips", description: "Decorate for fun." },
  { name: "🧸 Soft Doll Making", description: "Cute handmade dolls." },
  { name: "📐 String Art", description: "Nails & threads magic." },
  { name: "🎨 Spin Art", description: "Color spin fun." },
  { name: "🖌️ Acrylic Layering", description: "Depth & textures." },
  { name: "🖍️ Pastel Art", description: "Soft colored creativity." },
  { name: "🌿 Herb Pressing", description: "Create plant art." },
  { name: "📦 Bottle Cap Crafts", description: "Recycle & decorate." },
  { name: "🎭 Shadow Puppets", description: "Play with light & shapes." },
  { name: "🖌️ DIY Wall Hangings", description: "Decorative art." },
  { name: "🧵 Tassel Making", description: "Decorative threads." },
  { name: "🎨 Stained Paper Art", description: "Mimic stained glass." },
  { name: "🖍️ Foam Crafts", description: "Shapes & animals." },
  { name: "📚 DIY Notebooks", description: "Decorate & use." },
  { name: "🖌️ Glitter Art", description: "Sparkle creations." },
  { name: "🎀 Fabric Flowers", description: "Make soft blooms." },
];
  return (
    <div className="artcraft-container">

      <div className="dashboard-body">

        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li>🎨 Art & Craft</li>
            <li>💻 Coding</li>
            <li>🤖 Robotics</li>
            <li>📚 Books</li>
            <li>🏃 Sports</li>
            <li>🔬 Science Lab</li>
            <li>🏆 Competitions</li>
            <li>📈 Progress</li>
          </ul>
        </aside>

        {/* Main Section */}
<main className="main-content">

  <h3 className="section-title">🎨 Arts And Crafts Activities</h3>

  <div className="pastel-grid">
    {activities.map((activity, index) => (
      <div key={index} className="flip-card">
        <div className="flip-card-inner">

          {/* FRONT */}
          <div className="flip-card-front pastel-box">
            <h3>{activity.name}</h3>
          </div>

          {/* BACK */}
<div className="flip-card-back pastel-box">
  <div className="back-content">
    <p className="activity-desc">{activity.description}</p>
    <button className="know-more-btn">Know More</button>
  </div>
</div>


        </div>
      </div>
    ))}
  </div>

</main>

      </div>
    </div>
  );
}
