import { Link } from 'react-router';

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children }) => {
  return (
    <Link
      className="inline-block px-4 py-2  hover:underline transition-all duration-300"
      to={to}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
