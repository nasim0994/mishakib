import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { IProject } from './projectInterface';
import { Project } from './projectModel';

export const addProjectService = async (data: IProject) => {
  const result = await Project.create(data);
  return result;
};

export const getAllProjectService = async () => {
  const result = await Project.find().populate('category', 'title');
  return result;
};

export const getSingleProjectService = async (id: string) => {
  const result = await Project.findById(id);
  return result;
};

export const updateProjectService = async (id: string, data: IProject) => {
  const isExist = await Project.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Project not found!');

  const result = await Project.findByIdAndUpdate(id, data, { new: true });
  return result;
};

export const deleteProjectService = async (id: string) => {
  const isExist = await Project.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Project not found!');

  const result = await Project.findByIdAndDelete(id);
  return result;
};
