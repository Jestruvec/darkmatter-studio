import { Project } from "@/types";
import { TFunction } from "i18next";

interface Props {
  t: TFunction<"translation", undefined>;
  project: Project;
}

export const ProjectCard = ({ project, t }: Props) => {
  return (
    <article className="flex flex-col justify-between p-4 text-center bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl">
      <header>
        <img
          src={project.imageUrl}
          alt={t(project.nameKey)}
          className="w-full mx-auto object-cover"
        />
        <h3 className="mt-4 text-lg font-semibold">{t(project.nameKey)}</h3>
      </header>

      <section>
        <p className="mt-2 text-sm">{t(project.descriptionKey)}</p>
      </section>

      <footer className="flex justify-center gap-4 mt-3">
        {project.deployUrl && (
          <a
            href={project.deployUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs underline font-semibold"
          >
            {project.deployUrl}
          </a>
        )}
      </footer>
    </article>
  );
};
