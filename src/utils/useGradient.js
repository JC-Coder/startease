import gradient from "gradient-string";

const color2 = {
  red: "#FF0900",
  orange: "#FF7F00",
  yellow: "#FFEF00",
  blue: "#0079FF",
};

const useGradinent = (opt) => {
  const titleColor = opt.colors ?? Object.values(color2);
  const title = gradient(titleColor)(opt.title ?? "");
  console.log(title);
};

export default useGradinent;
