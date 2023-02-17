type ButtonProps = {
  content: string;
  type?: 'button' | 'submit';
  variation?: 'success' | 'danger' | 'primary';
};

const Button = ({ content, type, variation }: ButtonProps) => {
  let theme = 'bg-primary';
  const color = 'text-white';

  switch (variation) {
    case 'danger':
      theme = 'bg-danger';
      break;
    case 'success':
      theme = 'bg-success';
      break;
  }

  return (
    <button
      type={type ?? 'submit'}
      className={`w-full py-2 px-4 rounded-md ${theme} ${color}`}
    >
      {content}
    </button>
  );
};

export default Button;
