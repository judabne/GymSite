const loaderStyle = {
  ldsGrid: {
    display: "inline-block",
    position: "relative",
    width: "80px",
    height: "80px",
    "& div": {
      position: "absolute",
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      background: "#00acc1",
      animation: "$ldsGrid 1.2s linear infinite",
      "&:nth-child(1)": {
        top: "8px",
        left: "8px",
        animationDelay: "0s",
      },
      "&:nth-child(2)": {
        top: "8px",
        left: "32px",
        animationDelay: "-0.4s",
      },
      "&:nth-child(3)": {
        top: "8px",
        left: "56px",
        animationDelay: "-0.8s",
      },
      "&:nth-child(4)": {
        top: "32px",
        left: "8px",
        animationDelay: "-0.4s",
      },
      "&:nth-child(5)": {
        top: "32px",
        left: "32px",
        animationDelay: "-0.8s",
      },
      "&:nth-child(6)": {
        top: "32px",
        left: "56px",
        animationDelay: "-1.2s",
      },
      "&:nth-child(7)": {
        top: "56px",
        left: "8px",
        animationDelay: "-0.8s",
      },
      "&:nth-child(8)": {
        top: "56px",
        left: "32px",
        animationDelay: "-1.2s",
      },
      "&:nth-child(9)": {
        top: "56px",
        left: "56px",
        animationDelay: "-1.6s",
      },
    }
  },
  "@keyframes ldsGrid": {
    "0%, 100%": {
      opacity: 1
    },

  "50%": {
      opacity: 0.5
    }
  }
}

export default loaderStyle;
