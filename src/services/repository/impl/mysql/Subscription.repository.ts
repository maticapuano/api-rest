import mysqlPersistence from "@common/persistence/mysql.persistence";
import { ISubscription } from "@services/repository/domain/Subscription";

export class SubscriptionRepository {
  public async all(): Promise<ISubscription[]> {
    const [rows] = await mysqlPersistence.execute("SELECT * FROM subscription ORDER BY id DESC");

    return rows as ISubscription[];
  }
}
