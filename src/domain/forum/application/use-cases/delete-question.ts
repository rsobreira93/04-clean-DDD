import { QuestionRepository } from '../repositories/question-repository'

interface DeleteQuestionBySlugUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionBySlugUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionBySlugUseCaseRequest): Promise<DeleteQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
