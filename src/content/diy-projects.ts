import en from "./diy-projects.en.json";
import { diyProjectsZhOverrides } from "./diy-projects.zh-overrides";

export type DiyProjectRecord = (typeof en.projects)[number];

export function getDiyProjects(locale: string): DiyProjectRecord[] {
  if (locale !== "zh") return en.projects;
  return en.projects.map((p) => {
    const o = diyProjectsZhOverrides[p.slug];
    if (!o) return p;
    return { ...p, title: o.title, description: o.description };
  });
}
