type GlobalSuccessProps = {
  globalMessage: string;
};

const GlobalSuccess = ({ globalMessage }: GlobalSuccessProps) => {
  return <>{globalMessage && <div className="bg-success w-full shadow-lg rounded-md flex items-center justify-center h-14 text-white">{globalMessage}</div>}</>;
};

export default GlobalSuccess;
