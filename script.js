// Interactive Nuclear Landscape
class NuclearLandscape {
  constructor() {
    this.canvas = document.getElementById("nuclearCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.tooltip = document.getElementById("tooltip");
    this.infoPanel = document.getElementById("infoPanel");

    // Visualization settings
    this.settings = {
      cellSize: 12,
      padding: 2,
      maxZ: 120,
      maxN: 200,
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
      colorMode: "stability",
    };

    // Animation properties
    this.animationFrame = null;
    this.isAnimating = false;
    this.hoveredNucleus = null;

    // Mouse interaction
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    // Initialize
    this.setupCanvas();
    this.setupEventListeners();
    this.updateLegend();
    this.render();

    // Start animation loop
    this.startAnimation();
  }

  setupCanvas() {
    // Set canvas size to container
    const container = this.canvas.parentElement;
    this.canvas.width = Math.min(1200, container.clientWidth - 60);
    this.canvas.height = Math.min(800, window.innerHeight - 300);

    // Set initial view to show light elements centered
    this.settings.offsetX = 100;
    this.settings.offsetY = this.canvas.height - 200;
    this.settings.zoom = 3;
  }

  setupEventListeners() {
    // Control buttons
    document
      .getElementById("zoomIn")
      .addEventListener("click", () => this.zoomIn());
    document
      .getElementById("zoomOut")
      .addEventListener("click", () => this.zoomOut());
    document
      .getElementById("resetView")
      .addEventListener("click", () => this.resetView());
    document.getElementById("colorMode").addEventListener("change", (e) => {
      this.settings.colorMode = e.target.value;
      this.updateLegend();
      this.render();
    });

    // Mouse interactions
    this.canvas.addEventListener("mousedown", (e) => this.handleMouseDown(e));
    this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    this.canvas.addEventListener("mouseup", () => this.handleMouseUp());
    this.canvas.addEventListener("wheel", (e) => this.handleWheel(e));
    this.canvas.addEventListener("click", (e) => this.handleClick(e));
    this.canvas.addEventListener("mouseleave", () => this.hideTooltip());

    // Info panel close
    document.getElementById("closeInfo").addEventListener("click", () => {
      this.infoPanel.classList.remove("active");
    });

    // Window resize
    window.addEventListener("resize", () => {
      this.setupCanvas();
      this.render();
    });
  }

  zoomIn() {
    this.settings.zoom = Math.min(this.settings.zoom * 1.5, 10);
    this.render();
  }

  zoomOut() {
    this.settings.zoom = Math.max(this.settings.zoom / 1.5, 0.1);
    this.render();
  }

  resetView() {
    this.settings.zoom = 3;
    this.settings.offsetX = 100;
    this.settings.offsetY = this.canvas.height - 200;
    this.render();
  }

  handleMouseDown(e) {
    this.isDragging = true;
    const rect = this.canvas.getBoundingClientRect();
    this.lastMouseX = e.clientX - rect.left;
    this.lastMouseY = e.clientY - rect.top;
    this.canvas.style.cursor = "grabbing";
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (this.isDragging) {
      const deltaX = mouseX - this.lastMouseX;
      const deltaY = mouseY - this.lastMouseY;
      this.settings.offsetX += deltaX;
      this.settings.offsetY += deltaY;
      this.lastMouseX = mouseX;
      this.lastMouseY = mouseY;
      this.render();
    } else {
      // Handle hover
      const nucleus = this.getNucleusAtPosition(mouseX, mouseY);
      if (nucleus !== this.hoveredNucleus) {
        this.hoveredNucleus = nucleus;
        if (nucleus) {
          this.showTooltip(nucleus, mouseX, mouseY);
        } else {
          this.hideTooltip();
        }
      }
    }
  }

  handleMouseUp() {
    this.isDragging = false;
    this.canvas.style.cursor = "crosshair";
  }

  handleWheel(e) {
    e.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(
      0.1,
      Math.min(10, this.settings.zoom * zoomFactor)
    );

    // Zoom towards mouse position
    const worldX = (mouseX - this.settings.offsetX) / this.settings.zoom;
    const worldY = (mouseY - this.settings.offsetY) / this.settings.zoom;

    this.settings.zoom = newZoom;
    this.settings.offsetX = mouseX - worldX * this.settings.zoom;
    this.settings.offsetY = mouseY - worldY * this.settings.zoom;

    this.render();
  }

  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const nucleus = this.getNucleusAtPosition(mouseX, mouseY);

    if (nucleus) {
      this.showNucleusInfo(nucleus);
    }
  }

  getNucleusAtPosition(x, y) {
    const worldX = (x - this.settings.offsetX) / this.settings.zoom;
    const worldY = (y - this.settings.offsetY) / this.settings.zoom;

    const n = Math.floor(
      worldX / (this.settings.cellSize + this.settings.padding)
    );
    const z = Math.floor(
      -worldY / (this.settings.cellSize + this.settings.padding)
    );

    // Ensure we have valid coordinates
    if (n < 0 || z < 0 || n > this.settings.maxN || z > this.settings.maxZ) {
      return null;
    }

    return NUCLEAR_DATA.allIsotopes.find(
      (isotope) => isotope.z === z && isotope.n === n
    );
  }

  showTooltip(nucleus, x, y) {
    const tooltipTitle = document.getElementById("tooltipTitle");
    const tooltipDetails = document.getElementById("tooltipDetails");

    tooltipTitle.textContent = nucleus.name;
    tooltipDetails.innerHTML = `
            <div>Z: ${nucleus.z}, N: ${nucleus.n}</div>
            <div>Mass: ${nucleus.mass}</div>
            <div>Decay: ${
              NUCLEAR_DATA.decayModes[nucleus.stability]?.name ||
              nucleus.stability
            }</div>
        `;

    this.tooltip.style.left = x + 10 + "px";
    this.tooltip.style.top = y - 10 + "px";
    this.tooltip.classList.add("visible");
  }

  hideTooltip() {
    this.tooltip.classList.remove("visible");
    this.hoveredNucleus = null;
  }

  showNucleusInfo(nucleus) {
    const title = document.getElementById("nucleusTitle");
    const details = document.getElementById("infoDetails");

    title.textContent = nucleus.name;

    let halfLifeText = "Stable";
    if (nucleus.halfLife !== Infinity) {
      if (nucleus.halfLife > 3.15e7) {
        halfLifeText = `${(nucleus.halfLife / 3.15e7).toExponential(2)} years`;
      } else if (nucleus.halfLife > 1) {
        halfLifeText = `${nucleus.halfLife.toExponential(2)} seconds`;
      } else {
        halfLifeText = `${(nucleus.halfLife * 1000).toExponential(2)} ms`;
      }
    }

    const isMagicProton = NUCLEAR_DATA.magicNumbers.protons.includes(nucleus.z);
    const isMagicNeutron = NUCLEAR_DATA.magicNumbers.neutrons.includes(
      nucleus.n
    );

    details.innerHTML = `
            <p><strong>Element:</strong> ${nucleus.symbol}</p>
            <p><strong>Protons (Z):</strong> ${nucleus.z} ${
      isMagicProton ? "✨ Magic Number!" : ""
    }</p>
            <p><strong>Neutrons (N):</strong> ${nucleus.n} ${
      isMagicNeutron ? "✨ Magic Number!" : ""
    }</p>
            <p><strong>Mass Number:</strong> ${nucleus.mass}</p>
            <p><strong>Stability:</strong> ${
              NUCLEAR_DATA.decayModes[nucleus.stability]?.name ||
              nucleus.stability
            }</p>
            <p><strong>Half-life:</strong> ${halfLifeText}</p>
            ${
              isMagicProton || isMagicNeutron
                ? "<p><strong>Note:</strong> Magic numbers indicate enhanced nuclear stability!</p>"
                : ""
            }
        `;

    this.infoPanel.classList.add("active");
  }

  getColorForNucleus(nucleus) {
    switch (this.settings.colorMode) {
      case "stability":
        return this.getStabilityColor(nucleus);
      case "decay":
        return this.getDecayModeColor(nucleus);
      case "halflife":
        return this.getHalfLifeColor(nucleus);
      case "magic":
        return this.getMagicNumberColor(nucleus);
      default:
        return this.getStabilityColor(nucleus);
    }
  }

  getStabilityColor(nucleus) {
    const decayMode = NUCLEAR_DATA.decayModes[nucleus.stability];
    return decayMode ? decayMode.color : "#636e72";
  }

  getDecayModeColor(nucleus) {
    return this.getStabilityColor(nucleus);
  }

  getHalfLifeColor(nucleus) {
    if (nucleus.halfLife === Infinity) {
      return NUCLEAR_DATA.halfLifeCategories.stable.color;
    }

    for (const [key, category] of Object.entries(
      NUCLEAR_DATA.halfLifeCategories
    )) {
      if (nucleus.halfLife >= category.min) {
        return category.color;
      }
    }

    return NUCLEAR_DATA.halfLifeCategories.instant.color;
  }

  getMagicNumberColor(nucleus) {
    const isMagicProton = NUCLEAR_DATA.magicNumbers.protons.includes(nucleus.z);
    const isMagicNeutron = NUCLEAR_DATA.magicNumbers.neutrons.includes(
      nucleus.n
    );

    if (isMagicProton && isMagicNeutron) {
      return "#ffe66d"; // Double magic - bright yellow
    } else if (isMagicProton) {
      return "#ff6b6b"; // Magic proton - red
    } else if (isMagicNeutron) {
      return "#4ecdc4"; // Magic neutron - teal
    } else {
      return nucleus.stability === "stable" ? "#2d3436" : "#636e72";
    }
  }

  updateLegend() {
    const legendItems = document.getElementById("legendItems");
    legendItems.innerHTML = "";

    let items = [];

    switch (this.settings.colorMode) {
      case "stability":
      case "decay":
        items = Object.entries(NUCLEAR_DATA.decayModes).map(([key, mode]) => ({
          color: mode.color,
          name: mode.name,
        }));
        break;
      case "halflife":
        items = Object.entries(NUCLEAR_DATA.halfLifeCategories).map(
          ([key, category]) => ({
            color: category.color,
            name: category.name,
          })
        );
        break;
      case "magic":
        items = [
          { color: "#ffe66d", name: "Double Magic" },
          { color: "#ff6b6b", name: "Magic Protons" },
          { color: "#4ecdc4", name: "Magic Neutrons" },
          { color: "#2d3436", name: "Stable" },
          { color: "#636e72", name: "Unstable" },
        ];
        break;
    }

    items.forEach((item) => {
      const legendItem = document.createElement("div");
      legendItem.className = "legend-item";
      legendItem.innerHTML = `
                <div class="legend-color" style="background-color: ${item.color}"></div>
                <span>${item.name}</span>
            `;
      legendItems.appendChild(legendItem);
    });
  }

  startAnimation() {
    const animate = () => {
      if (this.hoveredNucleus) {
        this.render();
      }
      this.animationFrame = requestAnimationFrame(animate);
    };
    animate();
  }

  render() {
    const { ctx, canvas, settings } = this;

    // Clear canvas
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    this.drawGrid();

    // Draw nuclei
    this.drawNuclei();

    // Draw axes
    this.drawAxes();
  }

  drawGrid() {
    const { ctx, settings } = this;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;

    const cellSize = settings.cellSize * settings.zoom;
    const padding = settings.padding * settings.zoom;
    const step = cellSize + padding;

    // Vertical lines (neutron numbers)
    for (let n = 0; n <= settings.maxN; n += 10) {
      const x = settings.offsetX + n * step;
      if (x >= 0 && x <= this.canvas.width) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.canvas.height);
        ctx.stroke();
      }
    }

    // Horizontal lines (proton numbers)
    for (let z = 0; z <= settings.maxZ; z += 10) {
      const y = settings.offsetY - z * step;
      if (y >= 0 && y <= this.canvas.height) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.canvas.width, y);
        ctx.stroke();
      }
    }
  }

  drawNuclei() {
    const { ctx, settings } = this;
    const cellSize = settings.cellSize * settings.zoom;
    const padding = settings.padding * settings.zoom;

    NUCLEAR_DATA.allIsotopes.forEach((nucleus) => {
      const x = settings.offsetX + nucleus.n * (cellSize + padding);
      const y = settings.offsetY - nucleus.z * (cellSize + padding);

      // Skip if outside canvas
      if (
        x + cellSize < 0 ||
        x > this.canvas.width ||
        y + cellSize < 0 ||
        y > this.canvas.height
      ) {
        return;
      }

      // Get color based on current mode
      const color = this.getColorForNucleus(nucleus);

      // Add glow effect for hovered nucleus
      const isHovered = this.hoveredNucleus === nucleus;

      if (isHovered) {
        ctx.shadowColor = "#00d4ff";
        ctx.shadowBlur = 15;
      }

      ctx.fillStyle = color;
      ctx.fillRect(x, y, cellSize, cellSize);

      // Reset shadow
      ctx.shadowBlur = 0;

      // Add border for better visibility
      if (cellSize > 8) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellSize, cellSize);
      }

      // Add element symbol for larger cells
      if (cellSize > 20) {
        ctx.fillStyle = "white";
        ctx.font = `${Math.min(cellSize * 0.4, 12)}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(nucleus.symbol, x + cellSize / 2, y + cellSize / 2);
      }
    });
  }

  drawAxes() {
    const { ctx, settings } = this;

    ctx.fillStyle = "#00d4ff";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";

    // Neutron numbers (X-axis)
    for (let n = 0; n <= settings.maxN; n += 10) {
      const x =
        settings.offsetX +
        n * (settings.cellSize + settings.padding) * settings.zoom;
      if (x >= 0 && x <= this.canvas.width) {
        ctx.fillText(n.toString(), x, this.canvas.height - 5);
      }
    }

    // Proton numbers (Y-axis)
    ctx.textAlign = "right";
    for (let z = 0; z <= settings.maxZ; z += 10) {
      const y =
        settings.offsetY -
        z * (settings.cellSize + settings.padding) * settings.zoom;
      if (y >= 0 && y <= this.canvas.height) {
        ctx.fillText(z.toString(), 25, y + 4);
      }
    }
  }
}

// Initialize the nuclear landscape when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new NuclearLandscape();
});
