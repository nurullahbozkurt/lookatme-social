module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      nunito: ["Nunito"],
      josefin: ["Josefin Slab"],
      poiret: ["Poiret One"],
    },

    extend: {
      backgroundImage: {
        bgGr: " linear-gradient(to right top, #845ec2, #6b6ac9, #5074cb, #337cc9, #1582c4, #0086bf, #008ab8, #008db0, #008fa7, #00909a, #00908b, #008f7a)",
      },
      colors: {
        textColor: "#4E605E",
        primaryPurple: "#845EC2",
        primaryGreen: "#008F7A",
        primaryBlue: "#0089BA",
      },
      boxShadow: {
        avatarShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      },
    },
  },
  plugins: [],
};
