const Spinner = ({ size = "medium", color = "primary" }) => {
  const sizeClasses = {
    small: "h-8 w-8 border-t-2 border-b-2",
    medium: "h-16 w-16 border-t-4 border-b-4",
    large: "h-24 w-24 border-t-6 border-b-6",
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-${color}`}
      ></div>
    </div>
  );
};

export default Spinner;
// 