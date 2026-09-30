const projectsContainer = document.querySelector("#projects-list");

if (projectsContainer) {
  projectsContainer.replaceChildren();
  projectsContainer.setAttribute("aria-busy", "true");

  fetch("./resources/data/projects.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Projects request failed: ${response.status}`);
      }

      return response.json();
    })
    .then((projects) => {
      if (!Array.isArray(projects)) {
        throw new Error("Projects data must be an array.");
      }

      projects.forEach((project, index) => {
        const item = document.createElement("div");
        item.className = "project-item";
        item.setAttribute(
          "data-aos",
          index % 2 === 0 ? "zoom-in-right" : "zoom-in-left",
        );

        if (index % 2 !== 0) {
          item.setAttribute("data-aos-delay", "300");
        }

        const link = document.createElement("a");
        link.className = "project";
        link.href = project.url || "./project.html";

        const imageBox = document.createElement("div");
        imageBox.className = "box-image";

        const image = document.createElement("img");
        image.src = project.image;
        image.alt = project.imageAlt || `${project.title} preview`;
        image.loading = "lazy";
        const projectLinks = document.createElement("div");
        projectLinks.className = "project-links";
        imageBox.append(image, projectLinks);

        const overlay = document.createElement("div");
        overlay.className = "overlay";

        const title = document.createElement("h3");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        overlay.append(title, description);
        link.append(imageBox, overlay);
        item.append(link);
        projectsContainer.append(item);
      });

      if (projects.length === 0) {
        projectsContainer.textContent = "No projects to display yet.";
      }

      projectsContainer.removeAttribute("aria-busy");
      window.AOS?.refreshHard();
    })
    .catch((error) => {
      console.error("Unable to load projects:", error);
      projectsContainer.textContent = "Projects could not be loaded.";
      projectsContainer.removeAttribute("aria-busy");
    });
}
