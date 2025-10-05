interface Props {
  title: string;
  description: string;
}

export const WhyUsCard = ({ title, description }: Props) => {
  return (
    <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-green-700 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};
