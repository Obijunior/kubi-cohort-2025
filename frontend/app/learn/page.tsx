import EducationSection from "../components/EducationSection";
import Navigation from "../components/Navigation";

interface XP_Props {
  userLevel: number;
  userXP: number;
  totalXP: number;
}

export default function LearnPage({ userLevel=5, userXP=34, totalXP=100 }: XP_Props) {
    const xpPercentage = (userXP / totalXP) * 100;

  return (
    <div>
    {/* XP and Level Indicator */}
    <div className="hidden lg:flex items-center gap-3 bg-tertiary rounded-full px-4 py-2 border border-default">
        <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-sm font-bold text-accent">
        {userLevel}
        </div>
        <div>
        <div className="text-xs text-muted">Level {userLevel}</div>
        <div className="w-24 h-1.5 bg-tertiary rounded-full overflow-hidden">
            <div 
            className="h-full bg-linear-to-r from-emerald-400 to-teal-500 transition-all duration-500"
            style={{ width: `${xpPercentage}%` }}
            />
        </div>
        </div>
    </div>
    <Navigation />
    <EducationSection />
    </div>
  );
}