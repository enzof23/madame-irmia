/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--inter)",
        spectral: "var(--spectral)",
        cocobiker: "var(--cocobiker)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        grow: {
          "0%": { scale: "0.7" },
          "100%": { scale: 1 },
        },
        sklXXS: {
          "0%": { backgroundPosition: "-50px" },
          "100%": { backgroundPosition: "50px" },
        },
        sklXS: {
          "0%": { backgroundPosition: "-50px" },
          "100%": { backgroundPosition: "80px" },
        },
        sklSM: {
          "0%": { backgroundPosition: "-50px" },
          "100%": { backgroundPosition: "120px" },
        },
        sklMD: {
          "0%": { backgroundPosition: "-100px" },
          "100%": { backgroundPosition: "200px" },
        },
        sklLG: {
          "0%": { backgroundPosition: "-100px" },
          "100%": { backgroundPosition: "352px" },
        },
        sklFull: {
          "0%": { backgroundPosition: "-150px" },
          "100%": { backgroundPosition: "1000px" },
        },
        card: {
          "0%": { scale: "0.9", opacity: 0 },
          "100%": { scale: 1, opacity: 1 },
        },
        toasty: {
          "0%": { opacity: 0, bottom: "-15px" },
          "2%": { opacity: 1, bottom: "16px" },
          "98%": { opacity: 1, bottom: "16px" },
          "100%": { opacity: 0, bottom: "-15px" },
        },
      },
      backgroundImage: {
        "skl-gradient-sm":
          "linear-gradient(90deg, transparent 0px, rgba(63,63,70,0.35) 25px, transparent 50px)",
        "skl-gradient-md":
          "linear-gradient(90deg, transparent 0px, rgba(63,63,70,0.35) 50px, transparent 100px)",
        "skl-gradient-full":
          "linear-gradient(90deg, transparent 0px, rgba(63,63,70,0.35) 75px, transparent 150px)",
        "gold-gradient":
          "linear-gradient(292deg, rgba(182,147,67,0.6) 0%, rgba(12,26,23,0.8) 100%)",
      },
      animation: {
        fadeIn: "fadeIn 500ms linear",
        grow: "grow 150ms linear",
        sklXXS: "sklXXS 2s infinite ease-out",
        sklXS: "sklXS 2s infinite ease-out",
        sklSM: "sklSM 2s infinite ease-out",
        sklMD: "sklMD 2s infinite ease-out",
        sklLG: "sklLG 2s infinite ease-out",
        sklFull: "sklFull 2s infinite ease-out",
        card: "card 500ms ease-in",
        toasty: "toasty 10100ms linear",
      },
      colors: {
        primary: {
          10: "#FEFBE6",
          20: "#FEF6CE",
          30: "#FEF0B6",
          40: "#FEF0B6",
          50: "#FDE9A3",
          60: "#FDDF85",
          70: "#D9B861",
          80: "#B69343",
          90: "#92702A",
          100: "#795719",
        },
        success: {
          10: "#F6FFED",
          20: "#D9F7BE",
          30: "#B7EB8F",
          40: "#95DE64",
          50: "#73D13D",
          60: "#52C41A",
          70: "#389E0D",
          80: "#237804",
          90: "#135200",
          100: "#092B00",
        },
        warning: {
          10: "#FFFBE6",
          20: "#FFF1B8",
          30: "#FFE58F",
          40: "#FFD666",
          50: "#FFC53D",
          60: "#FAAD14",
          70: "#D48806",
          80: "#AD6800",
          90: "#874D00",
          100: "#613400",
        },
        error: {
          10: "#FFF1F0",
          20: "#FFCCC7",
          30: "#FFA39E",
          40: "#FF7875",
          50: "#FF4D4F",
          60: "#F5222D",
          70: "#CF1322",
          80: "#A8071A",
          90: "#820014",
          100: "#5C0011",
        },
        info: {
          10: "#E6F7FF",
          20: "#BAE7FF",
          30: "#91D5FF",
          40: "#69C0FF",
          50: "#40A9FF",
          60: "#1890FF",
          70: "#096DD9",
          80: "#0050B3",
          90: "#003A8C",
          100: "#002766",
        },
        dark: "#0C1A17",
        light: "#FEFBE6",
      },
    },
  },
  plugins: [],
};
