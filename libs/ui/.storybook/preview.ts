import RouterDecorator from './router-decorator';
import ActionsDecorator from './actions-decorator';

export default {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [RouterDecorator, ActionsDecorator],
};
