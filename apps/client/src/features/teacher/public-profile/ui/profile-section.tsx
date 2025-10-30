interface Props {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

export const ProfileSection = ({ title, icon: Icon, children }: Props) => (
  <section className="border-t border-gray-200 pt-8 mt-8">
    <h2 className="flex items-center text-2xl font-semibold text-gray-800">
      <Icon className="h-6 w-6 text-green-600 mr-3" />
      {title}
    </h2>
    <div className="mt-6 space-y-6 text-gray-700">{children}</div>
  </section>
);
