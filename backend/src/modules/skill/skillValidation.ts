import { z } from 'zod';

export const skillValidation = z.object({
  sectionDescription: z.string().min(1, 'Section description is required'),
  skills: z
    .array(
      z.object({
        title: z.string().min(1, 'Skill title is required'),
        logo: z.string().url('Logo must be a valid URL'),
      }),
    )
    .min(1, 'At least one skill is required'),
});
export const updateSkillValidation = skillValidation.partial();
