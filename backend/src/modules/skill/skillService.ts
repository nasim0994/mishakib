import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ISkill } from './skillInterface';
import { Skill } from './skillModel';

export const addSkillService = async (data: ISkill) => {
  const isExist = await Skill.findOne();
  if (isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Skill information already exists!',
    );
  }
  const result = await Skill.create(data);
  return result;
};

export const getSkillService = async () => {
  const result = await Skill.findOne();
  return result;
};

export const updateSkillService = async (id: string, data: ISkill) => {
  const isExist = await Skill.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Skill not found!');

  const result = await Skill.findByIdAndUpdate(id, data, { new: true });
  return result;
};
