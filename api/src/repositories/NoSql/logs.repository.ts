import logsModel, { ILogs } from '../../entities/logs.model';

export const getAllLogsRepositories = () => logsModel.find().sort({ createdAt: -1 });

export const saveLog = (log: ILogs) => logsModel.create(log);
