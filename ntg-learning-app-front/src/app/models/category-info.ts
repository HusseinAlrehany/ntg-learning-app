import { Topic } from "./topic";

export interface CategoryInfo {

  categoryId: number;
  categoryName: string;
  categoryProgress: number;
  masteredTopics: number;
  totalTopics: number;
  topicWithProgressList: Topic[];
  isExpanded?: boolean;
}
