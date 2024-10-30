export const Table = ({ children, className, ...props }) => {
    return (
      <table className={`w-full border-collapse border border-gray-200 ${className}`} {...props}>
        {children}
      </table>
    );
  };