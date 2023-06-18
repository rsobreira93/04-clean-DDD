import { Either, left, right } from '@/core/either'
import { AnswerRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resources-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerBySlugUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerBySlugUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerBySlugUseCaseRequest): Promise<DeleteAnswerBySlugUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answer)

    return right({})
  }
}
