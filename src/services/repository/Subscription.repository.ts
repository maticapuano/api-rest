import { ISubscription } from "./domain/Subscription";

export interface SubscriptionRepository {
  all(): Promise<ISubscription[]>;

  find(id: number): Promise<ISubscription | null>;

  create(data: ISubscription): Promise<void>;

  update(data: ISubscription): Promise<void>;

  delete(id: number): Promise<void>;
}
