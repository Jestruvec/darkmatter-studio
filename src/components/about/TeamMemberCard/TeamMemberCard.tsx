import { TeamMember } from "@/types";
import { TFunction } from "i18next";
import { FaLinkedin, FaGithub } from "react-icons/fa";

interface Props {
  t: TFunction<"translation", undefined>;
  member: TeamMember;
}

export const TeamMemberCard = ({ member, t }: Props) => {
  return (
    <article className="p-4 text-center bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl">
      <header>
        <img
          src={member.imageUrl}
          alt={t(member.nameKey)}
          className="w-24 h-24 mx-auto rounded-full object-cover"
        />
        <h3 className="mt-4 text-lg font-semibold">{t(member.nameKey)}</h3>
        <p className="text-sm">{t(member.roleKey)}</p>
      </header>

      <section>
        <p className="mt-2 text-sm">{t(member.bioKey)}</p>
      </section>

      <footer className="flex justify-center gap-4 mt-3">
        {member.linkedinUrl && (
          <a href={member.linkedinUrl} target="_blank" rel="noreferrer">
            <FaLinkedin size={24} className="hover:scale-110 transition" />
          </a>
        )}
        {member.githubUrl && (
          <a href={member.githubUrl} target="_blank" rel="noreferrer">
            <FaGithub size={24} className="hover:scale-110 transition" />
          </a>
        )}
      </footer>
    </article>
  );
};
