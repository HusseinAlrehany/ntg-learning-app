export interface Topic {

  topicId: number;
  name: string;
  description: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'MASTERED';
}
