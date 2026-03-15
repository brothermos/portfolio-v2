export type EducationIconKey = "rocket" | "graduation";

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
    institution: "Generation Thailand",
    program: "Software Developer Bootcamp",
    period: "May 2022 - Aug 2022",
    color: "bg-red-500/45",
    border: "border border-[#EB6843]/50",
    dotColor: "bg-coral",
    shadow: "shadow-[0_20px_40px_rgba(235,104,67,0.35)]",
    hoverShadow: "md:hover:shadow-[0_28px_56px_rgba(235,104,67,0.5)]",
    iconKey: "rocket",
  },
  {
    institution: "Prince of Songkhla University (Hatyai)",
    program: "Faculty of Management Science",
    detail: "Major Human Resource Management",
    period: "2015 - 2019",
    color: "bg-[#0D8DFF]/45",
    border: "border border-[#0D8DFF]/50",
    dotColor: "bg-blue",
    shadow: "shadow-[0_20px_40px_rgba(13,141,255,0.35)]",
    hoverShadow: "md:hover:shadow-[0_28px_56px_rgba(13,141,255,0.5)]",
    iconKey: "graduation",
  },
];
