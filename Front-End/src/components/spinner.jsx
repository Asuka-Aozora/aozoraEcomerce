const Spinner = ({ size = "medium", color = "primary" }) => {
  const sizeClasses = {
    small: "h-8 w-8 border-2",
    medium: "h-16 w-16 border-4",
    large: "h-24 w-24 border-8",
  };

  const colorClasses = {
    primary: "border-t-primary border-transparent",
    secondary: "border-t-secondary border-transparent",
    accent: "border-t-accent border-transparent",
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} border-solid`}
      ></div>
    </div>
  );
};

export default Spinner;
