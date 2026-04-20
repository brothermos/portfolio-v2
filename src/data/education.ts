export type EducationIconKey = 'rocket' | 'graduation';

export const EDUCATION: Array<{
  institution: string;
  program: string;
  detail?: string;
  period: string;
  color: string;
  border: string;
  dotColor: string;
  shadow: string;
  hoverShadow: string;
  iconKey: EducationIconKey;
}> = [
  {
    institution: 'Generation Thailand',
    program: 'Software Developer Bootcamp',
    period: 'May 2022 - Aug 2022',
    color: 'bg-coral',
    border: 'border border-coral',
    dotColor: 'bg-coral',
    shadow: 'shadow-[0_20px_40px_rgba(245,121,59,0.35)]',
    hoverShadow: 'md:hover:shadow-[0_28px_56px_rgba(245,121,59,0.5)]',
    iconKey: 'rocket',
  },
  {
    institution: 'Prince of Songkhla University (Hatyai)',
    program: 'Faculty of Management Science',
    detail: 'Major Human Resource Management',
    period: '2015 - 2019',
    color: 'bg-blue',
    border: 'border border-blue',
    dotColor: 'bg-blue',
    shadow: 'shadow-[0_20px_40px_rgba(153,183,245,0.35)]',
    hoverShadow: 'md:hover:shadow-[0_28px_56px_rgba(153,183,245,0.5)]',
    iconKey: 'graduation',
  },
];
