import gradient from "gradient-string";



const colors = {
  gold: "#FFD700",
  crimson: "#DC143C",
};


const useGradient = (opt) => {
  const titleColor = opt.colors ?? Object.values(colors);
  const title = gradient(titleColor)(opt.title ?? "");
  console.log(title);
};

export default useGradient;
