export interface QuestionResponse {
  role: string;
  content: Array<{
    type: string;
    text: string;
    context: {
      functionCalls: number;
      timestamp: string;
    }
  }>;
}
