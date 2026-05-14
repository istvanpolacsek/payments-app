import ActionsDecorator from './actions-decorator';

export default {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [ActionsDecorator],
};
