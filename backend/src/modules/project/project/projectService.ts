import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { IProject } from './projectInterface';
import { Project } from './projectModel';
import QueryBuilder from '../../../builders/QueryBuilder';

export const addProjectService = async (data: IProject) => {
  const result = await Project.create(data);
  return result;
};

export const getAllProjectService = async (query: Record<string, unknown>) => {
  const ProjectQuery = new QueryBuilder(
    Project.find().populate('category', 'title'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await ProjectQuery.countTotal();
  const data = await ProjectQuery.modelQuery;

  return {
    meta,
    data,
  };
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
