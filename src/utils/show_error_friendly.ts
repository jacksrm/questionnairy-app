import { toast } from 'sonner';
import { ErrorMessage } from '../error/error_message';

export default function showErrorFriendly(error: ResponseError) {
  const { content } = error;

  content.forEach((e) => {
    if (typeof e === 'object') {
      toast.error(
        `Houve um erro interno, contate o desenvolvedor: ${e.RepositoryError}`,
      );
    } else {
      toast.error(ErrorMessage[e]);
    }
  });
}
