import { Either, left, right } from '@/core/either'
import { AnswersCommentRepository } from '../repositories/answers-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>

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
      return left('Question not found')
    }

    if (authorId !== answerComment.authorId.toString()) {
      return left('Not Allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
