import { AnswersCommentRepository } from '../repositories/answers-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswersCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId,
    )

    if (!answerComment) {
      throw new Error('Question not found')
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('Not Allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}
  }
}
