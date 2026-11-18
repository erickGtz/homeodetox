export type AboutMedia = {
  src: string;
  alt: string;
};

export type AboutContent = {
  intro: {
    body: string;
  };
  founder: {
    eyebrow: string;
    licenseLabel: string;
    bio: string;
  };
  missionVision: {
    title: string;
    mission: {
      label: string;
      body: string;
    };
    vision: {
      label: string;
      body: string;
    };
  };
  media: {
    hero: AboutMedia | null;
    founder: AboutMedia | null;
    clinic: AboutMedia | null;
  };
  seo: {
    title: string;
    description: string;
  };
};

export const aboutContent: AboutContent = {
  intro: {
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed turpis lorem, porttitor at tortor in, iaculis semper quam. Maecenas scelerisque nisi in ante mollis vehicula. Nulla egestas dolor ac varius lacinia. Mauris pharetra eros eu ex porta, in tristique ipsum imperdiet. Aenean ac est et felis rutrum pellentesque.",
  },
  founder: {
    eyebrow: "Fundador",
    licenseLabel: "Cédula profesional",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  missionVision: {
    title: "Misión y Visión",
    mission: {
      label: "Misión",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    vision: {
      label: "Visión",
      body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  },
  media: {
    hero: null,
    founder: null,
    clinic: null,
  },
  seo: {
    title: "Nosotros",
    description:
      "Conoce a HomeoDetox, su fundador y el enfoque de medicina integrativa y homeopatía detrás de la marca.",
  },
};
