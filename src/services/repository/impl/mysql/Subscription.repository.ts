import mysqlPersistence from "@common/persistence/mysql.persistence";
import { ISubscription } from "@services/repository/domain/Subscription";
import { SubscriptionRepository } from "@services/repository/Subscription.repository";

export class SubscriptionMysqlRepository implements SubscriptionRepository {
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

  public async findByUserAndCode(user_id: number, code: string): Promise<ISubscription | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [
      rows,
    ]: any[] = await mysqlPersistence.execute("SELECT * FROM subscription WHERE id=? AND code=?", [
      user_id,
      code,
    ]);

    if (rows.length) {
      return rows[0] as ISubscription;
    }

    return null;
  }

  public async create(data: ISubscription): Promise<void> {
    const { user_id, code, amount, cron } = data;
    const now = new Date();

    await mysqlPersistence.execute(
      "INSERT INTO subscription (user_id,code,amount,cron,created_at) VALUES(?,?,?,?,?)",
      [user_id, code, amount, cron, now]
    );
  }

  public async update(data: ISubscription): Promise<void> {
    const { id, user_id, code, amount, cron } = data;
    const now = new Date();

    await mysqlPersistence.execute(
      "UPDATE subscription SET user_id=?,code=?,amount=?,cron=?, updated_at=? WHERE id=?",
      [user_id, code, amount, cron, now, id]
    );
  }

  public async delete(id: number): Promise<void> {
    await mysqlPersistence.execute("DELETE FROM subscription WHERE id=?", [id]);
  }
}
