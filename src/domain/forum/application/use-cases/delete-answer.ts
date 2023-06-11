import { AnswerRepository } from '../repositories/answers-repository'

interface DeleteAnswerBySlugUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerBySlugUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerBySlugUseCaseRequest): Promise<DeleteAnswerBySlugUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
