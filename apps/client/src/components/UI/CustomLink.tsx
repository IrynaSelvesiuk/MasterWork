import { Link } from 'react-router';

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, className }) => {
  return (
    <Link
      className={
        className
          ? className
          : 'inline-block px-4 py-2  hover:underline transition-all duration-300'
      }
      to={to}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
