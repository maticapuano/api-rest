import mysqlPersistence from "@common/persistence/mysql.persistence";
import { ISubscription } from "@services/repository/domain/Subscription";

export class SubscriptionRepository {
  public async all(): Promise<ISubscription[]> {
    const [rows] = await mysqlPersistence.execute("SELECT * FROM subscription ORDER BY id DESC");

    return rows as ISubscription[];
  }

  public async find(id: number): Promise<ISubscription | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rows]: any[] = await mysqlPersistence.execute("SELECT * FROM subscription WHERE id=?", [
      id,
    ]);

    if (rows.length) {
      return rows[0] as ISubscription;
    }

    return null;
  }
}
