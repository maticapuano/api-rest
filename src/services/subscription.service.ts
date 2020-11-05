import { ApplicationException } from "@common/exception/Application.exception";
import { SubscriptionCreateDto, SubscriptionUpdateDto } from "dto/subscription.dto";
import { ISubscription } from "./repository/domain/Subscription";
import { SubscriptionRepository } from "./repository/Subscription.repository";

export class SubscriptionService {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  public async find(id: number): Promise<ISubscription | null> {
    return await this.subscriptionRepository.find(id);
  }

  public async all(): Promise<ISubscription[]> {
    return await this.subscriptionRepository.all();
  }

  public async create(data: SubscriptionCreateDto): Promise<void> {
    const userByCode = await this.subscriptionRepository.findByUserAndCode(data.user_id, data.code);

    if (!userByCode) {
      await this.subscriptionRepository.create(data as ISubscription);
    } else {
      throw new ApplicationException("User subscription already exits.");
    }
  }

  public async update(id: number, data: SubscriptionUpdateDto): Promise<void> {
    const user = await this.subscriptionRepository.find(id);

    if (user) {
      user.code = data.code;
      user.cron = data.cron;
      user.amount = data.amount;
    } else {
      throw new ApplicationException("Subscription not found.");
    }
  }

  public async delete(id: number): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}
